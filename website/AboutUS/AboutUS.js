// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前页面导航链接高亮
    setActiveNavLink();
    
    // 设置语言按钮状态
    const langBtns = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'zh';
    
    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 监听语言变更事件，确保高亮状态在语言切换后保持
    document.addEventListener('languageChanged', function() {
        setTimeout(setActiveNavLink, 0);
    });
});

// 设置当前页面导航链接高亮 - 简化版，直接设置AboutUs链接高亮
function setActiveNavLink() {
    // 移除所有导航链接的active类
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // 直接找到"关于我们"链接并强制添加active类
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-i18n') === 'nav.about') {
            link.classList.add('active');
            console.log('已强制设置"关于我们"链接为活动状态');
        }
    });
}
