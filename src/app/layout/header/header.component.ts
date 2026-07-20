import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS } from '../../core/constants/navigation';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { RevealDirective } from '../../shared/ui/reveal/reveal.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
    IconComponent,
    RevealDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="fixed top-0 w-full z-50 transition-all duration-300" appReveal revealDirection="down" [revealDelay]="0">
      <div class="container-main py-4">
        <div class="bg-white rounded-2xl px-2 py-4 flex items-center justify-between w-full shadow-sm">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center shrink-0 ml-2" aria-label="QafqazNet Home">
            <img src="assets/logos/qafqaznet-logo.png" alt="QafqazNet" class="h-8 md:h-10 w-auto object-contain">
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center gap-6 xl:gap-8">
            @for (item of navItems; track item.route) {
              <a [routerLink]="item.route" 
                 routerLinkActive="text-gradient-primary font-semibold"
                 [routerLinkActiveOptions]="{exact: item.route === '/'}"
                 class="font-bdo font-normal text-[16px] leading-[24px] tracking-tight align-middle text-primary-dark hover:text-gradient-primary transition-colors">
                {{ item.label }}
              </a>
            }
          </nav>

          <!-- Actions -->
          <div class="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0 mr-2">
            <div class="h-6 w-px bg-gray-300" aria-hidden="true"></div>
            
            <!-- Language Dropdown -->
            <div class="relative">
              <button 
                class="flex items-center gap-1 text-base font-medium text-primary-dark hover:text-gradient-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue rounded px-1" 
                aria-label="Select Language"
                aria-haspopup="menu"
                [attr.aria-expanded]="isLangDropdownOpen()"
                (click)="toggleLangDropdown($event)">
                 <span>{{ selectedLang() }}</span>
                 <app-icon name="chevron-down" [size]="16" class="text-primary-dark"></app-icon>
              </button>
              
              @if (isLangDropdownOpen()) {
                <div class="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-24 z-50 flex flex-col items-center">
                  @for (lang of languages; track lang) {
                    <button 
                      class="w-full text-center px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                      [class.text-gradient-primary]="lang === selectedLang()"
                      [class.text-primary-dark]="lang !== selectedLang()"
                      (click)="selectLanguage(lang)">
                      {{ lang }}
                    </button>
                  }
                </div>
              }
            </div>

            <app-button variant="gradient" size="nav" routerLink="/contact" trailingIcon="assets/icons/chat.svg">Konsultasiya</app-button>
          </div>

          <!-- Mobile Menu Button -->
          <button class="lg:hidden p-2 mr-2 text-[#0A1642] hover:text-[#0A1642] focus:text-[#0A1642] active:text-[#0A1642] focus:outline-none focus:ring-2 focus:ring-primary-blue rounded flex items-center justify-center" 
                  (click)="toggleMenu()"
                  [attr.aria-expanded]="isMenuOpen()"
                  aria-label="Toggle Menu">
            <app-icon [name]="isMenuOpen() ? 'close' : 'menu'" [size]="28" class="text-[#0A1642]"></app-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Overlay (Route-Aware Color & Contrast) -->
      @if (isMenuOpen()) {
        <div
          [class]="mobileOverlayClass()"
          [style]="mobileOverlayStyle()"
        >
           <!-- Close Button -->
           <button
             [class]="mobileCloseButtonClass()"
             (click)="closeMenu()"
             aria-label="Close Menu"
           >
             <app-icon name="close" [size]="32" [class]="mobileIconClass()"></app-icon>
           </button>

           <!-- Navigation List -->
           <nav class="flex flex-col gap-6 text-center mt-8" aria-label="Mobile Navigation">
             @for (item of navItems; track item.route) {
               <a [routerLink]="item.route"
                  (click)="closeMenu()"
                  [class]="mobileNavLinkClass()"
                  routerLinkActive="text-gradient-primary font-semibold"
                  [routerLinkActiveOptions]="{exact: item.route === '/'}">
                 {{ item.label }}
               </a>
             }

             <!-- Language Selector & Action Button -->
             <div class="mt-8 flex flex-col gap-6 items-center">
               <div class="flex gap-4">
                 @for (lang of languages; track lang) {
                   <button 
                     class="text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#4343FF] rounded px-2 py-1"
                     [class.text-gradient-primary]="lang === selectedLang()"
                     [class.text-white]="lang !== selectedLang() && isHomePage()"
                     [class.text-[#0A1642]]="lang !== selectedLang() && !isHomePage()"
                     (click)="selectLanguage(lang); closeMenu()">
                     {{ lang }}
                   </button>
                 }
               </div>

               <app-button variant="gradient" size="nav" routerLink="/contact" trailingIcon="assets/icons/chat.svg" [fullWidth]="true" (click)="closeMenu()">
                 Konsultasiya
               </app-button>
             </div>
           </nav>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  navItems = NAV_ITEMS;
  isMenuOpen = signal(false);

  languages = ['AZ', 'EN', 'RU'] as const;
  selectedLang = signal<typeof this.languages[number]>('AZ');
  isLangDropdownOpen = signal(false);

  readonly currentUrl = signal<string>(this.router.url);

  constructor() {
    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects || event.url);
      }
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  readonly isHomePage = computed(() => {
    const url = this.currentUrl().split('?')[0];
    return url === '/' || url === '';
  });

  mobileOverlayClass = computed(() => {
    return this.isHomePage()
      ? 'fixed inset-0 z-40 lg:hidden flex flex-col pt-24 px-6 h-screen overflow-y-auto text-white transition-all duration-300'
      : 'fixed inset-0 z-40 lg:hidden flex flex-col pt-24 px-6 h-screen overflow-y-auto text-[#0A1642] transition-all duration-300';
  });

  mobileOverlayStyle = computed(() => {
    return this.isHomePage()
      ? 'background: rgba(10, 22, 66, 0.95);'
      : 'background: rgba(255, 255, 255, 0.94); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);';
  });

  mobileCloseButtonClass = computed(() => {
    return this.isHomePage()
      ? 'absolute top-7 right-8 p-2 text-white focus:outline-none rounded'
      : 'absolute top-7 right-8 p-2 text-[#0A1642] focus:outline-none rounded';
  });

  mobileIconClass = computed(() => {
    return this.isHomePage() ? 'text-white' : 'text-[#0A1642]';
  });

  mobileNavLinkClass = computed(() => {
    return this.isHomePage()
      ? 'font-bdo font-normal text-xl leading-8 align-middle text-white hover:text-gradient-primary transition-colors'
      : 'font-bdo font-normal text-xl leading-8 align-middle text-[#0A1642] hover:text-gradient-primary transition-colors';
  });

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
    if (this.isLangDropdownOpen()) {
      this.isLangDropdownOpen.set(false);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isLangDropdownOpen() && !target.closest('.relative')) {
      this.isLangDropdownOpen.set(false);
    }
  }

  toggleLangDropdown(event: Event) {
    event.stopPropagation();
    this.isLangDropdownOpen.update((v) => !v);
  }

  selectLanguage(lang: typeof this.languages[number]) {
    this.selectedLang.set(lang);
    this.isLangDropdownOpen.set(false);
  }

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    document.body.style.overflow = '';
  }
}
