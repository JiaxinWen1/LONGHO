// 网站内容索引
const siteIndexData = {
    zh: [
        {
            title: '首页',
            url: '../Homepage/Homepage.html',
            keywords: ['首页', '主页', 'home', 'main page'],
            description: 'LONGHO公司官方网站首页'
        },
        {
            title: '产品',
            url: '../Product/Product.html',
            keywords: ['产品', '产品展示', 'products', 'product display'],
            description: 'LONGHO公司产品展示页面'
        },
        {
            title: '关于我们',
            url: '../AboutUs/AboutUs.html',
            keywords: ['关于我们', '公司简介', '公司', '介绍', '企业', '发展', '历史', 'about', 'about us', 'company profile', 'company'],
            description: 'LONGHO公司简介与企业发展历史'
        },
        {
            title: '联系我们',
            url: '../ContactUS/ContactUS.html',
            keywords: ['联系我们', '联系方式', '电话', '邮箱', '地址', '联系', 'contact us', 'contact information'],
            description: 'LONGHO公司联系方式：电话、邮箱、地址'
        }
    ],
    en: [
        {
            title: 'Home',
            url: '../Homepage/Homepage.html',
            keywords: ['home', 'main page', 'homepage', '首页', '主页'],
            description: 'LONGHO Company Official Homepage'
        },
        {
            title: 'Products',
            url: '../Product/Product.html',
            keywords: ['products', 'product display', 'items', '产品', '产品展示'],
            description: 'LONGHO Company Products Display'
        },
        {
            title: 'About Us',
            url: '../AboutUs/AboutUs.html',
            keywords: ['about us', 'about', 'company profile', 'company', 'profile', 'history', 'introduction', '关于我们', '公司简介', '公司'],
            description: 'LONGHO Company Profile and Development History'
        },
        {
            title: 'Contact Us',
            url: '../ContactUS/ContactUS.html',
            keywords: ['contact us', 'contact', 'contact information', 'phone', 'email', 'address', '联系我们', '联系方式'],
            description: 'LONGHO Company Contact Information: Phone, Email, Address'
        }
    ]
};

// 根据当前语言获取网站索引
function getSiteIndex() {
    const lang = localStorage.getItem('language') || 'zh';
    return siteIndexData[lang];
}

// 导出网站索引
const siteIndex = getSiteIndex();

// 监听语言变化事件
document.addEventListener('languageChanged', function(e) {
    // 更新网站索引
    Object.assign(siteIndex, []); // 清空数组
    const newIndex = getSiteIndex();
    newIndex.forEach(item => siteIndex.push(item));
}); 