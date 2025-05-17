// 全站搜索功能
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchContainer = document.querySelector('.search-container');
    
    // 添加搜索事件监听
    searchButton.addEventListener('click', () => {
        handleSearch();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // 处理搜索请求
    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // 将搜索词存储到本地存储中，用于搜索结果页面
            localStorage.setItem('lastSearchQuery', query);
            // 构建搜索结果页面的URL，并传递搜索查询
            // 确保 searchResultPage 变量已在全局或此作用域中定义，并指向正确的搜索结果页面路径
            // 例如: const searchResultPage = '../SearchResults.html'; 
            window.location.href = `../SearchResults.html?q=${encodeURIComponent(query)}`;
        } else {
            // 如果搜索查询为空，可以选择给出提示或不执行任何操作
        }
    }

    // 转义正则表达式特殊字符
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
});
