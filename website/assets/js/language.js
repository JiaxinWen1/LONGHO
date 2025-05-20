// 语言配置
const translations = {
    zh: {
        // 导航栏
        'nav.home': '首页',
        'nav.products': '产品',
        'nav.about': '关于我们',
        'nav.contact': '联系我们',
        'search.placeholder': '搜索...',
        
        // 轮播图部分
        'carousel.title1': '用科技的力量做高品质的鞋',
        'carousel.desc1': '勤劳 务实 责任 有果 创新',
        'carousel.title2': '创新技术，引领未来',
        'carousel.desc2': '专注于为客户提供优质解决方案',
        'carousel.title3': '全球视野，本地服务',
        'carousel.desc3': '我们的产品遍布全球各地',
        'carousel.button1': '了解更多',
        
        // 首页部分
        'home.about_title': '关于我们',
        'home.about_subtitle': '朗浩科技有限公司',
        'home.about_desc': '是一家国家级高新技术企业。自 2012 年成立，经过十年的持续改善及创新，现已发展成为集制鞋及自动化装备研发为一体的新型制鞋企业。公司不断加强和高校的联合开发，加强新型材料和功能的运用，逐渐培养出一支具备高新技术人才的管理团队。公司拥有自主的研发设计团队，现已成长为从研发到生产销售一体的全功能性企业',
        'home.about_button': '查看更多',
        'home.products_title': '产品展示',
        'home.product1_title': '产品类型1',
        'home.product1_desc': '高品质产品，满足您的需求',
        'home.product2_title': '产品类型2',
        'home.product2_desc': '专业设计，品质保证',
        'home.product3_title': '产品类型3',
        'home.product3_desc': '创新技术，卓越性能',
        'home.product4_title': '产品类型4',
        'home.product4_desc': '多样选择，满足各种需求',
        'home.product_button': '查看详情',
        'home.features_title': '我们的优势',
        'home.feature1_title': '认证资质    ',
        'home.feature1_desc': '已获得BSCI、SQP、CE、SATRA等认证以及数十项专利',
        'home.feature2_title': '自主研发',
        'home.feature2_desc': '拥有自己的实验室和研发团队',
        'home.feature3_title': '经验丰富',
        'home.feature3_desc': '与多家国际知名品牌合作',
        'home.feature4_title': '客户为先',
        'home.feature4_desc': '以客户需求为中心，提供个性化解决方案',
        
        // 产品页面
        'product.title': '产品标题',
        'product.item1': '产品1',
        'product.subtitle': '产品子标题',
        'product.color_options': '显示颜色',
        'product.detail': '产品详情',
        'product.style': '款式：',
        'product.color_show': '显示颜色：',
        
        // 关于我们页面
        'about.title': '关于我们',
        'about.content': '朗浩科技有限公司是一家国家级高新技术企业。自 2012 年成立，经过十年的持续改善及创新，现已发展成为集制鞋及自动化装备研发为一体的新型制鞋企业。公司不断加强和高校的联合开发，加强新型材料和功能的运用，逐渐培养出一支具备高新技术人才的管理团队。公司拥有自主的研发设计团队，现已成长为从研发到生产销售一体的全功能性企业',
        'about.banner.title': '关于我们',
        'about.banner.subtitle': '用科技的力量做高品质的鞋',
        'about.company.name': '朗浩科技有限公司',
        'about.company.badge': '国家级高新技术企业',
        'about.company.year': '始创于2012年',
        'about.company.desc': '经过十年的持续改善及创新，现已发展成为集制鞋及自动化装备研发为一体的新型制鞋企业。公司不断加强和高校的联合开发，强化新型材料和功能的运用，逐渐培养出一支具备高新技术人才的管理团队。公司拥有自主的研发设计团队，现已成长为从研发到生产销售一体的全功能性企业。',
        'about.subsidiary.name': '鼎盟创新有限公司',
        'about.subsidiary.badge': '柬埔寨子公司',
        'about.subsidiary.year': '成立于2024年',
        'about.subsidiary.desc': '专注于安全鞋和运动鞋的生产制造，凭借精湛的工艺和对品质的执着追求，打造出一系列符合市场需求和高质量标准的产品。多年来始终秉持创新理念，积极适应市场变化，在激烈的市场竞争中不断发展壮大，逐步在鞋类行业树立了良好的品牌形象，赢得了全球消费者的广泛认可和信赖。',
        'about.certification.title': '认证资质',
        'about.certification.note': '拥有数十项专利，大部分专利成功转化为生产力，并获得科学技术奖项。',
        'about.team.title': '人员配备',
        'about.team.longho': '朗浩科技',
        'about.team.topalliance': '鼎盟创新',
        'about.team.employees': '员工人数',
        'about.team.desc': '加强与高校的合作，利用新材料新功能，逐步建立起一支高素质的高效管理队伍。',
        'about.capacity.title': '各部门产能',
        'about.capacity.cambodia': '(柬埔寨)',
        'about.capacity.china': '(中国)',
        'about.capacity.stitching': '针车线',
        'about.capacity.goodyear': '固特异产线',
        'about.capacity.cement': '冷粘产线',
        'about.capacity.outsole': '大底组装线',
        'about.capacity.desma': '德士马射出线',
        'about.capacity.injection': '普通注塑线',
        'about.capacity.embroidery': '电绣车间',
        'about.capacity.count': '数量',
        'about.capacity.monthly': '月产量',
        'about.design.title': '设计研发中心',
        'about.design.desc': '设计研发是企业创新的核心力量。这里汇聚了经验丰富的鞋类设计师、工艺专家等专业人才，他们凭借敏锐行业触觉和精湛技艺，深入调研市场潮流，精心构思、反复打磨每一款鞋样，确保样品兼具美观与功能性，为后续大规模生产提供高品质参照，有力推动鞋厂新品不断推陈出新，在激烈市场竞争中始终保持优势。',
        'about.lab.title': '实验测试中心',
        'about.lab.desc': '朗浩与鼎盟都是SATRA的成员之一，拥有二十多台专业的材料和成品试验机（拉伸/磨边/弯曲/压缩/防水捻丝机等），并有经验丰富的测试人员对公司产品进行相关测试。',
        'about.gallery.title': '公司照片',
        'gallery.all': '全部',
        'gallery.workshop': '车间',
        'gallery.lab': '实验室',
        'gallery.yard': '园区',
        'gallery.playpause': '暂停/播放',
        
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
        'contact.company_location': '广东省东莞市厚街镇赤岭工业区元前街40号',
        'contact.company_location2': 'Road#4 Phum Thlerk, Khum Pperk, Sruk Angsnoul, Kondal Province,Combodia',
        'contact.company_zip': '朗浩科技有限公司地址',
        'contact.company_zip2': '鼎盟创新有限公司地址',
        'contact.map.view': '点击查看地图',
        'contact.media': '523940',
        'contact.media.email': '邮编',
        'contact.other': 'GM4Q+XG, Toul Sarla, 柬埔寨',
        'contact.other.qrcode': '邮编',
        'contact.company_fax.number': '公司总机',
        
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
        'footer.category1': '登山鞋',
        'footer.category2': '西部牛仔靴',
        'footer.category3': '固特异工作鞋',

        'footer.contact': '联系方式',
        'footer.address': '东莞市厚街镇赤岭工业区元前街40号',
        'footer.address2': 'Road#4 Phum Thlerk, Khum Pperk,Sruk Angsnoul, Kondal Province,Combodia',
        'footer.copyright': '© 2025.LONGHO',
        'vision.title': '愿景与计划',
        'vision.desc': '我们致力于成为行业领先的创新型企业，不断推动制鞋工艺与自动化技术的进步。未来，公司将持续加大研发投入，拓展国际市场，提升品牌影响力，并积极践行可持续发展战略，为客户、员工和社会创造更大价值。',
        'vision.subtitle': '引领行业创新，成就美好未来',
        'footer.email': 'salesman02@longhoshoes.com',
        'footer.phone': '+86 123 4567 8910'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.about': 'About Us',
        'nav.contact': 'Contact Us',
        'search.placeholder': 'Search...',
        
        // Carousel
        'carousel.title1': 'Producing high-quality shoes with today\'s technology',
        'carousel.desc1': 'Dilligence, Pragmatism, Commitment, Accomplishment, Innovation',
        'carousel.title2': 'Innovative Technology, Leading the Future',
        'carousel.desc2': 'Dedicated to providing excellent solutions for customers',
        'carousel.title3': 'Global Vision, Local Service',
        'carousel.desc3': 'Our products are distributed worldwide',
        'carousel.button1': 'Learn More',
        
        // Homepage
        'home.about_title': 'About Us',
        'home.about_subtitle': 'LONGHO',
        'home.about_desc': 'grows to be a complex enterprise of footwear manufacturing and automatic equipment research and development and innovation. LONGHO is a fully functional company runs from sample design to production manufacturing and selling with independent design and development team.',
        'home.about_button': 'View More',
        'home.products_title': 'Products',
        'home.product1_title': 'Product Type 1',
        'home.product1_desc': 'High-quality products to meet your needs',
        'home.product2_title': 'Product Type 2',
        'home.product2_desc': 'Professional design, quality assurance',
        'home.product3_title': 'Product Type 3',
        'home.product3_desc': 'Innovative technology, excellent performance',
        'home.product4_title': 'Product Type 4',
        'home.product4_desc': 'Various choices to meet different needs',
        'home.product_button': 'View Details',
        'home.features_title': 'Our Advantages',
        'home.feature1_title': 'Certification Qualification',
        'home.feature1_desc': 'Has obtained BSCI, SQP, CE, SATRA and other certifications and dozens of patents',
        'home.feature2_title': 'Independent Development',
        'home.feature2_desc': 'Has its own laboratory and research team',
        'home.feature3_title': 'Experienced',
        'home.feature3_desc': 'Cooperation with many international well-known brands',
        'home.feature4_title': 'Customer-Centric',
        'home.feature4_desc': 'Customer-centric approach providing personalized solutions',
        
        // Product page
        'product.title': 'Product Title',
        'product.item1': 'Product 1',

        'product.subtitle': 'Product Subtitle',
        'product.color_options': 'Color Options',
        'product.detail': 'Product Detail',
        'product.style': 'Style: ',
        'product.color_show': 'Color Options: ',
        
        // About Us page
        'about.title': 'About Us',
        'about.content': 'LONGHO Company is dedicated to the research, development and production of intelligent devices, committed to providing high-quality products and excellent service to our customers.',
        'about.banner.title': 'About Us',
        'about.banner.subtitle': 'Producing high-quality shoes with today\'s technology',
        'about.company.name': 'LONGHO Technology Co., Ltd.',
        'about.company.badge': 'National High-Tech Enterprise',
        'about.company.year': 'Founded in 2012',
        'about.company.desc': 'After a decade of continuous improvement and innovation, it has now developed into a new type of footwear enterprise integrating footwear and automated equipment R&D. The company continues to strengthen joint development with universities, strengthen the application of new materials and functions, and gradually cultivate a management team with high-tech talents. The company has its own R&D and design team and has grown into a fully functional enterprise integrating R&D, production, and sales.',
        'about.subsidiary.name': 'Top Alliance Innovation Co., Ltd.',
        'about.subsidiary.badge': 'Cambodia Subsidiary',
        'about.subsidiary.year': 'Established in 2024',
        'about.subsidiary.desc': 'Focusing on the production of safety shoes and sports shoes, with exquisite craftsmanship and a relentless pursuit of quality, we create a series of products that meet market demands and high-quality standards. Over the years, we have always adhered to the concept of innovation, actively adapted to market changes, continued to grow in fierce market competition, and gradually established a good brand image in the footwear industry, winning widespread recognition and trust from global consumers.',
        'about.certification.title': 'Certifications',
        'about.certification.note': 'Owns dozens of patents, most of which have been successfully transformed into productivity, and has received awards for scientific and technological achievements.',
        'about.team.title': 'Personnel',
        'about.team.longho': 'LONGHO Technology',
        'about.team.topalliance': 'Top Alliance',
        'about.team.employees': 'Employees',
        'about.team.desc': 'Strengthening cooperation with universities, utilizing new materials and functions, and gradually building a high-quality and efficient management team.',
        'about.capacity.title': 'Department Capacity',
        'about.capacity.cambodia': '(Cambodia)',
        'about.capacity.china': '(China)',
        'about.capacity.stitching': 'Stitching Line',
        'about.capacity.goodyear': 'GoodYear Welt',
        'about.capacity.cement': 'Cement Line',
        'about.capacity.outsole': 'Outsole Assembly',
        'about.capacity.desma': 'Desma Injection',
        'about.capacity.injection': 'Regular Injection',
        'about.capacity.embroidery': 'Embroidery Workshop',
        'about.capacity.count': 'Quantity',
        'about.capacity.monthly': 'Monthly Output',
        'about.design.title': 'Design R&D Center',
        'about.design.desc': 'Design and R&D is the core force of enterprise innovation. Here, experienced shoe designers, process experts and other professionals gather, who, with keen industry touch and exquisite skills, research market trends, carefully conceive and repeatedly polish each shoe sample to ensure that samples are both beautiful and functional, providing high-quality references for subsequent mass production, strongly promoting the continuous innovation of new products in the shoe factory, and maintaining an advantage in fierce market competition.',
        'about.lab.title': 'Laboratory Testing Center',
        'about.lab.desc': 'Both LONGHO and Top Alliance are members of SATRA, with more than 20 professional material and finished product testing machines (tension/edge grinding/bending/compression/waterproof twisting machine, etc.), and experienced testing personnel to test the company\'s products.',
        'about.gallery.title': 'Company Photos',
        'gallery.all': 'All',
        'gallery.workshop': 'Workshop',
        'gallery.lab': 'Laboratory',
        'gallery.yard': 'Campus',
        'gallery.playpause': 'Pause/Play',
        
        // Contact Us page
        'contact.title': 'Contact Us',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.address': 'Address',
        'contact.address1': 'Dongguan City, Guangdong Province',
        'contact.banner_text1': 'Contact Us,',
        'contact.banner_text2': 'LONGHO invites cooperation for a win-win future',
        'contact.company_phone': 'Company Phone',
        'contact.company_location': 'No.4, Chiling Yuanqian Street, HoujieTown,Dong uan City, Guangdong Province, China',
        'contact.company_location2': 'Road#4 Phum Thlerk, Khum Pperk, Sruk Angsnoul, Kondal Province,Combodia',
        'contact.company_zip': 'LONGHO Technology Co., Ltd.',
        'contact.company_zip2': 'Top Alliance Innovation Co., Ltd.',
        'contact.media': '523940',
        'contact.media.email': 'Zipcode',
        'contact.other': 'GM4Q+XG, Toul Sarla, Cambodia',
        'contact.other.qrcode': 'Zipcode',
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
        'footer.category1': 'Hiking Boots',
        'footer.category2': 'Cowboy Leather Outsole Boots',
        'footer.category3': 'Goodyear Welt Work Shoes',
        'footer.contact': 'Contact Information',
        'footer.address': 'No.4, Chiling Yuanqian Street, HoujieTown,Dongguan City, Guangdong Province, China',
        'footer.address2': 'Road#4 Phum Thlerk, Khum Pperk,Sruk Angsnoul, Kondal Province,Combodia',
        'footer.copyright': '© 2025.LONGHO',
        'vision.title': 'Vision & Plan',
        'vision.desc': 'We have expansion plans, expand plant, equipment, increase personnel, enhance production capacity, enhance competitiveness, and look forward to a bright future. We hope to continue to provide our customers with high quality products and services.',
        'vision.subtitle': 'Leading Innovation, Shaping the Future',
        'footer.email': 'salesman02@longhoshoes.com',
        'footer.phone': '+86 123 4567 8910'
    }
};

