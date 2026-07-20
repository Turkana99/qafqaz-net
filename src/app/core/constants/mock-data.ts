export interface ServiceItem {
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    readonly icon: string;
    readonly hoverIcon?: string;
}

export const SERVICES: ReadonlyArray < ServiceItem > = [
    {
        slug: 'server-data-center',
        title: 'Server Otaqlarının və Data Mərkəzlərinin Layihələndirilməsi və Qurulması',
        description: 'Server otaqları və data mərkəzləri üçün dayanıqlı və təhlükəsiz infrastruktur həlləri.',
        icon: '/assets/icons/serv1.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    },
    {
        slug: 'it-konsaltinq',
        title: 'İT Konsaltinq',
        description: 'Texnologiya strategiyanızı inkişaf etdirin, investisiyalarınızı maksimuma çatdırın.',
        icon: '/assets/icons/serv2.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    },
    {
        slug: 'infrastruktur-ve-sebeke',
        title: 'İnfrastruktur və Şəbəkə',
        description: 'İnfrastruktur və şəbəkə texnologiya strategiyanızı inkişaf etdirin, investisiyalarınızı maksimuma çatdırın.',
        icon: '/assets/icons/serv3.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    },
    {
        slug: 'bulud-texnologiyalari',
        title: 'Bulud Texnologiyaları',
        description: 'Miqyaslana bilən bulud həlləri ilə əməliyyatlarınızı optimallaşdırın.',
        icon: '/assets/icons/serv4.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    }, {
        slug: 'verilenler-bazasi',
        title: 'Verilənlər Bazası və İnformasiya İdarəetməsi',
        description: 'Məlumatlarınızı effektiv idarə edin, təhlükəsizliyi və sürəti təmin edin.',
        icon: '/assets/icons/serv5.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    }, {
        slug: 'kiber-tehlukesizlik',
        title: 'Kiber Təhlükəsizlik və İT Standartlarına Uyğunluq',
        description: 'Biznesinizi kibertəhlükələrdən qoruyun, İT təhlükəsizlik standartlarına riayət edin.',
        icon: '/assets/icons/serv6.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    }, {
        slug: 'proqram-teminati',
        title: 'Proqram Təminatı',
        description: 'Biznesinizin spesifik tələblərinə uyğun etibarlı, miqyaslana bilən və yüksək performanslı proqram təminatı həlləri hazırlayın.',
        icon: '/assets/icons/serv7.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    }, {
        slug: 'hosting-ve-veb',
        title: 'Hosting və Veb Xidmətləri',
        description: 'Etibarlı hosting və güclü veb həllərlə onlayn mövcudluğunuzu artırın.',
        icon: '/assets/icons/serv8.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    }, {
        slug: 'dizayn-ve-vizualizasiya',
        title: 'Dizayn və Vizualizasiya',
        description: 'Biznesinizin unikal yönünü və vizual gücünü ön plana çıxaran yaradıcı dizayn və vizuallaşdırma həlləri təqdim edin.',
        icon: '/assets/icons/serv9.svg',
        hoverIcon: '/assets/icons/serviceRightIcon.svg'
    },
];

export interface PartnerItem {
    readonly id: string;
    readonly name: string;
    readonly logoUrl: string;
}

export const PARTNERS: ReadonlyArray < PartnerItem > = [
    {
        id: '1',
        name: 'LogoIpsum 1',
        logoUrl: '/assets/logos/logoipsum1.svg'
    },
    {
        id: '2',
        name: 'LogoIpsum 2',
        logoUrl: '/assets/logos/logoipsum2.svg'
    },
    {
        id: '3',
        name: 'LogoIpsum 3',
        logoUrl: '/assets/logos/logoipsum3.svg'
    },
    {
        id: '4',
        name: 'LogoIpsum 4',
        logoUrl: '/assets/logos/logoipsum4.svg'
    }, {
        id: '5',
        name: 'LogoIpsum 5',
        logoUrl: '/assets/logos/partnyor1.svg'
    }, {
        id: '6',
        name: 'LogoIpsum 6',
        logoUrl: '/assets/logos/partnyor2.svg'
    }
];

export interface BlogPost {
    readonly slug: string;
    readonly title: string;
    readonly category: string;
    readonly date: string;
    readonly imageUrl: string;
}

export const LATEST_BLOGS: ReadonlyArray < BlogPost > = [
    {
        slug: 'penetrasiya-testi',
        title: 'Penetrasiya (Nüfuzetmə) Testi: Kibertəhlükəsizlikdə Ən Güclü Müdafiə Vasitəsi',
        category: 'Məhsul',
        date: 'Jul 20, 2026',
        imageUrl: '/assets/images/blog1.png'
    }, {
        slug: 'veb-saytlarda-istifadeci-tecrubesi',
        title: 'Veb saytlarda istifadəçi təcrübəsi və interfeysi necə təkmilləşdirilməlidir',
        category: 'Araşdırma',
        date: 'Jul 20, 2026',
        imageUrl: '/assets/images/blog2.png'
    }, {
        slug: 'texnoparkda-rezidensiya',
        title: 'Şirkətimiz Texnoparkda 10 İllik Rezidensiya Aldı!',
        category: 'Texnologiya',
        date: 'Jul 20, 2026',
        imageUrl: '/assets/images/blog3.png'
    },
];

export type StatisticCardSize = 'small' | 'large';

export interface AboutStatistic {
    readonly value: string;
    readonly suffix?: string;
    readonly label: string;
    readonly description?: string;
    readonly size: StatisticCardSize;
    readonly showPlus?: boolean;
    readonly animationSequence?: readonly number[];
}

export const ABOUT_STATS: ReadonlyArray<AboutStatistic> = [
  {
    value: '165',
    label: 'Layihə',
    description:
      'Hər bir layihə müştəri tələblərinə uyğun şəkildə planlanaraq yüksək keyfiyyətlə icra olunmuş və vaxtında uğurla təhvil verilmişdir.',
    size: 'large',
    showPlus: true,
    animationSequence: [165, 145, 135, 125, 100, 80, 60, 50, 30, 10],
  },
  {
    value: '20',
    label: 'Tərəfdaş',
    size: 'small',
    showPlus: true,
    animationSequence: [20, 15, 10, 5, 2, 1],
  },
  {
    value: '10',
    suffix: 'illik',
    label: 'Təcrübə',
    size: 'small',
    showPlus: false,
    animationSequence: [10, 8, 5, 3, 2, 1],
  },
  {
    value: '100',
    label: 'Müştəri',
    description:
      'Müştərilərimizin bizə olan güvəni və məmnuniyyəti illər ərzində qurduğumuz peşəkar münasibətin nəticəsidir.',
    size: 'large',
    showPlus: true,
    animationSequence: [100, 75, 50, 30, 15, 10, 5, 3, 2, 1],
  },
];
