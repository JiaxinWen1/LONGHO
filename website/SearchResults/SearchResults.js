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
        searchTermElement.textContent = `${translations[currentLang]['search.term']}: "${searchQuery}"`;
        
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

        // 遍历所有页面
        pages.forEach(page => {
            // 首先检查标题、描述和关键词
            const basicSearchableText = [
                page.title,
                page.description,
                ...page.keywords
            ].join(' ').toLowerCase();

            if (basicSearchableText.includes(searchTerm)) {
                resultsMap.set(page.url, {
                    url: page.url,
                    title: page.title,
                    description: page.description,
                    score: 10, // 标题和描述中匹配的优先级更高
                    matchType: 'metadata'
                });
            }

            // 创建一个Promise来获取和搜索页面内容
            const fetchPromise = fetchAndSearchPage(page, searchTerm)
                .then(result => {
                    if (result) {
                        // 如果结果是在页面内容中找到的，且之前没有添加过
                        if (!resultsMap.has(result.url)) {
                            resultsMap.set(result.url, result);
                        } else {
                            // 如果结果已存在，但这个是内容匹配，增加分数
                            const existingResult = resultsMap.get(result.url);
                            existingResult.score += result.score;
                            existingResult.contentMatch = result.contentMatch;
                        }
                    }
                })
                .catch(error => {
                    console.error(`获取页面失败: ${page.url}`, error);
                });

            searchPromises.push(fetchPromise);
        });

        // 等待所有搜索Promise完成
        await Promise.all(searchPromises);

        // 将Map转换为数组并按分数排序
        const results = Array.from(resultsMap.values())
            .sort((a, b) => b.score - a.score);

        return results;
    }

    // 在全站内容中搜索
    function searchFullContent(siteIndex, searchTerm) {
        // 搜索匹配的结果（使用Map防止重复）
        const resultsMap = new Map();

        // 遍历网站索引的每个页面
        siteIndex.forEach(page => {
            const searchableText = [
                page.title,
                page.description,
                ...page.keywords
            ].join(' ').toLowerCase();
            
            // 检查是否包含搜索词
            if (searchableText.includes(searchTerm)) {
                // 使用URL作为唯一标识，确保不重复
                if (!resultsMap.has(page.url)) {
                    // 创建搜索结果项
                    const resultItem = {
                        url: page.url,
                        title: page.title,
                        description: page.description
                    };
                    
                    resultsMap.set(page.url, resultItem);
                }
            }
        });
        
        // 将Map转换为数组
        return Array.from(resultsMap.values());
    }

    // 获取和搜索单个页面
    async function fetchAndSearchPage(page, searchTerm) {
        try {
            // 检查URL是否有效且是同源的（避免跨域问题）
            const pageUrl = new URL(page.url, window.location.origin);
            if (pageUrl.origin !== window.location.origin) {
                console.warn(`跳过非同源页面: ${page.url}`);
                return null;
            }

            // 获取页面内容
            const response = await fetch(pageUrl.href, { 
                credentials: 'same-origin',
                mode: 'same-origin',
                headers: {
                    'Accept': 'text/html'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            
            // 安全地解析HTML
            try {
                // 创建一个临时的DOM元素来解析HTML
                const tempDoc = document.implementation.createHTMLDocument();
                tempDoc.body.innerHTML = html;
                
                // 删除不需要的元素
                const elementsToRemove = tempDoc.querySelectorAll('script, style, noscript, iframe, .language-switch, .search-container, .nav, .header, footer');
                elementsToRemove.forEach(el => el.remove());
                
                // 提取页面主要内容区域（如果存在）
                let mainContent = tempDoc.querySelector('.content') || tempDoc.body;
                
                // 检查是否是联系页面
                const isContactPage = page.url.toLowerCase().includes('contact') || 
                                      page.title.includes('联系') || 
                                      /联系我们|contact us/i.test(page.description);
                
                let textContent = '';
                
                // 如果是联系页面，使用特殊的内容提取方式
                if (isContactPage) {
                    // 尝试直接从翻译中获取联系信息
                    const contactInfo = [
                        `${translations[currentLang]['contact.title']}:`,
                        `${translations[currentLang]['contact.phone']}: 1234567890`,
                        `${translations[currentLang]['contact.email']}: 1234567890@163.com`,
                        `${translations[currentLang]['contact.address']}: ${translations[currentLang]['contact.address1']}`
                    ].join(' ');
                    
                    textContent = contactInfo;
                } else {
                    // 提取带有data-i18n属性的元素的当前语言内容
                    const i18nElements = mainContent.querySelectorAll('[data-i18n]');
                    let translatedContent = '';
                    
                    i18nElements.forEach(element => {
                        const key = element.getAttribute('data-i18n');
                        if (translations[currentLang][key]) {
                            translatedContent += translations[currentLang][key] + ' ';
                        }
                    });
                    
                    // 提取页面文本内容
                    const contentElements = mainContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th, div:not(.nav):not(.header)');
                    
                    // 创建一个集合来存储已处理过的文本，防止重复
                    const processedTexts = new Set();
                    
                    contentElements.forEach(element => {
                        if (element.textContent.trim()) {
                            // 清理文本内容（移除多余空格和特殊字符）
                            let cleanText = element.textContent.trim()
                                .replace(/\s+/g, ' ')  // 多个空格替换为一个
                                .replace(/en\s+/g, '') // 移除单独的"en"文本
                                .replace(/\.\.\./g, '') // 移除省略号
                                .replace(/关于我们\s+\.\.\./g, '') // 移除结尾的"关于我们..."
                                .replace(/\.\.\.\s*关于我们/g, ''); // 移除开头的"...关于我们"
                            
                            // 检查这段文本是否已经处理过，避免重复
                            if (!processedTexts.has(cleanText)) {
                                textContent += cleanText + ' ';
                                processedTexts.add(cleanText);
                            }
                        }
                    });
                    
                    // 合并翻译内容和普通文本内容，并确保没有重复
                    const allContentParts = new Set([...translatedContent.split(' '), ...textContent.split(' ')]);
                    textContent = Array.from(allContentParts).join(' ');
                }
                
                // 搜索文本内容
                const lowerTextContent = textContent.toLowerCase();
                const index = lowerTextContent.indexOf(searchTerm);
                
                if (index !== -1) {
                    // 提取匹配上下文
                    const start = Math.max(0, index - 50);
                    const end = Math.min(lowerTextContent.length, index + searchTerm.length + 50);
                    let contentMatch = textContent.substring(start, end);
                    
                    // 清理上下文
                    contentMatch = contentMatch
                        .replace(/^\s*en\s+/i, '') // 移除开头的"en"
                        .replace(/\s+关于我们\s*\.\.\.$/i, '') // 移除结尾的"关于我们..."
                        .replace(/关于我们\s+LONGHO公司.*?关于我们\s+LONGHO公司/is, '关于我们 LONGHO公司') // 移除重复的公司介绍
                        .replace(/联系我们\s+电话.*?联系我们\s+电话/is, '联系我们 电话'); // 移除重复的联系方式
                    
                    // 联系页面特殊处理
                    if (isContactPage) {
                        contentMatch = formatContactMatch(contentMatch);
                    }
                    
                    // 添加省略号
                    if (start > 0 && !isContactPage) contentMatch = '...' + contentMatch;
                    if (end < lowerTextContent.length && !isContactPage) contentMatch += '...';
                    
                    return {
                        url: page.url,
                        title: page.title,
                        description: page.description,
                        contentMatch: contentMatch,
                        score: 5, // 内容中匹配的优先级低于标题
                        matchType: 'content',
                        isContactPage: isContactPage
                    };
                }
            } catch (parseError) {
                console.error(`解析HTML失败: ${page.url}`, parseError);
            }
            
            return null;
        } catch (error) {
            console.error(`搜索页面内容失败: ${page.url}`, error);
            return null;
        }
    }

    // 格式化联系页面内容匹配
    function formatContactMatch(text) {
        // 如果包含联系信息关键词
        if (/电话|邮箱|地址|phone|email|address/i.test(text)) {
            // 分离各个联系方式
            const items = [];
            
            // 提取电话
            const phoneMatch = text.match(/(?:电话|phone)[：:]\s*(\d[\d\s-]+\d)/i);
            if (phoneMatch) {
                items.push(`${translations[currentLang]['contact.phone']}: ${phoneMatch[1]}`);
            }
            
            // 提取邮箱
            const emailMatch = text.match(/(?:邮箱|email)[：:]\s*([^\s,;，；]+@[^\s,;，；]+)/i);
            if (emailMatch) {
                items.push(`${translations[currentLang]['contact.email']}: ${emailMatch[1]}`);
            }
            
            // 提取地址
            const addressMatch = text.match(/(?:地址|address)[：:]\s*([^，。,;；]+)/i);
            if (addressMatch) {
                items.push(`${translations[currentLang]['contact.address']}: ${addressMatch[1].trim()}`);
            }
            
            // 如果成功提取了至少一项联系方式
            if (items.length > 0) {
                return items.join('<br>');
            }
        }
        
        return text;
    }

    // 显示搜索结果
    function showSearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result-item">
                    <p>${translations[currentLang]['search.no_results']}</p>
                </div>
            `;
            return;
        }

        // 清空现有结果
        searchResults.innerHTML = '';

        // 添加结果列表
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            // 高亮标题中的匹配文本
            const searchTermRegex = new RegExp(escapeRegExp(query), 'gi');
            const highlightedTitle = result.title.replace(
                searchTermRegex,
                match => `<span class="highlight">${match}</span>`
            );
            
            // 创建HTML内容
            let htmlContent = `
                <a href="${result.url}">
                    <h3>${highlightedTitle}</h3>
                    <p>${result.description}</p>
                </a>
            `;
            
            // 如果有内容匹配，并且内容与描述不同，才显示匹配的内容
            if (result.contentMatch) {
                // 对内容匹配进行额外清理，确保没有重复的句子
                const cleanedContentMatch = removeDuplicateSentences(result.contentMatch);
                
                // 移除HTML标签用于比较
                const plainDescription = result.description.replace(/<[^>]*>/g, '');
                const plainContentMatch = cleanedContentMatch.replace(/<[^>]*>/g, '')
                    .replace(/\.\.\./g, '') // 去掉省略号进行比较
                    .trim();
                
                // 检查内容匹配是否已包含在描述中
                const isContentIncluded = plainDescription.includes(plainContentMatch) || 
                    plainContentMatch.includes(plainDescription) ||
                    // 如果内容匹配和描述的相似度超过70%，认为它们是重复的
                    calculateSimilarity(plainDescription, plainContentMatch) > 0.7;
                
                if (!isContentIncluded && plainContentMatch.length > 5) {
                    const highlightedContent = cleanedContentMatch.replace(
                        searchTermRegex,
                        match => `<span class="highlight">${match}</span>`
                    );
                    
                    htmlContent += `
                        <div class="content-match" data-label="${translations[currentLang]['search.content_match']}">
                            ${highlightedContent}
                        </div>
                    `;
                }
            }
            
            resultItem.innerHTML = htmlContent;
            searchResults.appendChild(resultItem);
        });
    }

    // 移除重复的句子
    function removeDuplicateSentences(text) {
        if (!text) return '';
        
        // 按句子分割文本（考虑中英文句号）
        const sentences = text.split(/(?<=[.。!！?？])\s+/);
        
        // 使用Set去重
        const uniqueSentences = [];
        const sentenceSet = new Set();
        
        for (const sentence of sentences) {
            const trimmed = sentence.trim();
            if (trimmed && !sentenceSet.has(trimmed)) {
                uniqueSentences.push(trimmed);
                sentenceSet.add(trimmed);
            }
        }
        
        // 重组文本
        return uniqueSentences.join(' ').replace(/\s+/g, ' ').trim();
    }

    // 计算两个字符串的相似度 (0-1)
    function calculateSimilarity(str1, str2) {
        if (!str1 || !str2) return 0;
        if (str1 === str2) return 1;
        
        // 使用较简单的算法计算相似度
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        // 寻找较短字符串在较长字符串中的匹配部分
        let matchCount = 0;
        for (let i = 0; i < shorter.length; i++) {
            const charMatches = longer.includes(shorter.substring(i, i + 2));
            if (charMatches) matchCount++;
        }
        
        return matchCount / shorter.length;
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