export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export const SERVICES: readonly ServiceItem[] = [
  { slug: 'it-konsaltinq', title: 'İT Konsaltinq', description: 'Biznesinizin inkişafı üçün doğru İT strategiyasının qurulması.', icon: 'monitor' },
  { slug: 'veb-saytlar', title: 'Veb Saytların Hazırlanması', description: 'Müasir və funksional veb saytların hazırlanması.', icon: 'globe' },
  { slug: 'sistem-inteqrasiyasi', title: 'Sistem İnteqrasiyası', description: 'Müxtəlif sistemlərin bir-biri ilə inteqrasiya edilməsi.', icon: 'settings' },
  { slug: 'cloud-heller', title: 'Bulud Həlləri', description: 'Təhlükəsiz və sürətli bulud infrastrukturunun qurulması.', icon: 'cloud' },
  { slug: 'kiber-tehlukesizlik', title: 'Kiber Təhlükəsizlik', description: 'Məlumatlarınızın təhlükəsizliyinin tam təmin edilməsi.', icon: 'shield' },
  { slug: 'texniki-destek', title: 'Texniki Dəstək', description: '7/24 fasiləsiz texniki dəstək xidmətinin göstərilməsi.', icon: 'headset' }
];

export interface PartnerItem {
  id: string;
  name: string;
  logoUrl: string;
}

export const PARTNERS: readonly PartnerItem[] = [
  { id: '1', name: 'LogoIpsum 1', logoUrl: 'assets/images/partners/logo1.svg' },
  { id: '2', name: 'LogoIpsum 2', logoUrl: 'assets/images/partners/logo2.svg' },
  { id: '3', name: 'LogoIpsum 3', logoUrl: 'assets/images/partners/logo3.svg' },
  { id: '4', name: 'LogoIpsum 4', logoUrl: 'assets/images/partners/logo4.svg' },
  { id: '5', name: 'LogoIpsum 5', logoUrl: 'assets/images/partners/logo5.svg' },
];

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

export const LATEST_BLOGS: readonly BlogPost[] = [
  { slug: 'it-ve-biznes', title: 'İT və Biznes: Gələcəyin Uğur Açarı', category: 'İnnovasiya', date: '12 İyul 2026', imageUrl: 'assets/images/blogs/blog1.jpg' },
  { slug: 'bulud-texnologiyalari', title: 'Bulud Texnologiyalarının Üstünlükləri', category: 'Texnologiya', date: '10 İyul 2026', imageUrl: 'assets/images/blogs/blog2.jpg' },
  { slug: 'kiber-tehlukesizlik-qaydalari', title: 'Kiber Təhlükəsizlikdə Əsas Qaydalar', category: 'Təhlükəsizlik', date: '05 İyul 2026', imageUrl: 'assets/images/blogs/blog3.jpg' }
];

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export const STATS: readonly StatItem[] = [
  { value: '10+', label: 'İllik Təcrübə', icon: 'trending-up' },
  { value: '50+', label: 'Uğurlu Layihə', icon: 'check-circle' },
  { value: '100+', label: 'Müştəri Məmnuniyyəti', icon: 'users' }
];
