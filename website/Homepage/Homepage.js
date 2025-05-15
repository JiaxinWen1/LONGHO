// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前页面导航链接高亮
    setActiveNavLink();
    
    // 轮播图控制
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    let currentIndex = 0;
    
    // 初始化显示第一个
    showSlide(currentIndex);
    
    // 自动轮播
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }, 5000);
    
    // 前一张
    prevBtn.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
        
        // 重新开始自动轮播
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        }, 5000);
    });
    
    // 后一张
    nextBtn.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
        
        // 重新开始自动轮播
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        }, 5000);
    });
    
    // 显示指定索引的轮播图
    function showSlide(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
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
    
    // 产品卡片悬停效果
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// 设置当前页面导航链接高亮
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // 移除所有active类
        link.classList.remove('active');
        
        // 获取链接路径
        const linkPath = link.getAttribute('href');
        
        // 检查当前页面路径
        if (currentPath.includes('Homepage') || currentPath === '/' || currentPath.endsWith('/')) {
            // 首页情况
            if (linkPath.includes('Homepage.html')) {
                link.classList.add('active');
            }
        } else if (currentPath.includes('Product')) {
            // 产品页面
            if (linkPath.includes('Product.html')) {
                link.classList.add('active');
            }
        } else if (currentPath.includes('AboutUs')) {
            // 关于我们页面
            if (linkPath.includes('AboutUS.html')) {
                link.classList.add('active');
            }
        } else if (currentPath.includes('ContactUS')) {
            // 联系我们页面
            if (linkPath.includes('ContactUS.html')) {
                link.classList.add('active');
            }
        }
    });
}
