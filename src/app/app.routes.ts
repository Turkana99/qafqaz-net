import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/pages/home-page/home-page.component').then(c => c.HomePageComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('./features/services/pages/services-page/services-page.component').then(c => c.ServicesPageComponent)
      },
      {
        path: 'services/:slug',
        loadComponent: () => import('./features/services/pages/service-detail-page/service-detail-page.component').then(c => c.ServiceDetailPageComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/pages/products-page/products-page.component').then(c => c.ProductsPageComponent)
      },
      {
        path: 'company',
        loadComponent: () => import('./features/company/pages/company-page/company-page.component').then(c => c.CompanyPageComponent)
      },
      {
        path: 'blogs',
        loadComponent: () => import('./features/blogs/pages/blogs-page/blogs-page.component').then(c => c.BlogsPageComponent)
      },
      {
        path: 'blogs/:slug',
        loadComponent: () => import('./features/blogs/pages/blog-detail-page/blog-detail-page.component').then(c => c.BlogDetailPageComponent)
      },
      {
        path: 'careers',
        loadComponent: () => import('./features/careers/pages/careers-page/careers-page.component').then(c => c.CareersPageComponent)
      },
      {
        path: 'careers/:slug',
        loadComponent: () => import('./features/careers/pages/career-detail-page/career-detail-page.component').then(c => c.CareerDetailPageComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/pages/contact-page/contact-page.component').then(c => c.ContactPageComponent)
      },
      {
        path: '**',
        loadComponent: () => import('./features/not-found/pages/not-found-page/not-found-page.component').then(c => c.NotFoundPageComponent)
      }
    ]
  }
];
