// 语言配置
const translations = {
    zh: {
        // 导航栏
        'nav.home': '首页',
        'nav.products': '产品',
        'nav.about': '关于我们',
        'nav.contact': '联系我们',
        'search.placeholder': '搜索...',
        
        // 产品页面
        'product.title': '产品',
        'product.item1': '产品1',
        'product.name': 'Type1',
        // 关于我们页面
        'about.title': '关于我们',
        'about.content': 'LONGHO公司是一家专注于智能设备研发和生产的公司，致力于为客户提供高品质的产品和优质的服务。',
        
        // 联系我们页面
        'contact.title': '联系我们',
        'contact.phone': '电话',
        'contact.email': '邮箱',
        'contact.address': '地址',
        'contact.address1': '广东省东莞市',
        'contact.banner_text1': '联系我们，',
        'contact.banner_text2': 'LONGHO诚邀合作，共赢未来',
        'contact.company_phone': '公司总机',
        'contact.company_fax': '公司传真',
        'contact.company_location': '广东省东莞市厚街镇',
        'contact.company_zip': '(123456)',
        'contact.map.view': '点击查看地图',
        
        // 搜索结果页面
        'search.results': '搜索结果',
        'search.term': '搜索关键词',
        'search.no_results': '未找到相关结果',
        'search.page_title': '搜索结果',
        'search.view_all_results': '查看全部结果...',
        'search.min_chars': '请输入至少2个字符',
        'search.loading': '正在搜索全站内容...',
        'search.error': '搜索时发生错误，请稍后再试',
        'search.content_match': '内容匹配',

        // 页脚部分
        'footer.about': '公司简介',
        'footer.about_text': 'LONGHO',
        'footer.quick_links': '快速链接',
        'footer.product_categories': '产品分类',
        'footer.category1': '类型1',
        'footer.category2': '类型2',
        'footer.category3': '类型3',
        'footer.category4': '类型4',
        'footer.contact': '联系方式',
        'footer.address': '东莞市厚街',
        'footer.copyright': '© 2025.LONGHO'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.about': 'About Us',
        'nav.contact': 'Contact Us',
        'search.placeholder': 'Search...',
        
        // Product page
        'product.title': 'Products',
        'product.item1': 'Product 1',
        'product.name': 'Type1En',

        // About Us page
        'about.title': 'About Us',
        'about.content': 'LONGHO Company is dedicated to the research, development and production of intelligent devices, committed to providing high-quality products and excellent service to our customers.',
        
        // Contact Us page
        'contact.title': 'Contact Us',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.address': 'Address',
        'contact.address1': 'Dongguan City, Guangdong Province',
        'contact.banner_text1': 'Contact Us,',
        'contact.banner_text2': 'LONGHO invites cooperation for a win-win future',
        'contact.company_phone': 'Main Line',
        'contact.company_fax': 'Fax',
        'contact.company_location': 'Houjie Town, Dongguan City, Guangdong Province',
        'contact.company_zip': '(123456)',
        'contact.media': 'To Be Filled',
        'contact.media.email': 'info@longho.com',
        'contact.other': 'Also To Be Filled',
        'contact.other.qrcode': 'View QR Code',
        'contact.map.view': 'View on Map',
        
        // Search results page
        'search.results': 'Search Results',
        'search.term': 'Search term',
        'search.no_results': 'No results found',
        'search.page_title': 'Search Results',
        'search.view_all_results': 'View all results...',
        'search.min_chars': 'Please enter at least 2 characters',
        'search.loading': 'Searching site content...',
        'search.error': 'An error occurred while searching, please try again later',
        'search.content_match': 'Content match',

        // Footer section
        'footer.about': 'About Company',
        'footer.about_text': 'LONGHO',
        'footer.quick_links': 'Quick Links',
        'footer.product_categories': 'Product Categories',
        'footer.category1': 'Type 1',
        'footer.category2': 'Type 2',
        'footer.category3': 'Type 3',
        'footer.category4': 'Type 4',
        'footer.contact': 'Contact Information',
        'footer.address': 'Houjie, Dongguan',
        'footer.copyright': '© 2025.LONGHO'
    }
};

// 获取用户之前选择的语言，如果没有则默认为中文
let currentLang = localStorage.getItem('language') || 'zh';

// 设置语言函数
function setLanguage(lang) {
    // 存储当前语言
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // 更新页面标题
    updatePageTitle(lang);
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 更新所有带有 data-i18n-placeholder 属性的元素
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // 更新所有带有 data-i18n-title 属性的元素
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (translations[lang][key]) {
            element.title = translations[lang][key];
        }
    });
    
    // 更新所有带有 data-i18n-alt 属性的元素
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (translations[lang][key]) {
            element.alt = translations[lang][key];
        }
    });
    
    // 更新所有带有 data-i18n-tooltip 属性的元素
    document.querySelectorAll('[data-i18n-tooltip]').forEach(element => {
        const key = element.getAttribute('data-i18n-tooltip');
        if (translations[lang][key]) {
            element.setAttribute('data-tooltip', translations[lang][key]);
        }
    });

    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 更新HTML标签的lang属性
    document.documentElement.lang = lang;
    
    // 根据不同语言应用不同的样式（如果需要）
    document.body.classList.remove('lang-zh', 'lang-en');
    document.body.classList.add('lang-' + lang);
    
    // 触发语言变更事件，让其他脚本可以感知语言变化
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
}

// 根据页面名称更新标题
function updatePageTitle(lang) {
    const path = window.location.pathname;
    let title = '';
    
    if (path.includes('Homepage')) {
        title = translations[lang]['nav.home'];
    } else if (path.includes('Product')) {
        title = translations[lang]['nav.products'];
    } else if (path.includes('AboutUs')) {
        title = translations[lang]['nav.about'];
    } else if (path.includes('ContactUS')) {
        title = translations[lang]['nav.contact'];
    } else if (path.includes('SearchResults')) {
        title = translations[lang]['search.page_title'];
    }
    
    if (title) {
        document.title = 'LONGHO - ' + title;
    }
}

// 初始化语言
document.addEventListener('DOMContentLoaded', () => {
    // 应用保存的语言设置
    setLanguage(currentLang);

    // 添加语言切换按钮事件监听
    document.querySelectorAll('.lang-btn').forEach(btn => {
        // 根据当前语言设置按钮状态
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
        
        // 添加点击事件
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // 监听URL变化，在页面切换后应用语言
    window.addEventListener('popstate', () => {
        setLanguage(currentLang);
    });
}); 