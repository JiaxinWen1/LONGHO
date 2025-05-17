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
        
        // 如果页面索引不包含完整内容，尝试动态抓取页面内容
        fetchPagesContent(sitePages, searchTermLower)
            .then(enrichedPages => {
                // 开始全文搜索
                return fullTextSearch(enrichedPages, searchTermLower);
            })
            .then(results => {
                // 显示搜索结果
                showSearchResults(results);
            })
            .catch(error => {
                console.error('搜索出错:', error);
                searchResults.innerHTML = `<div class="search-error">${translations[currentLang]['search.error'] || '搜索时发生错误'}</div>`;
            });
    }

    // 动态抓取页面内容
    async function fetchPagesContent(pages, searchTerm) {
        // 创建页面副本以避免修改原始数据
        const enrichedPages = JSON.parse(JSON.stringify(pages));
        const fetchPromises = [];

        // 对于每个页面，尝试抓取更多内容
        for (let i = 0; i < enrichedPages.length; i++) {
            const page = enrichedPages[i];
            
            // 如果内容不够丰富或不存在，尝试获取完整内容
            if (!page.fullContentFetched && page.url) {
                // 修正URL以确保可以正确获取页面
                let fetchUrl = page.url;
                if (fetchUrl.includes('/')) {
                    const urlParts = fetchUrl.split('/');
                    fetchUrl = './' + urlParts[urlParts.length - 1];
                } else if (!fetchUrl.startsWith('./') && !fetchUrl.startsWith('../') && !fetchUrl.startsWith('http')) {
                    fetchUrl = './' + fetchUrl;
                }
                
                // 创建抓取页面内容的Promise
                const fetchPromise = fetch(fetchUrl)
                    .then(response => {
                        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        return response.text();
                    })
                    .then(html => {
                        // 使用DOMParser解析HTML
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        
                        // 抓取页面中的所有文本内容
                        const textContent = extractAllTextContent(doc);
                        
                        // 提取所有标题文本
                        const headings = extractAllHeadings(doc);
                        
                        // 提取所有段落文本
                        const paragraphs = extractAllParagraphs(doc);
                        
                        // 合并所有内容
                        enrichedPages[i].content = [
                            enrichedPages[i].content || '',
                            textContent,
                            headings.join(' '),
                            paragraphs.join(' ')
                        ].join(' ').trim();
                        
                        // 标记为已抓取完整内容
                        enrichedPages[i].fullContentFetched = true;
                        
                        return true;
                    })
                    .catch(error => {
                        console.warn(`无法获取页面内容: ${fetchUrl}`, error);
                        return false;
                    });
                
                fetchPromises.push(fetchPromise);
            }
        }
        
        // 等待所有抓取任务完成
        if (fetchPromises.length > 0) {
            await Promise.allSettled(fetchPromises);
        }
        
        return enrichedPages;
    }

    // 提取页面中的所有文本内容
    function extractAllTextContent(doc) {
        // 获取body中的所有文本，并去除脚本和样式标签
        const body = doc.body;
        if (!body) return '';
        
        // 克隆节点，避免修改原始DOM
        const clonedBody = body.cloneNode(true);
        
        // 移除所有脚本和样式标签
        const scripts = clonedBody.querySelectorAll('script, style, noscript');
        scripts.forEach(script => script.remove());
        
        // 获取文本内容
        return clonedBody.textContent.replace(/\s+/g, ' ').trim();
    }

    // 提取所有标题元素
    function extractAllHeadings(doc) {
        const headings = [];
        const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headingElements.forEach(heading => {
            const text = heading.textContent.trim();
            if (text) headings.push(text);
        });
        
        return headings;
    }

    // 提取所有段落元素
    function extractAllParagraphs(doc) {
        const paragraphs = [];
        const paragraphElements = doc.querySelectorAll('p');
        
        paragraphElements.forEach(paragraph => {
            const text = paragraph.textContent.trim();
            if (text) paragraphs.push(text);
        });
        
        return paragraphs;
    }

    // 全文搜索
    async function fullTextSearch(pages, searchTerm) {
        // 创建一个结果Map，用URL作为键以防止重复
        const resultsMap = new Map();
        const searchTermTokens = searchTerm.split(/\s+/).filter(token => token.length > 1);
        const currentLang = localStorage.getItem('language') || 'zh';

        // 遍历所有页面
        pages.forEach(page => {
            let score = 0;
            let contentMatches = [];
            
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
                
                // 完全匹配
                if (contentLower.includes(searchTerm)) {
                    score += 15; // 内容中完全匹配
                    
                    // 提取匹配上下文（可能有多个）
                    let lastIndex = 0;
                    let count = 0;
                    const maxMatches = 3; // 最多显示几个匹配
                    
                    while ((lastIndex = contentLower.indexOf(searchTerm, lastIndex)) !== -1 && count < maxMatches) {
                        const start = Math.max(0, lastIndex - 40);
                        const end = Math.min(contentLower.length, lastIndex + searchTerm.length + 40);
                        const match = page.content.substring(start, end);
                        contentMatches.push(`...${match}...`);
                        
                        lastIndex += searchTerm.length;
                        count++;
                    }
                }
                
                // 部分匹配
                let partialMatchScore = 0;
                searchTermTokens.forEach(token => {
                    if (contentLower.includes(token)) {
                        partialMatchScore += 5; // 内容中部分匹配
                        
                        // 对较长的词给予更高权重
                        if (token.length > 3) {
                            partialMatchScore += 2;
                        }
                        
                        // 如果匹配次数较多也增加分数
                        const tokenRegex = new RegExp(escapeRegExp(token), 'gi');
                        const matchCount = (contentLower.match(tokenRegex) || []).length;
                        if (matchCount > 1) {
                            partialMatchScore += Math.min(5, matchCount); // 最多加5分
                        }
                        
                        // 如果还没有提取到上下文，提取部分匹配的上下文
                        if (contentMatches.length < 3) {
                            let tokenLastIndex = 0;
                            let count = 0;
                            
                            while ((tokenLastIndex = contentLower.indexOf(token, tokenLastIndex)) !== -1 && count < 2) {
                                const start = Math.max(0, tokenLastIndex - 40);
                                const end = Math.min(contentLower.length, tokenLastIndex + token.length + 40);
                                const match = page.content.substring(start, end);
                                contentMatches.push(`...${match}...`);
                                
                                tokenLastIndex += token.length;
                                count++;
                            }
                        }
                    }
                });
                
                score += partialMatchScore;
            }
            
            // 如果有任何匹配，添加到结果中
            if (score > 0) {
                resultsMap.set(page.url, {
                    url: page.url,
                    title: page.title,
                    description: page.description,
                    score: score,
                    contentMatches: contentMatches
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
            
            // 修正目标URL，确保它指向根目录下的文件
            let targetUrl = result.url;
            if (targetUrl.includes('/')) { // 如果路径包含子目录
                targetUrl = './' + urlParts[urlParts.length - 1]; // 改为根目录相对路径，例如 ./ContactUS.html
            } else if (!targetUrl.startsWith('./') && !targetUrl.startsWith('../') && !targetUrl.startsWith('http')) {
                // 如果它只是一个文件名且不是绝对或外部链接，确保它是相对于根目录的
                targetUrl = './' + targetUrl;
            }
            
            // 构建匹配内容HTML
            let contentMatchHTML = '';
            if (result.contentMatches && result.contentMatches.length > 0) {
                contentMatchHTML = result.contentMatches.map(match => 
                    `<p class="result-match">${highlightSearchTerms(match, searchInput.value)}</p>`
                ).join('');
            }
            
            // 创建结果项
            resultsHTML += `
                <div class="result-item">
                    <h3><a href="${targetUrl}">${result.title}</a></h3>
                    <p class="result-url">${displayUrl}</p>
                    <p class="result-description">${result.description}</p>
                    ${contentMatchHTML}
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
        const newQuery = searchInput.value.trim();
        if (newQuery) {
            // 更新URL并执行搜索
            const url = new URL(window.location.href);
            url.searchParams.set('q', newQuery);
            window.history.pushState({}, '', url);
            performSearch(newQuery);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newQuery = searchInput.value.trim();
            if (newQuery) {
                // 更新URL并执行搜索
                const url = new URL(window.location.href);
                url.searchParams.set('q', newQuery);
                window.history.pushState({}, '', url);
                performSearch(newQuery);
            }
        }
    });
}); 