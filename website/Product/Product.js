// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化分类栏
    initCategories();
    
    // 初始化产品展示
    initProducts();
});

// 初始化分类栏
function initCategories() {
    const categoryList = document.querySelector('.category-list');
    const categories = getAllCategories();
    
    // 添加"全部"分类选项
    const allCategoryItem = document.createElement('li');
    allCategoryItem.className = 'category-item active';
    allCategoryItem.textContent = '全部';
    categoryList.appendChild(allCategoryItem);
    
    // 添加所有产品分类
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.className = 'category-item';
        categoryItem.textContent = category;
        categoryList.appendChild(categoryItem);
    });
    
    // 为所有分类项添加点击事件
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有分类项的激活状态
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // 添加当前点击项的激活状态
            this.classList.add('active');
            
            // 获取分类名称
            const category = this.textContent;
            console.log(`选择分类: ${category}`);
            
            // 筛选产品
            filterProductsByCategory(category);
        });
    });
}

// 初始化产品展示
function initProducts() {
    // 默认显示所有产品
    renderProducts(productsData);
}

// 渲染产品列表
function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // 清空现有内容
    
    // 遍历产品数据，创建产品卡片
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.setAttribute('data-category', product.category);
        
        productItem.innerHTML = `
            <a href="ProductDetail.html?id=${product.id}" class="product-link">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
            </a>
        `;
        
        productGrid.appendChild(productItem);
    });
}

// 产品筛选函数
function filterProductsByCategory(category) {
    const products = getProductsByCategory(category);
    renderProducts(products);
}
