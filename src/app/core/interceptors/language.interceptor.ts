import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

/**
 * Functional interceptor to attach locale query parameter to outgoing public API requests.
 */
export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const languageService = inject(LanguageService);
  const locale = languageService.currentLocale();

  if (req.url.includes('/public')) {
    const clonedReq = req.clone({
      setParams: {
        locale: locale
      }
    });

    return next(clonedReq);
  }

  return next(req);
};
