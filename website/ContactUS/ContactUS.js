// ContactUS页面特定的JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 监听语言变更事件
    document.addEventListener('languageChanged', function(e) {
        const lang = e.detail.language;
        
        // 根据不同语言可以执行特定的页面调整
        // 例如调整某些元素的布局或样式
        if (lang === 'en') {
            // 英文版特定的调整
            adjustEnglishLayout();
        } else {
            // 中文版特定的调整
            adjustChineseLayout();
        }
    });
    
    // 当前语言初始化
    const currentLang = localStorage.getItem('language') || 'zh';
    if (currentLang === 'en') {
        adjustEnglishLayout();
    } else {
        adjustChineseLayout();
    }
});

// 英文布局调整函数
function adjustEnglishLayout() {
    // 如果英文文本较长，可能需要调整一些元素的大小或间距
    // 这里可以添加一些特定于英文的微调
    document.querySelectorAll('.banner-overlay h1').forEach(el => {
        el.style.fontSize = '2.8rem'; // 英文字体稍小一点
    });
}

// 中文布局调整函数
function adjustChineseLayout() {
    // 恢复中文默认样式
    document.querySelectorAll('.banner-overlay h1').forEach(el => {
        el.style.fontSize = '3rem'; // 恢复默认大小
    });
} 