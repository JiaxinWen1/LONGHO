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
            window.location.href = `../SearchResults/SearchResults.html?q=${encodeURIComponent(query)}`;
        }
    }

    // 转义正则表达式特殊字符
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
});