// 获取用户之前选择的语言，如果没有则默认为英文
let currentLang = localStorage.getItem('language') || 'en';

// 设置语言函数
function setLanguage(lang) {
    // 存储当前语言
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // 更新页面标题
    updatePageTitle(lang);
    
    // 保存当前激活的导航链接，以便后续恢复
    const activeNav = document.querySelector('.nav-link.active');
    let activePath = '';
    if (activeNav) {
        activePath = activeNav.getAttribute('href');
    }
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 更新所有带有 data-i18n-before 属性的元素
    document.querySelectorAll('[data-i18n-before]').forEach(element => {
        const key = element.getAttribute('data-i18n-before');
        // 检查元素是否已有保存的原始内容，否则保存当前内容
        if (!element.hasAttribute('data-original-content')) {
            element.setAttribute('data-original-content', element.innerText);
        }
        const originalContent = element.getAttribute('data-original-content');
        
        if (translations[lang][key]) {
            element.innerHTML = `<span class="label">${translations[lang][key]}</span>${originalContent}`;
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
    
    // 恢复导航链接的激活状态
    if (typeof setActiveNavLink === 'function') {
        // 如果页面有自己的setActiveNavLink函数，则调用它
        setTimeout(setActiveNavLink, 0);
    } else {
        // 如果没有，则尝试根据当前页面路径设置active类
        const path = window.location.pathname;
        
        // 移除所有导航链接的active类
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // 根据当前页面路径设置active类
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href') || '';
            if ((path.includes('Homepage') && href.includes('Homepage.html')) ||
                (path.includes('Product') && href.includes('Product.html') && !href.includes('ProductDetail.html')) ||
                (path.includes('AboutUs') && href.includes('AboutUS.html')) ||
                (path.includes('ContactUS') && href.includes('ContactUS.html'))) {
                link.classList.add('active');
            }
        });
    }
    
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