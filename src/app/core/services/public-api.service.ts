import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ApiResponse,
  BlogCategory,
  BlogDetail,
  BlogPost,
  ContactMessageRequest,
  FinancialReport,
  HomeInfo,
  PaginatedResponse,
  Partner,
  Product,
  ProductCategory,
  ProductDetail,
  Service,
  ServiceDetail,
  TeamMember,
  Vacancy,
  VacancyDetail
} from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {
  private readonly http = inject(HttpClient);

  private unwrapData<T>(res: any): T {
    if (res && res.data !== undefined) {
      return res.data;
    }
    return res as T;
  }

  // 1. Home page
  getHomeInfo(): Observable<HomeInfo> {
    return this.http.get<any>(environment.home.getHomeInfo).pipe(
      map(res => this.unwrapData<HomeInfo>(res))
    );
  }

  // 2. Blogs
  getBlogCategories(): Observable<BlogCategory[]> {
    return this.http.get<any>(environment.blogs.getAllBlogCategories).pipe(
      map(res => {
        const items = this.unwrapData<BlogCategory[]>(res);
        return Array.isArray(items) ? items : [];
      })
    );
  }

  getFeaturedBlogs(locale?: string): Observable<BlogPost[]> {
    let params = new HttpParams();
    if (locale) {
      params = params.set('locale', locale);
    }
    return this.http.get<any>(environment.blogs.getJumbotronBlogs, { params }).pipe(
      map(res => {
        const items = this.unwrapData<any>(res);
        return Array.isArray(items) ? items : [];
      })
    );
  }

  getBlogs(page = 1, perPage = 10, categoryId?: string | number, locale?: string): Observable<PaginatedResponse<BlogPost>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString())
      .set('limit', perPage.toString());

    if (categoryId && categoryId !== 'all' && categoryId !== 0) {
      params = params.set('categoryId', categoryId.toString());
    }

    if (locale) {
      params = params.set('locale', locale);
    }

    return this.http.get<any>(environment.blogs.getAllBlogs, { params }).pipe(
      map(res => {
        const data = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        const meta = res?.meta || {
          current_page: page,
          total_pages: Math.ceil(data.length / perPage) || 1,
          total: data.length,
          per_page: perPage
        };
        return { data, meta };
      })
    );
  }

  getBlogBySlug(slug: string): Observable<BlogDetail> {
    const url = environment.blogs.getSelectionBlogs.replace('{slug}', encodeURIComponent(slug));
    return this.http.get<any>(url).pipe(
      map(res => this.unwrapData<BlogDetail>(res))
    );
  }

  // 3. Contact Form
  sendContactMessage(payload: ContactMessageRequest): Observable<any> {
    return this.http.post<any>(environment.contact.sendContactMessage, payload);
  }

  // 4. Financial Reports
  getFinancialReports(page = 1, perPage = 10, year?: number | string): Observable<PaginatedResponse<FinancialReport>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString())
      .set('limit', perPage.toString());

    if (year && year !== 'Bütün illər' && year !== 'all') {
      params = params.set('year', year.toString());
    }

    return this.http.get<any>(environment.financialReports.getFinancialReports, { params }).pipe(
      map(res => {
        const data = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        const meta = res?.meta || {
          current_page: page,
          total_pages: Math.ceil(data.length / perPage) || 1,
          total: data.length,
          per_page: perPage
        };
        return { data, meta };
      })
    );
  }

  // 5. Job Applications
  sendJobApplication(
    vacancyIdOrPayload: string | FormData | Record<string, any>,
    fullNameOrCvFile?: string | File | null,
    email?: string,
    phone?: string,
    cvFile?: File | null
  ): Observable<any> {
    let formData: FormData;

    if (vacancyIdOrPayload instanceof FormData) {
      formData = vacancyIdOrPayload;
    } else if (typeof vacancyIdOrPayload === 'string') {
      formData = new FormData();
      formData.append('VacancyId', vacancyIdOrPayload);
      formData.append('FullName', typeof fullNameOrCvFile === 'string' ? fullNameOrCvFile : '');
      formData.append('Email', email || '');
      formData.append('Phone', phone || '');
      if (cvFile) {
        formData.append('CvFile', cvFile);
      }
    } else {
      const payload = vacancyIdOrPayload || {};
      formData = new FormData();
      formData.append('VacancyId', String(payload['vacancyId'] || payload['VacancyId'] || ''));
      formData.append('FullName', String(payload['fullName'] || payload['FullName'] || ''));
      formData.append('Email', String(payload['email'] || payload['Email'] || ''));
      formData.append('Phone', String(payload['phone'] || payload['Phone'] || ''));
      const file = (fullNameOrCvFile instanceof File ? fullNameOrCvFile : cvFile);
      if (file) {
        formData.append('CvFile', file);
      }
    }

    const url = environment.jobApplication.sendJobApplication;
    return this.http.post<any>(url, formData);
  }

  // 6. Partners
  getPartners(): Observable<Partner[]> {
    return this.http.get<any>(environment.partners.getAllPartners).pipe(
      map(res => {
        const items = this.unwrapData<Partner[]>(res);
        return Array.isArray(items) ? items : [];
      })
    );
  }

  // 7. Products
  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<any>(environment.productCategories.getProductCategories).pipe(
      map(res => {
        const items = this.unwrapData<ProductCategory[]>(res);
        return Array.isArray(items) ? items : [];
      })
    );
  }

  getProducts(page = 1, perPage = 10, categoryId?: string | number): Observable<PaginatedResponse<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString())
      .set('limit', perPage.toString());

    if (categoryId && categoryId !== 'all' && categoryId !== 0) {
      params = params.set('categoryId', categoryId.toString());
    }

    return this.http.get<any>(environment.products.getProducts, { params }).pipe(
      map(res => {
        const data = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        const meta = res?.meta || {
          current_page: page,
          total_pages: Math.ceil(data.length / perPage) || 1,
          total: data.length,
          per_page: perPage
        };
        return { data, meta };
      })
    );
  }

  getProductBySlug(slug: string): Observable<ProductDetail> {
    const url = environment.products.getProductDetails.replace('{slug}', encodeURIComponent(slug));
    return this.http.get<any>(url).pipe(
      map(res => this.unwrapData<ProductDetail>(res))
    );
  }

  // 8. Services
  getServices(page = 1, perPage = 10, locale?: string): Observable<PaginatedResponse<Service>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString())
      .set('limit', perPage.toString());

    if (locale) {
      params = params.set('locale', locale);
    }

    return this.http.get<any>(environment.services.getAllServices, { params }).pipe(
      map(res => {
        const data = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        const meta = res?.meta || {
          current_page: page,
          total_pages: Math.ceil(data.length / perPage) || 1,
          total: data.length,
          per_page: perPage
        };
        return { data, meta };
      })
    );
  }

  getServiceBySlug(slug: string): Observable<ServiceDetail> {
    const url = environment.services.getServiceDetails.replace('{slug}', encodeURIComponent(slug));
    return this.http.get<any>(url).pipe(
      map(res => this.unwrapData<ServiceDetail>(res))
    );
  }

  // 9. Team
  getTeam(): Observable<TeamMember[]> {
    return this.http.get<any>(environment.team.getAllTeam).pipe(
      map(res => {
        const items = this.unwrapData<TeamMember[]>(res);
        return Array.isArray(items)
          ? [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          : [];
      })
    );
  }

  // 10. Vacancies
  getVacancies(page = 1, pageSize = 10, employmentType?: string | number, locale?: string): Observable<PaginatedResponse<any>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (locale) {
      params = params.set('locale', locale);
    }

    if (employmentType !== undefined && employmentType !== null && employmentType !== '') {
      params = params.set('employmentType', employmentType.toString());
    }

    return this.http.get<any>(environment.vacancies.getAllVacancies, { params }).pipe(
      map(res => {
        const rawData = res?.data || res;
        const data = Array.isArray(rawData) ? rawData : [];
        const meta = res?.meta || {
          current_page: page,
          per_page: pageSize,
          total: data.length,
          total_pages: Math.ceil(data.length / pageSize) || 1,
          has_next: page < (Math.ceil(data.length / pageSize) || 1),
          has_prev: page > 1
        };
        return { data, meta };
      })
    );
  }

  getVacancyBySlug(slug: string, locale?: string): Observable<any> {
    const url = environment.vacancies.getVacancyDetails.replace('{slug}', encodeURIComponent(slug));
    let params = new HttpParams();
    if (locale) {
      params = params.set('locale', locale);
    }
    return this.http.get<any>(url, { params }).pipe(
      map(res => this.unwrapData<any>(res))
    );
  }

  // 11. Page Contents
  getPageContents(pageKey: string, locale?: string): Observable<any> {
    const url = environment.pageContents.getAllPageContents.replace('{pageKey}', encodeURIComponent(pageKey));
    let params = new HttpParams();
    if (locale) {
      params = params.set('locale', locale);
    }
    return this.http.get<any>(url, { params }).pipe(
      map(res => this.unwrapData<any>(res))
    );
  }
}
