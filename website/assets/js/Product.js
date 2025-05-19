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
    categoryList.innerHTML = ''; // 先清空
    const categories = getAllCategories();
    
    // 分类名称映射（中英文）
    const categoryMapping = {
        'type1': { 'zh': '登山鞋', 'en': 'Hiking Boots' },
        'type2': { 'zh': '西部牛仔靴', 'en': 'Cowboy Leather Outsole Boots' },
        'type3': { 'zh': '固特异工作鞋', 'en': 'Goodyear Welt Work Shoes' }
    };
    
    const currentLang = document.documentElement.lang || 'zh';
    
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.className = 'category-item';
        categoryItem.textContent = (categoryMapping[category] && categoryMapping[category][currentLang]) || category;
        categoryItem.setAttribute('data-category', category);
        categoryList.appendChild(categoryItem);
    });
    
    // 重新绑定点击事件
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            filterProductsByCategory(category);
        });
    });
}

// 监听语言切换事件，切换时重新渲染分类栏并高亮第一个分类
document.addEventListener('languageChanged', function(e) {
    initCategories();
    // 重新高亮第一个分类并显示产品
    const firstCategory = getAllCategories()[0];
    if (firstCategory) {
        const firstCategoryItem = document.querySelector(`.category-item[data-category="${firstCategory}"]`);
        if (firstCategoryItem) {
            firstCategoryItem.classList.add('active');
            filterProductsByCategory(firstCategory);
        }
    }
});

// 初始化产品展示
function initProducts() {
    // 默认显示第一个分类的产品
    const firstCategory = getAllCategories()[0];
    if (firstCategory) {
        const firstCategoryItem = document.querySelector(`.category-item[data-category="${firstCategory}"]`);
        if (firstCategoryItem) {
            firstCategoryItem.classList.add('active');
            filterProductsByCategory(firstCategory);
        }
    }
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
                    <img src="${product.image}" alt="产品图片">
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
