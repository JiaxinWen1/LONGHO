document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchResults = document.getElementById('search-results');
    const searchTermElement = document.getElementById('search-term');

    // 从URL获取搜索关键词
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (query) {
        searchInput.value = query;
        performSearch(query);
    }

    // 搜索函数
    function performSearch(searchQuery) {
        const searchTermLower = searchQuery.toLowerCase().trim();
        if (!searchTermLower) return;

        // 显示搜索关键词
        searchTermElement.textContent = `${translations[currentLang]['search.term'] || '搜索词'}: "${searchQuery}"`;
        
        // 显示加载中提示
        searchResults.innerHTML = `<div class="search-loading">${translations[currentLang]['search.loading'] || '正在搜索...'}</div>`;

        // 获取当前语言的网站索引
        const sitePages = getSiteIndex();
        
        // 开始全文搜索
        fullTextSearch(sitePages, searchTermLower)
            .then(results => {
                // 显示搜索结果
                showSearchResults(results);
            })
            .catch(error => {
                console.error('搜索出错:', error);
                searchResults.innerHTML = `<div class="search-error">${translations[currentLang]['search.error'] || '搜索时发生错误'}</div>`;
            });
    }

    // 全文搜索
    async function fullTextSearch(pages, searchTerm) {
        // 创建一个结果Map，用URL作为键以防止重复
        const resultsMap = new Map();
        const searchPromises = [];
        const searchTermTokens = searchTerm.split(/\s+/).filter(token => token.length > 1);

        // 遍历所有页面
        pages.forEach(page => {
            let score = 0;
            
            // 1. 先搜索标题
            if (page.title.toLowerCase().includes(searchTerm)) {
                score += 30; // 标题中完全匹配得分最高
            } else {
                // 检查标题中是否包含搜索词的任意部分
                searchTermTokens.forEach(token => {
                    if (page.title.toLowerCase().includes(token)) {
                        score += 15; // 标题中部分匹配
                    }
                });
            }
            
            // 2. 搜索描述
            if (page.description.toLowerCase().includes(searchTerm)) {
                score += 20; // 描述中完全匹配
            } else {
                searchTermTokens.forEach(token => {
                    if (page.description.toLowerCase().includes(token)) {
                        score += 10; // 描述中部分匹配
                    }
                });
            }
            
            // 3. 搜索关键词
            const keywordsText = page.keywords.join(' ').toLowerCase();
            if (keywordsText.includes(searchTerm)) {
                score += 25; // 关键词中完全匹配
            } else {
                searchTermTokens.forEach(token => {
                    if (keywordsText.includes(token)) {
                        score += 12; // 关键词中部分匹配
                    }
                });
            }
            
            // 4. 搜索内容
            if (page.content) {
                const contentLower = page.content.toLowerCase();
                if (contentLower.includes(searchTerm)) {
                    score += 15; // 内容中完全匹配
                    
                    // 提取匹配上下文
                    const index = contentLower.indexOf(searchTerm);
                    const start = Math.max(0, index - 30);
                    const end = Math.min(contentLower.length, index + searchTerm.length + 30);
                    let contentMatch = page.content.substring(start, end);
                    
                    // 添加匹配结果
                    if (score > 0) {
                        resultsMap.set(page.url, {
                            url: page.url,
                            title: page.title,
                            description: page.description,
                            score: score,
                            contentMatch: `...${contentMatch}...`
                        });
                    }
                } else {
                    let containsPartial = false;
                    searchTermTokens.forEach(token => {
                        if (contentLower.includes(token)) {
                            score += 5; // 内容中部分匹配
                            containsPartial = true;
                        }
                    });
                    
                    if (containsPartial) {
                        // 使用第一个匹配的token作为上下文提取点
                        let matchToken = null;
                        for (const token of searchTermTokens) {
                            if (contentLower.includes(token)) {
                                matchToken = token;
                                break;
                            }
                        }
                        
                        if (matchToken) {
                            const index = contentLower.indexOf(matchToken);
                            const start = Math.max(0, index - 30);
                            const end = Math.min(contentLower.length, index + matchToken.length + 30);
                            let contentMatch = page.content.substring(start, end);
                            
                            // 添加匹配结果
                            resultsMap.set(page.url, {
                                url: page.url,
                                title: page.title,
                                description: page.description,
                                score: score,
                                contentMatch: `...${contentMatch}...`
                            });
                        }
                    }
                }
            }
            
            // 如果没有在内容中找到匹配，但在其他地方找到了
            if (score > 0 && !resultsMap.has(page.url)) {
                resultsMap.set(page.url, {
                    url: page.url,
                    title: page.title,
                    description: page.description,
                    score: score
                });
            }
        });

        // 转换为数组并按得分排序
        const results = Array.from(resultsMap.values())
            .sort((a, b) => b.score - a.score);

        return results;
    }

    // 在全站内容中搜索 - 不再使用，已由新的fullTextSearch取代，保留此方法以供兼容
    function searchFullContent(siteIndex, searchTerm) {
        return fullTextSearch(siteIndex, searchTerm);
    }

    // 显示搜索结果
    function showSearchResults(results) {
        if (results.length === 0) {
            // 没有找到结果
            searchResults.innerHTML = `
                <div class="no-results">
                    <p>${translations[currentLang]['search.no_results'] || '没有找到匹配的结果'}</p>
                    <p>${translations[currentLang]['search.suggestions'] || '建议：'}</p>
                    <ul>
                        <li>${translations[currentLang]['search.suggestion1'] || '检查您的拼写'}</li>
                        <li>${translations[currentLang]['search.suggestion2'] || '尝试不同的关键词'}</li>
                        <li>${translations[currentLang]['search.suggestion3'] || '尝试更广泛的关键词'}</li>
                    </ul>
                </div>
            `;
            return;
        }

        // 构建搜索结果HTML
        let resultsHTML = '';
        
        results.forEach(result => {
            // 获取结果URL的相对路径显示
            const urlParts = result.url.split('/');
            const displayUrl = urlParts.slice(-2).join('/');
            
            // 创建结果项
            resultsHTML += `
                <div class="result-item">
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p class="result-url">${displayUrl}</p>
                    <p class="result-description">${result.description}</p>
                    ${result.contentMatch ? `<p class="result-match">${highlightSearchTerms(result.contentMatch, searchInput.value)}</p>` : ''}
                </div>
            `;
        });
        
        // 更新搜索结果容器
        searchResults.innerHTML = resultsHTML;
    }

    // 高亮显示搜索词
    function highlightSearchTerms(text, searchTerm) {
        if (!text || !searchTerm) return text;
        
        const terms = searchTerm.toLowerCase().split(/\s+/).filter(term => term.length > 1);
        let highlightedText = text;
        
        // 对每个搜索词进行高亮处理
        terms.forEach(term => {
            const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
        });
        
        return highlightedText;
    }

    // 转义正则表达式特殊字符
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // 添加语言切换事件监听
    document.addEventListener('languageChanged', function(e) {
        if (query) {
            performSearch(query);
        }
    });

    // 添加搜索事件监听
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `SearchResults.html?q=${encodeURIComponent(query)}`;
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `SearchResults.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
}); 