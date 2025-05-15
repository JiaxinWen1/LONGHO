// 网站内容索引
const siteIndexData = {
    zh: [
        {
            title: '首页',
            url: '../Homepage/Homepage.html',
            keywords: ['首页', '主页', 'home', 'main page', 'LONGHO', '朗浩', '朗浩科技', '欢迎', '公司', '企业', '官网'],
            description: 'LONGHO公司官方网站首页，提供公司最新信息、产品、企业风采展示',
            content: '欢迎访问LONGHO官方网站 朗浩科技是一家专业从事高科技产品研发与制造的企业 我们致力于为客户提供高品质的产品和服务'
        },
        {
            title: '产品',
            url: '../Product/Product.html',
            keywords: ['产品', '产品展示', 'products', 'product display', '类型', '参数', '规格', '产品详情', '特点', '应用', '性能', '优势', '设备', '系列', '型号'],
            description: 'LONGHO公司产品展示页面，提供全系列产品详情、规格参数、应用领域',
            content: '产品展示 高品质产品 专业定制 多种型号 高性能设备 产品类型1 产品类型2 产品类型3 产品类型4 查看详情 产品规格 技术参数'
        },
        {
            title: '关于我们',
            url: '../AboutUs/AboutUS.html',
            keywords: ['关于我们', '公司简介', '公司', '介绍', '企业', '发展', '历史', '文化', '使命', '愿景', '团队', '产能', '规模', '资质', '优势', '实力', '专业', '技术', 'about', 'about us', 'company profile', 'company'],
            description: 'LONGHO公司简介与企业发展历史，包括公司文化、团队介绍、产能规模、发展历程',
            content: '关于我们 LONGHO公司 企业简介 成立于2005年 专注于高科技产品研发与制造 企业使命 为客户创造价值 公司规模 现代化厂房 年产量 实验室 质量控制 专业团队 研发能力 生产线 月产量 数量'
        },
        {
            title: '联系我们',
            url: '../ContactUS/ContactUS.html',
            keywords: ['联系我们', '联系方式', '电话', '邮箱', '地址', '联系', '客服', '咨询', '交流', '合作', '洽谈', '商务', '留言', '信息', '咨询热线', 'contact us', 'contact information'],
            description: 'LONGHO公司联系方式：电话、邮箱、地址、客服咨询、商务合作',
            content: '联系我们 LONGHO诚邀合作 公司总机 +86 123 4567 8910 Email 广东省东莞市厚街 公司传真 商务合作 技术支持 查看二维码 欢迎访问我们的线下展厅'
        }
    ],
    en: [
        {
            title: 'Home',
            url: '../Homepage/Homepage.html',
            keywords: ['home', 'main page', 'homepage', 'welcome', 'LONGHO', 'company', 'enterprise', 'official website', '首页', '主页'],
            description: 'LONGHO Company Official Homepage, providing latest company information, products and corporate style',
            content: 'Welcome to LONGHO official website LONGHO Technology is a professional enterprise engaged in high-tech product development and manufacturing We are committed to providing high-quality products and services to customers'
        },
        {
            title: 'Products',
            url: '../Product/Product.html',
            keywords: ['products', 'product display', 'items', 'types', 'parameters', 'specifications', 'details', 'features', 'applications', 'performance', 'advantages', 'equipment', 'series', 'models', '产品', '产品展示'],
            description: 'LONGHO Company Products Display, providing details, specifications and application fields for the full range of products',
            content: 'Product Display High Quality Products Professional Customization Various Models High Performance Equipment Type 1 Type 2 Type 3 Type 4 View Details Product Specifications Technical Parameters'
        },
        {
            title: 'About Us',
            url: '../AboutUs/AboutUS.html',
            keywords: ['about us', 'about', 'company profile', 'company', 'profile', 'history', 'introduction', 'culture', 'mission', 'vision', 'team', 'production capacity', 'scale', 'qualification', 'advantages', 'strength', 'professional', 'technology', '关于我们', '公司简介', '公司'],
            description: 'LONGHO Company Profile and Development History, including company culture, team introduction, production capacity and development course',
            content: 'About Us LONGHO Company Company Profile Founded in 2005 Focus on high-tech product development and manufacturing Corporate Mission Create value for customers Company Scale Modern factory Annual production Monthly output Laboratory Quality control Professional team R&D capability Production line Quantity'
        },
        {
            title: 'Contact Us',
            url: '../ContactUS/ContactUS.html',
            keywords: ['contact us', 'contact', 'contact information', 'phone', 'email', 'address', 'customer service', 'consultation', 'communication', 'cooperation', 'negotiation', 'business', 'message', 'information', 'hotline', '联系我们', '联系方式'],
            description: 'LONGHO Company Contact Information: Phone, Email, Address, Customer Service, Business Cooperation',
            content: 'Contact Us LONGHO invites cooperation Company Phone +86 123 4567 8910 Email Dongguan Houjie Company Fax Business Cooperation Technical Support View QR code Welcome to visit our offline showroom'
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