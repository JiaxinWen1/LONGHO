// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 加载产品数据
    loadProductData();
});

// 从URL参数中获取产品ID并加载产品数据
function loadProductData() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // 如果不存在产品ID，则返回产品列表页
    if (!productId) {
        window.location.href = './Product.html';
        return;
    }
    
    // 获取产品数据
    const product = getProductById(productId);
    
    // 如果产品不存在，则返回产品列表页
    if (!product) {
        console.error(`未找到ID为 ${productId} 的产品`);
        window.location.href = './Product.html';
        return;
    }
    
    // 显示产品数据
    displayProductData(product);
}

// 显示产品数据
function displayProductData(product) {
    // 更新页面标题
    document.title = `${product.name} - 产品详情`;
    
    // 更新面包屑导航
    document.getElementById('product-name').textContent = product.name;
    
    // 更新产品信息
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('.product-subtitle').textContent = product.category;
    document.getElementById('product-description-text').textContent = product.details;
    document.getElementById('style-code').textContent = `款式：${product.category}`;
    
    // 更新主图
    const mainImage = document.getElementById('main-image');
    mainImage.src = product.image;
    mainImage.alt = product.name;
    
    // 如果产品有颜色选项，则生成颜色选择器
    if (product.colors && product.colors.length > 0) {
        generateColorSelector(product.colors);
        
        // 默认选择第一个颜色并显示其对应的缩略图
        const firstColor = product.colors[0];
        generateThumbnailsFromColor(firstColor);
        
        // 显示颜色名称
        document.querySelector('.color-options h3').textContent = `显示颜色：${firstColor.name}`;
    } else {
        // 如果没有颜色选项，则使用默认方式生成缩略图
        generateThumbnails(product);
    }
    
    // 如果有特性列表，则显示
    if (product.features) {
        generateFeatureList(product.features);
    }
    
    // 初始化图片切换功能
    initImageSwitcher();
}

// 生成颜色选择器
function generateColorSelector(colors) {
    const colorSelector = document.querySelector('.color-selector');
    colorSelector.innerHTML = ''; // 清空现有内容
    
    // 为每个颜色创建一个选择项
    colors.forEach((color, index) => {
        const colorItem = document.createElement('div');
        colorItem.className = 'color-item' + (index === 0 ? ' selected' : '');
        colorItem.setAttribute('data-color', color.code);
        
        const colorImg = document.createElement('img');
        colorImg.src = color.image;
        colorImg.alt = color.name;
        
        colorItem.appendChild(colorImg);
        colorSelector.appendChild(colorItem);
    });
    
    // 添加颜色选择事件
    initColorSelection(colors);
}

// 根据颜色生成缩略图
function generateThumbnailsFromColor(color) {
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    thumbnailGallery.innerHTML = ''; // 清空现有内容
    
    // 为每个缩略图创建元素
    color.thumbnails.forEach((thumbnailPath, index) => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = index === 0 ? 'thumbnail active' : 'thumbnail';
        thumbnailDiv.setAttribute('data-image', thumbnailPath);
        
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = thumbnailPath;
        thumbnailImg.alt = `${color.name} - 视角${index + 1}`;
        
        thumbnailDiv.appendChild(thumbnailImg);
        thumbnailGallery.appendChild(thumbnailDiv);
    });
}

// 生成缩略图（用于没有颜色选项的产品）
function generateThumbnails(product) {
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    thumbnailGallery.innerHTML = ''; // 清空现有内容
    
    // 假设每个产品有4张相关图片，命名规则为原图路径的1-4.jpg
    // 从原始图像路径中提取基本路径
    const imagePath = product.image;
    const lastDotIndex = imagePath.lastIndexOf('.');
    const baseImagePath = imagePath.substring(0, lastDotIndex);
    const imageExtension = imagePath.substring(lastDotIndex);
    
    // 生成4个缩略图（可以根据实际情况调整）
    for (let i = 1; i <= 4; i++) {
        // 构建图片路径，假设图片命名如: xxx-1.jpg, xxx-2.jpg
        const thumbnailPath = `${baseImagePath.replace(/\d+$/, '')}${i}${imageExtension}`;
        
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = i === 1 ? 'thumbnail active' : 'thumbnail';
        thumbnailDiv.setAttribute('data-image', thumbnailPath);
        
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = thumbnailPath;
        thumbnailImg.alt = `${product.name} - 视角${i}`;
        
        thumbnailDiv.appendChild(thumbnailImg);
        thumbnailGallery.appendChild(thumbnailDiv);
    }
}

// 生成特性列表
function generateFeatureList(features) {
    const featureList = document.getElementById('feature-list');
    featureList.innerHTML = ''; // 清空现有内容
    
    features.forEach(feature => {
        const listItem = document.createElement('li');
        listItem.textContent = feature;
        featureList.appendChild(listItem);
    });
}

// 初始化产品图片切换功能
function initImageSwitcher() {
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    const mainImageEl = document.getElementById('main-image');
    
    thumbnailGallery.addEventListener('click', function(e) {
        // 查找被点击的缩略图
        const thumbnail = e.target.closest('.thumbnail');
        if (!thumbnail) return;
        
        // 更新主图片
        const imageUrl = thumbnail.getAttribute('data-image');
        mainImageEl.src = imageUrl;
        
        // 更新激活状态
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    });
}

// 初始化颜色选择
function initColorSelection(colors) {
    const colorSelector = document.querySelector('.color-selector');
    const mainImageEl = document.getElementById('main-image');
    const colorTextEl = document.querySelector('.color-options h3');
    
    colorSelector.addEventListener('click', function(e) {
        // 查找被点击的颜色项
        const colorItem = e.target.closest('.color-item');
        if (!colorItem || colorItem.classList.contains('selected')) return;
        
        // 更新选中状态
        document.querySelector('.color-item.selected').classList.remove('selected');
        colorItem.classList.add('selected');
        
        // 获取颜色代码
        const colorCode = colorItem.getAttribute('data-color');
        
        // 找到对应的颜色数据
        const selectedColor = colors.find(color => color.code === colorCode);
        if (!selectedColor) return;
        
        // 更新主图
        mainImageEl.src = selectedColor.image;
        
        // 更新缩略图
        generateThumbnailsFromColor(selectedColor);
        
        // 更新颜色文本
        colorTextEl.textContent = `显示颜色：${selectedColor.name}`;
    });
} 