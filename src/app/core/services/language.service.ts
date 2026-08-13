import { Injectable, computed, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export type DisplayLang = 'AZ' | 'EN' | 'RU';
export type ApiLocale = 'az' | 'en' | 'ru';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentLanguage = signal<DisplayLang>(this.loadInitialLanguage());

  readonly currentLocale = computed<ApiLocale>(() => {
    return this.currentLanguage().toLowerCase() as ApiLocale;
  });

  readonly locale$: Observable<ApiLocale> = toObservable(this.currentLocale);

  constructor() {}

  private loadInitialLanguage(): DisplayLang {
    if (!isPlatformBrowser(this.platformId)) {
      return 'AZ';
    }
    try {
      const saved = localStorage.getItem('qafqaz_language') as DisplayLang | null;
      if (saved && (saved === 'AZ' || saved === 'EN' || saved === 'RU')) {
        return saved;
      }
    } catch {
      // localStorage may be inaccessible
    }
    return 'AZ';
  }

  setLanguage(lang: DisplayLang): void {
    if (this.currentLanguage() === lang) {
      return;
    }
    this.currentLanguage.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('qafqaz_language', lang);
      } catch {
        // localStorage may be inaccessible
      }
    }
  }
}
