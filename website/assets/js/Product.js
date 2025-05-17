// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前页面导航链接高亮
    setActiveNavLink();
    
    // 初始化分类栏
    initCategories();
    
    // 初始化产品展示
    initProducts();
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

// 初始化分类栏
function initCategories() {
    const categoryList = document.querySelector('.category-list');
    const categories = getAllCategories();
    
    // 添加"全部"分类选项
    const allCategoryItem = document.createElement('li');
    allCategoryItem.className = 'category-item active';
    allCategoryItem.textContent = '全部';
    categoryList.appendChild(allCategoryItem);
    
    // 分类名称映射
    const categoryMapping = {
        'type1': '登山鞋',
        'type2': '西部牛仔靴',
        'type3': '固特异工作鞋'
    };
    
    // 添加所有产品分类
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.className = 'category-item';
        // 使用映射显示中文名称，但保留原始分类值作为数据属性
        categoryItem.textContent = categoryMapping[category] || category;
        categoryItem.setAttribute('data-category', category);
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
            
            // 获取分类名称 - 如果是全部，直接使用文本内容，否则使用保存的原始分类值
            const categoryText = this.textContent;
            const category = categoryText === '全部' ? categoryText : this.getAttribute('data-category');
            console.log(`选择分类: ${categoryText}`);
            
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
                    <!-- 暂时隐藏产品描述 -->
                    <!-- <p class="product-description">${product.description || ''}</p> -->
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
