export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total: number;
  per_page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PageContentItem {
  key: string;
  title?: string;
  subtitle?: string;
  content?: string;
  [key: string]: any;
}

export interface HomeInfo {
  featuredServices: Service[];
  latestNews: BlogPost[];
  featuredProducts: Product[];
  partners: Partner[];
  pageContents?: Record<string, PageContentItem> | PageContentItem[];
}

export interface BlogCategory {
  id: string | number;
  name: string;
  slug?: string;
}

export interface BlogPost {
  id: string | number;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  coverImage?: string;
  categoryId?: string | number;
  categoryName?: string;
  publishedAt?: string;
  viewCount?: number;
  readTimeMinutes?: number;
}

export interface BlogDetail extends BlogPost {
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
}

export interface ContactMessageRequest {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceId?: string | number | null;
  message: string;
}

export interface FinancialReport {
  id: string | number;
  title: string;
  year?: number;
  quarter?: string | number;
  fileUrl: string;
  fileType?: string;
  fileSize?: string;
  publishedAt?: string;
}

export interface Partner {
  id: string | number;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  sortOrder?: number;
}

export interface ProductCategory {
  id: string | number;
  name: string;
  slug?: string;
  iconUrl?: string;
  sortOrder?: number;
}

export interface Product {
  id: string | number;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  content?: string;
  images?: string[];
  coverImage?: string;
  coverImageUrl?: string;
  imageUrl?: string;
  categoryId?: string | number;
  categoryName?: string;
  isFeatured?: boolean;
}

export interface ProductDetail extends Product {
  fullDescription?: string;
  features?: string[];
  technicalSpecifications?: Record<string, string>;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ServiceFeature {
  id?: string | number;
  title: string;
  description?: string;
  icon?: string;
  iconUrl?: string;
  sortOrder?: number;
}

export interface Service {
  id: string | number;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  iconUrl?: string;
  coverImage?: string;
  coverImageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
}

export interface ServiceDetail extends Service {
  detailedContent?: string;
  features?: ServiceFeature[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface TeamMember {
  id: string | number;
  fullName: string;
  position: string;
  photoUrl?: string;
  bio?: string;
  sortOrder?: number;
  linkedinUrl?: string;
  email?: string;
}

export interface Vacancy {
  id: string | number;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  employmentType?: string;
  workSchedule?: string;
  workHours?: string;
  deadline?: string;
  isExpired?: boolean;
  isActive?: boolean;
}

export interface VacancyDetail extends Vacancy {
  description?: string;
  requirements?: string | string[];
  responsibilities?: string | string[];
  conditions?: string | string[];
  metaTitle?: string;
  metaDescription?: string;
}
