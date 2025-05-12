// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化功能');
    
    setActiveNavLink();
    
    const langBtns = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'zh';
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
    
    document.addEventListener('languageChanged', () => setTimeout(setActiveNavLink, 0));
    
    // 初始化新的照片展示功能
    initPhotoGallery();
});

function setActiveNavLink() {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const aboutLink = Array.from(document.querySelectorAll('.nav-link')).find(link => link.getAttribute('data-i18n') === 'nav.about');
    if (aboutLink) {
        aboutLink.classList.add('active');
    }
}

// 照片展示数据
const galleryData = {
    workshop: [
        { src: '../picture/workshop/chejian1.png', title: '朗浩生产车间', description: '针车部门' },
        { src: '../picture/workshop/chejian2.jpg', title: '朗浩生产车间', description: 'XX部门' },
        { src: '../picture/workshop/chejian2.2.jpg', title: '朗浩生产车间', description: 'XX部门' },
        { src: '../picture/workshop2/chejian.jpg', title: '鼎盟生产车间', description: '成型部门' },
        { src: '../picture/workshop2/team.jpg', title: '鼎盟生产车间', description: '针车部门' },
    ],
    lab: [
        { src: '../picture/lab/lab.jpg', title: '实验测试中心', description: '先进的测试设备与环境' },
        { src: '../picture/lab/lab2.jpg', title: '实验测试中心', description: '专业材料性能测试区域' },
        { src: '../picture/lab/lab3.jpg', title: '实验测试中心', description: '产品耐久性与质量检测' },
        { src: '../picture/lab/lab4.jpg', title: '实验测试中心', description: '安全性能检测区域' }
    ],
    yard: [
        { src: '../picture/yard/gate.jpg', title: '朗浩公司大门', description: '朗浩科技企业入口' },
        { src: '../picture/yard/courtyard.jpg', title: '企业园区', description: '现代化企业园区环境' },
        { src: '../picture/yard/office.jpg', title: '办公楼区域', description: '舒适高效的办公环境' }
    ]
};

// 全局变量，用于存储轮播状态
let galleryState = {
    currentCategory: 'all',
    currentIndex: 0,
    autoplayInterval: null,
    isPlaying: true,
    currentPhotos: []
};

// 初始化照片展示功能
function initPhotoGallery() {
    console.log('开始初始化照片展示功能');
    const galleryWrapper = document.querySelector('.gallery-image-wrapper');
    if (!galleryWrapper) {
        console.error('找不到照片展示容器');
        return;
    }
    
    // 重置之前的状态
    galleryState = {
        currentCategory: 'all',
        currentIndex: 0,
        autoplayInterval: null,
        isPlaying: true,
        currentPhotos: []
    };
    
    addGalleryStyles();
    createGalleryItems();
    initCategoryTabs();
    initGalleryArrows();
    initAutoplay();
    initGalleryModal();
    initKeyboardNavigation();
    showCategory('all');
    
    console.log('照片展示功能初始化完成');
}

// 创建照片项DOM结构
function createGalleryItems() {
    const galleryWrapper = document.querySelector('.gallery-image-wrapper');
    galleryWrapper.innerHTML = ''; 

    Object.keys(galleryData).forEach(category => {
        galleryData[category].forEach(photo => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-category', category);
            item.style.display = 'none'; 
            
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.title;
            img.className = 'gallery-image';
            
            img.addEventListener('error', () => {
                console.error(`图片加载失败: ${photo.src}`);
            });
            
            const info = document.createElement('div');
            info.className = 'gallery-info';
            info.innerHTML = `
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
            `;
            
            item.appendChild(img);
            item.appendChild(info);
            galleryWrapper.appendChild(item);
            
            item.addEventListener('click', () => {
                openGalleryModal(galleryState.currentPhotos.indexOf(item));
            });
        });
    });
    console.log('已创建照片DOM结构');
}

// 初始化分类标签
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            showCategory(category);
        });
    });
}

// 显示特定分类的照片
function showCategory(category) {
    galleryState.currentCategory = category;
    
    const allItems = document.querySelectorAll('.gallery-item');
    
    if (category === 'all') {
        galleryState.currentPhotos = Array.from(allItems);
    } else {
        galleryState.currentPhotos = Array.from(allItems).filter(
            item => item.getAttribute('data-category') === category
        );
    }
    
    console.log(`切换到分类: ${category}, 找到照片: ${galleryState.currentPhotos.length}张`);
    
    if (galleryState.currentPhotos.length === 0) {
        // 清空进度点，因为没有照片显示
        const progressContainer = document.querySelector('.gallery-progress');
        if (progressContainer) progressContainer.innerHTML = '';
        // 隐藏主照片区域的图片（如果有的话）
        document.querySelectorAll('.gallery-item').forEach(item => item.style.display = 'none');
        console.warn('当前分类没有照片');
        // 停止自动播放，因为没有照片
        stopAutoplay(); 
        return;
    }
    
    // 重置当前索引到第一张照片
    galleryState.currentIndex = 0;
    updateGalleryDisplay();
    createProgressDots();
    resetAutoplay();
}

