// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化分类栏点击效果
    initCategorySelection();
});

// 初始化分类栏点击效果
function initCategorySelection() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    // 默认激活第一个分类
    if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
    }
    
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

// 产品筛选函数
function filterProductsByCategory(category) {
    // 获取所有产品项
    const productItems = document.querySelectorAll('.product-item');
    
    // 如果分类是"全部"，显示所有产品
    if (category === '全部') {
        productItems.forEach(item => {
            item.style.display = 'block';
        });
        return;
    }
    
    // 根据分类显示或隐藏产品
    productItems.forEach(item => {
        const productCategory = item.getAttribute('data-category');
        
        if (productCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
