export interface ServiceItem {
    slug: string;
    title: string;
    description: string;
    icon: string;
}

export const SERVICES: readonly ServiceItem[] = [
    {
        slug: 'it-konsaltinq',
        title: 'İT Konsaltinq',
        description: 'Biznesinizin inkişafı üçün doğru İT strategiyasının qurulması.',
        icon: 'monitor'
    },
    {
        slug: 'veb-saytlar',
        title: 'Veb Saytların Hazırlanması',
        description: 'Müasir və funksional veb saytların hazırlanması.',
        icon: 'globe'
    },
    {
        slug: 'sistem-inteqrasiyasi',
        title: 'Sistem İnteqrasiyası',
        description: 'Müxtəlif sistemlərin bir-biri ilə inteqrasiya edilməsi.',
        icon: 'settings'
    },
    {
        slug: 'cloud-heller',
        title: 'Bulud Həlləri',
        description: 'Təhlükəsiz və sürətli bulud infrastrukturunun qurulması.',
        icon: 'cloud'
    }, {
        slug: 'kiber-tehlukesizlik',
        title: 'Kiber Təhlükəsizlik',
        description: 'Məlumatlarınızın təhlükəsizliyinin tam təmin edilməsi.',
        icon: 'shield'
    }, {
        slug: 'texniki-destek',
        title: 'Texniki Dəstək',
        description: '7/24 fasiləsiz texniki dəstək xidmətinin göstərilməsi.',
        icon: 'headset'
    }
];

export interface PartnerItem {
    id: string;
    name: string;
    logoUrl: string;
}

export const PARTNERS: readonly PartnerItem[] = [
    {
        id: '1',
        name: 'LogoIpsum 1',
        logoUrl: 'assets/logos/logoipsum1.svg'
    }, {
        id: '2',
        name: 'LogoIpsum 2',
        logoUrl: 'assets/logos/logoipsum2.svg'
    }, {
        id: '3',
        name: 'LogoIpsum 3',
        logoUrl: 'assets/logos/logoipsum3.svg'
    }, {
        id: '4',
        name: 'LogoIpsum 4',
        logoUrl: 'assets/logos/logoipsum4.svg'
    },
];

export interface BlogPost {
    slug: string;
    title: string;
    category: string;
    date: string;
    imageUrl: string;
}

export const LATEST_BLOGS: readonly BlogPost[] = [
    {
        slug: 'it-ve-biznes',
        title: 'İT və Biznes: Gələcəyin Uğur Açarı',
        category: 'İnnovasiya',
        date: '12 İyul 2026',
        imageUrl: 'assets/images/blogs/blog1.jpg'
    }, {
        slug: 'bulud-texnologiyalari',
        title: 'Bulud Texnologiyalarının Üstünlükləri',
        category: 'Texnologiya',
        date: '10 İyul 2026',
        imageUrl: 'assets/images/blogs/blog2.jpg'
    }, {
        slug: 'kiber-tehlukesizlik-qaydalari',
        title: 'Kiber Təhlükəsizlikdə Əsas Qaydalar',
        category: 'Təhlükəsizlik',
        date: '05 İyul 2026',
        imageUrl: 'assets/images/blogs/blog3.jpg'
    }
];

export type StatisticCardSize = 'small' | 'large';

export interface AboutStatistic {
    readonly value: string;
    readonly suffix?: string;
    readonly label: string;
    readonly description?: string;
    readonly size: StatisticCardSize;
    readonly showPlus?: boolean;
}

export const ABOUT_STATS: readonly AboutStatistic[] = [
    {
        value: '10',
        label: 'Layihə',
        description: 'Hər bir layihə müştəri tələblərinə uyğun şəkildə planlanaraq yüksək keyfiyyətlə icra olunmuş və vaxtında uğurla təhvil verilmişdir.',
        size: 'large',
        showPlus: true
    }, {
        value: '1',
        label: 'Tərəfdaş',
        size: 'small',
        showPlus: true
    }, {
        value: '1',
        suffix: 'illik',
        label: 'Təcrübə',
        size: 'small',
        showPlus: false
    }, {
        value: '1',
        label: 'Müştəri',
        description: 'Müştərilərimizin bizə olan güvəni və məmnuniyyəti illər ərzində qurduğumuz peşəkar münasibətin nəticəsidir.',
        size: 'large',
        showPlus: true
    }
];