// 更新照片展示
function updateGalleryDisplay() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.visibility = 'hidden';
    });
    
    if (galleryState.currentPhotos.length > 0) {
        const currentPhoto = galleryState.currentPhotos[galleryState.currentIndex];
        if (currentPhoto) {
            currentPhoto.style.display = 'block';
            currentPhoto.style.opacity = '1';
            currentPhoto.style.visibility = 'visible';
        }
    }
    updateProgressDots();
}

// 创建进度指示器
function createProgressDots() {
    const progressContainer = document.querySelector('.gallery-progress');
    if (!progressContainer) return;
    
    progressContainer.innerHTML = '';
    
    galleryState.currentPhotos.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'progress-dot';
        if (index === galleryState.currentIndex) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
            galleryState.currentIndex = index;
            updateGalleryDisplay();
            resetAutoplay();
        });
        
        progressContainer.appendChild(dot);
    });
}

// 更新进度指示器状态
function updateProgressDots() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === galleryState.currentIndex);
    });
}

// 初始化导航箭头
function initGalleryArrows() {
    const prevArrow = document.querySelector('.gallery-main .gallery-prev');
    const nextArrow = document.querySelector('.gallery-main .gallery-next');
    
    // 移除可能存在的旧事件监听器
    if (prevArrow) {
        prevArrow.replaceWith(prevArrow.cloneNode(true));
    }
    if (nextArrow) {
        nextArrow.replaceWith(nextArrow.cloneNode(true));
    }
    
    // 重新获取元素并绑定事件
    const newPrevArrow = document.querySelector('.gallery-main .gallery-prev');
    const newNextArrow = document.querySelector('.gallery-main .gallery-next');
    
    if (newPrevArrow) {
        newPrevArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevPhoto();
        });
    }
    
    if (newNextArrow) {
        newNextArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextPhoto();
        });
    }
}

// 显示上一张照片
function showPrevPhoto() {
    if (galleryState.currentPhotos.length <= 1) return;
    
    // 确认当前状态
    console.log('显示上一张照片');
    console.log('当前照片数组长度:', galleryState.currentPhotos.length);
    console.log('当前索引:', galleryState.currentIndex);
    
    // 计算新索引
    const newIndex = (galleryState.currentIndex - 1 + galleryState.currentPhotos.length) % galleryState.currentPhotos.length;
    galleryState.currentIndex = newIndex;
    
    console.log('新索引:', galleryState.currentIndex);
    
    // 确保显示新索引的照片
    updateGalleryDisplay();
    resetAutoplay();
}

// 显示下一张照片
function showNextPhoto() {
    if (galleryState.currentPhotos.length <= 1) return;
    
    // 确认当前状态
    console.log('显示下一张照片');
    console.log('当前照片数组长度:', galleryState.currentPhotos.length);
    console.log('当前索引:', galleryState.currentIndex);
    
    // 计算新索引
    const newIndex = (galleryState.currentIndex + 1) % galleryState.currentPhotos.length;
    galleryState.currentIndex = newIndex;
    
    console.log('新索引:', galleryState.currentIndex);
    
    // 确保显示新索引的照片
    updateGalleryDisplay();
    resetAutoplay();
}

// 初始化自动播放
function initAutoplay() {
    const autoplayToggle = document.querySelector('.gallery-autoplay-toggle');
    
    if (autoplayToggle) {
        autoplayToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAutoplay();
        });
    }
    // 只有当有照片时才开始自动播放
    if (galleryState.currentPhotos.length > 0) {
       startAutoplay();
    }
}

// 开始自动播放
function startAutoplay() {
    if (galleryState.currentPhotos.length <= 1 || galleryState.autoplayInterval) return;
    
    galleryState.isPlaying = true;
    const autoplayToggle = document.querySelector('.gallery-autoplay-toggle');
    if (autoplayToggle) {
        autoplayToggle.classList.remove('paused');
    }
    
    galleryState.autoplayInterval = setInterval(() => {
        showNextPhoto();
    }, 4000);
}

// 停止自动播放
function stopAutoplay() {
    if (galleryState.autoplayInterval) {
        clearInterval(galleryState.autoplayInterval);
        galleryState.autoplayInterval = null;
    }
    
    galleryState.isPlaying = false;
    const autoplayToggle = document.querySelector('.gallery-autoplay-toggle');
    if (autoplayToggle) {
        autoplayToggle.classList.add('paused');
    }
}

// 切换自动播放状态
function toggleAutoplay() {
    if (galleryState.isPlaying) {
        stopAutoplay();
    } else {
        // 只有当有照片时才开始自动播放
        if (galleryState.currentPhotos.length > 0) {
            startAutoplay();
        }
    }
}

