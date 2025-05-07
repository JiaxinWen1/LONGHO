// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 预加载所有产品图片
    preloadImages();
    
    // 初始化产品图片切换功能
    initImageSwitcher();
    
    // 初始化颜色选择
    initColorSelection();
    
    // 初始化按钮事件
    initButtonActions();
});

// 产品图片集 - 缓存引用避免重复查询
const mainImageEl = document.getElementById('main-image');
const thumbnailEls = document.querySelectorAll('.thumbnail');
const colorTextEl = document.querySelector('.color-options h3');

// 产品图片集
const productImages = {
    'color1': {
        main: '../picture/type1/011-1 1.jpg',
        thumbnails: [
            '../picture/type1/011-1 1.jpg',
            '../picture/type1/011-1 2.jpg',
            '../picture/type1/011-1 3.jpg',
            '../picture/type1/011-1 4.jpg'
        ]
    },
    'color2': {
        main: '../picture/type1/011-1.2 1 .jpg',
        thumbnails: [
            '../picture/type1/011-1.2 1 .jpg',
            '../picture/type1/011-1.2 2.jpg',
            '../picture/type1/011-1.2 3.jpg',
            '../picture/type1/011-1.2 4.jpg'
        ]
    },
    'color3': {
        main: '../picture/type1/011-1.3 1.jpg',
        thumbnails: [
            '../picture/type1/011-1.3 1.jpg',
            '../picture/type1/011-1.3 2.jpg',
            '../picture/type1/011-1.3 3.jpg',
            '../picture/type1/011-1.3 4.jpg'
        ]
    },
    'color4': {
        main: '../picture/type1/011-1.4 1.jpg',
        thumbnails: [
            '../picture/type1/011-1.4 1.jpg',
            '../picture/type1/011-1.4 2.jpg',
            '../picture/type1/011-1.4 3.jpg',
            '../picture/type1/011-1.4 4.jpg'
        ]
    }
};

// 颜色文本映射 - 避免条件判断
const colorTextMap = {
    'color1': '显示颜色：颜色1',
    'color2': '显示颜色：颜色2',
    'color3': '显示颜色：颜色3',
    'color4': '显示颜色：颜色4'
};

// 预加载所有图片以提高切换速度
function preloadImages() {
    // 创建一个不可见的容器来预加载图片
    const preloadContainer = document.createElement('div');
    preloadContainer.style.display = 'none';
    document.body.appendChild(preloadContainer);
    
    // 预加载所有颜色的所有图片
    const allImages = [];
    
    // 收集所有图片URL
    Object.values(productImages).forEach(imageSet => {
        allImages.push(imageSet.main); // 添加主图
        allImages.push(...imageSet.thumbnails); // 添加所有缩略图
    });
    
    // 去重
    const uniqueImages = [...new Set(allImages)];
    
    // 预加载每个图片
    uniqueImages.forEach(imgUrl => {
        const img = new Image();
        img.src = imgUrl;
        preloadContainer.appendChild(img);
    });
}

// 初始化产品图片切换功能 - 使用事件委托减少事件监听器数量
function initImageSwitcher() {
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    
    thumbnailGallery.addEventListener('click', function(e) {
        // 查找被点击的缩略图
        const thumbnail = e.target.closest('.thumbnail');
        if (!thumbnail) return;
        
        // 更新主图片
        const imageUrl = thumbnail.getAttribute('data-image');
        mainImageEl.src = imageUrl;
        
        // 更新激活状态
        thumbnailEls.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    });
}

// 初始化颜色选择 - 使用事件委托
function initColorSelection() {
    const colorSelector = document.querySelector('.color-selector');
    
    colorSelector.addEventListener('click', function(e) {
        // 查找被点击的颜色项
        const colorItem = e.target.closest('.color-item');
        if (!colorItem || colorItem.classList.contains('selected')) return;
        
        // 更新选中状态
        document.querySelector('.color-item.selected').classList.remove('selected');
        colorItem.classList.add('selected');
        
        // 获取颜色代码并更新产品图片
        const colorCode = colorItem.getAttribute('data-color');
        updateProductImages(colorCode);
    });
}

// 根据选择的颜色更新产品图片 - 优化DOM操作
function updateProductImages(colorCode) {
    // 获取对应颜色的图片集
    const imageSet = productImages[colorCode];
    if (!imageSet) return;
    
    // 更新主图 - 直接修改src属性
    mainImageEl.src = imageSet.main;
    
    // 优化：只在必要时更新DOM
    thumbnailEls.forEach((thumbnail, index) => {
        if (index < imageSet.thumbnails.length) {
            const imgUrl = imageSet.thumbnails[index];
            thumbnail.setAttribute('data-image', imgUrl);
            
            // 只有当图片URL发生变化时才更新src
            const img = thumbnail.querySelector('img');
            if (img.src !== imgUrl) {
                img.src = imgUrl;
            }
        }
    });
    
    // 重置激活状态
    thumbnailEls.forEach(thumb => thumb.classList.remove('active'));
    thumbnailEls[0].classList.add('active');
    
    // 更新颜色文本 - 直接从映射获取
    colorTextEl.textContent = colorTextMap[colorCode];
}

// 初始化按钮事件
function initButtonActions() {
    // 可以在这里添加其他按钮的事件监听
}

// 从URL参数中获取产品ID并加载产品数据
function loadProductData() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // 如果存在产品ID，则加载对应的产品数据
    if (productId) {
        console.log(`加载产品ID: ${productId} 的数据`);
        // 在实际项目中，这里应该是API调用
    }
}

// 调用加载产品数据
loadProductData(); 