// 重置自动播放（在切换照片时调用）
function resetAutoplay() {
    // 只有当有照片且正在播放时才重置
    if (galleryState.currentPhotos.length > 0 && galleryState.isPlaying) {
        stopAutoplay();
        startAutoplay();
    } else if (galleryState.currentPhotos.length <= 1) {
        // 如果照片少于等于1张，确保停止自动播放并且按钮显示为暂停
        stopAutoplay();
    }
}

// 初始化键盘导航
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('.gallery-modal').style.display !== 'block') {
            if (e.key === 'ArrowLeft') {
                showPrevPhoto();
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                showNextPhoto();
                e.preventDefault();
            } else if (e.key === ' ') { 
                toggleAutoplay();
                e.preventDefault();
            }
        }
    });
}

// 模态框相关功能
let modalState = {
    currentIndex: 0,
    autoplayInterval: null,
    isPlaying: false 
};

// 初始化照片模态框
function initGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    const closeBtn = modal.querySelector('.gallery-close');
    const prevArrow = modal.querySelector('.gallery-prev');
    const nextArrow = modal.querySelector('.gallery-next');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    prevArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevModalPhoto();
    });
    
    nextArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextModalPhoto();
    });
    
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPrevModalPhoto();
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                showNextModalPhoto();
                e.preventDefault();
            } else if (e.key === 'Escape') {
                closeModal();
                e.preventDefault();
            } else if (e.key === ' ') { 
                // 模态框内的自动播放切换暂不实现，以简化逻辑
                // toggleModalAutoplay(); 
                e.preventDefault();
            }
        }
    });
}

// 打开模态框
function openGalleryModal(index) {
    const modal = document.querySelector('.gallery-modal');
    
    modalState.currentIndex = index !== undefined ? index : 0;
    updateModalDisplay();
    modal.style.display = 'block';
    stopAutoplay(); 
}

// 关闭模态框
function closeModal() {
    const modal = document.querySelector('.gallery-modal');
    modal.style.display = 'none';
    
    // 模态框关闭时，如果主轮播之前在播放，则恢复
    if (galleryState.isPlaying && galleryState.currentPhotos.length > 1) {
        startAutoplay();
    }
}

// 更新模态框显示
function updateModalDisplay() {
    const modal = document.querySelector('.gallery-modal');
    const modalImg = modal.querySelector('.gallery-modal-content');
    const caption = modal.querySelector('.gallery-caption');
    
    if (galleryState.currentPhotos.length > 0 && modalState.currentIndex >= 0 && modalState.currentIndex < galleryState.currentPhotos.length) {
        const currentPhotoItem = galleryState.currentPhotos[modalState.currentIndex];
        const imgElement = currentPhotoItem.querySelector('img');
        const title = currentPhotoItem.querySelector('.gallery-info h3')?.textContent || '';
        const desc = currentPhotoItem.querySelector('.gallery-info p')?.textContent || '';
        
        if (imgElement) {
            modalImg.src = imgElement.src;
            caption.innerHTML = `<strong>${title}</strong>: ${desc}`;
        } else {
            console.error('在模态框中找不到图片元素');
        }
    }
}

// 显示模态框中的上一张照片
function showPrevModalPhoto() {
    if (galleryState.currentPhotos.length <= 1) return;
    
    modalState.currentIndex = (modalState.currentIndex - 1 + galleryState.currentPhotos.length) % galleryState.currentPhotos.length;
    updateModalDisplay();
}

// 显示模态框中的下一张照片
function showNextModalPhoto() {
    if (galleryState.currentPhotos.length <= 1) return;
    
    modalState.currentIndex = (modalState.currentIndex + 1) % galleryState.currentPhotos.length;
    updateModalDisplay();
}

// 添加 CSS 样式
function addGalleryStyles() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.position = 'absolute';
        item.style.top = '0';
        item.style.left = '0';
        item.style.width = '100%';
        item.style.height = '100%';
        item.style.opacity = '0';
        item.style.visibility = 'hidden';
    });

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .gallery-item {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease, visibility 0.5s;
        }
        
        .gallery-item[style*="display: block"] {
            opacity: 1 !important;
            visibility: visible !important;
            z-index: 10 !important; /* 确保当前图片在最上层 */
        }
        
        .gallery-info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 15px;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            transition: opacity 0.3s;
            opacity: 0; /* 默认隐藏 */
        }
        
        .gallery-item:hover .gallery-info {
            opacity: 1; /* 悬停显示 */
        }
        
        .gallery-info h3 {
            margin: 0 0 5px;
            font-size: 18px;
        }
        
        .gallery-info p {
            margin: 0;
            font-size: 14px;
        }
    `;
    document.head.appendChild(styleElement);
}
