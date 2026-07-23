import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    HostListener,
    computed,
    inject,
    signal
} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NAV_ITEMS, NavItem} from '../../core/constants/navigation';
import {ButtonComponent} from '../../shared/ui/button/button.component';
import {IconComponent} from '../../shared/ui/icon/icon.component';
import {RevealDirective} from '../../shared/ui/reveal/reveal.directive';

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
            @for (item of navItems; track item.label) {
              @if (item.children) {
                <div class="relative">
                  <button 
                    class="flex items-center gap-1 font-bdo font-normal text-[16px] leading-[24px] tracking-tight align-middle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded"
                    [class.text-gradient-primary]="isChildRouteActive(item)"
                    [class.font-semibold]="isChildRouteActive(item)"
                    [class.text-primary-dark]="!isChildRouteActive(item)"
                    (click)="toggleDropdown($event, item.label)"
                    [attr.aria-expanded]="openDropdownId() === item.label"
                  >
                    <span>{{ item.label }}</span>
                    <img 
                      src="/assets/icons/dropdownIcon.svg" 
                      alt="" 
                      class="w-2 h-2 transition-transform duration-300"
                      [class.rotate-180]="openDropdownId() === item.label"
                    />
                  </button>
                  
                  @if (openDropdownId() === item.label) {
                    <div class="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-max min-w-[200px] z-50 flex flex-col">
                      @for (child of item.children; track child.route) {
                        <a 
                          [routerLink]="child.route"
                          routerLinkActive="text-gradient-primary font-semibold bg-gray-50"
                          (click)="closeDropdown()"
                          class="px-4 py-2 text-[15px] font-bdo text-primary-dark hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors">
                          {{ child.label }}
                        </a>
                      }
                    </div>
                  }
                </div>
              } @else {
                <a [routerLink]="item.route" 
                   routerLinkActive="text-gradient-primary font-semibold"
                   [routerLinkActiveOptions]="{exact: item.route === '/'}"
                   class="font-bdo font-normal text-[16px] leading-[24px] tracking-tight align-middle text-primary-dark hover:text-gradient-primary transition-colors">
                  {{ item.label }}
                </a>
              }
            }
          </nav>

          <!-- Actions -->
          <div class="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0 mr-2">
            <div class="h-6 w-px bg-gray-300" aria-hidden="true"></div>
            
            <!-- Language Dropdown -->
            <div class="relative">
              <button 
                class="flex items-center gap-1 text-base font-medium text-primary-dark hover:text-gradient-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded px-1" 
                aria-label="Select Language"
                aria-haspopup="menu"
                [attr.aria-expanded]="openDropdownId() === 'lang'"
                (click)="toggleDropdown($event, 'lang')">
                 <span>{{ selectedLang() }}</span>
                 <img 
                   src="/assets/icons/dropdownIcon.svg" 
                   alt="" 
                   class="w-2 h-2 transition-transform duration-300"
                   [class.rotate-180]="openDropdownId() === 'lang'"
                 />
              </button>
              
              @if (openDropdownId() === 'lang') {
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
             @for (item of navItems; track item.label) {
               @if (item.children) {
                 <div class="flex flex-col items-center gap-4">
                   <div [class]="mobileNavLinkClass() + (isChildRouteActive(item) ? ' text-gradient-primary font-semibold' : '')">
                     {{ item.label }}
                   </div>
                   <div class="flex flex-col gap-4">
                     @for (child of item.children; track child.route) {
                       <a [routerLink]="child.route"
                          (click)="closeMenu()"
                          [class]="mobileNavLinkClass()"
                          style="font-size: 1.125rem; opacity: 0.9;"
                          routerLinkActive="text-gradient-primary font-semibold">
                         {{ child.label }}
                       </a>
                     }
                   </div>
                 </div>
               } @else {
                 <a [routerLink]="item.route"
                    (click)="closeMenu()"
                    [class]="mobileNavLinkClass()"
                    routerLinkActive="text-gradient-primary font-semibold"
                    [routerLinkActiveOptions]="{exact: item.route === '/'}">
                   {{ item.label }}
                 </a>
               }
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
    selectedLang = signal < typeof this.languages[number] > ('AZ');

    openDropdownId = signal < string | null > (null);

    readonly currentUrl = signal < string > (this.router.url);

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

    isChildRouteActive(item : NavItem): boolean {
        if (!item.children) 
            return false;
        

        const current = this.currentUrl().split('?')[0];
        return item.children.some((child) => current.startsWith(child.route));
    }

    mobileOverlayClass = computed(() => {
        return this.isHomePage() ? 'fixed inset-0 z-40 lg:hidden flex flex-col pt-24 px-6 h-screen overflow-y-auto text-white transition-all duration-300' : 'fixed inset-0 z-40 lg:hidden flex flex-col pt-24 px-6 h-screen overflow-y-auto text-[#0A1642] transition-all duration-300';
    });

    mobileOverlayStyle = computed(() => {
        return this.isHomePage() ? 'background: rgba(10, 22, 66, 0.95);' : 'background: rgba(255, 255, 255, 0.94); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);';
    });

    mobileCloseButtonClass = computed(() => {
        return this.isHomePage() ? 'absolute top-7 right-8 p-2 text-white focus:outline-none rounded' : 'absolute top-7 right-8 p-2 text-[#0A1642] focus:outline-none rounded';
    });

    mobileIconClass = computed(() => {
        return this.isHomePage() ? 'text-white' : 'text-[#0A1642]';
    });

    mobileNavLinkClass = computed(() => {
        return this.isHomePage() ? 'font-bdo font-normal text-xl leading-8 align-middle text-white hover:text-gradient-primary transition-colors' : 'font-bdo font-normal text-xl leading-8 align-middle text-[#0A1642] hover:text-gradient-primary transition-colors';
    });

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.isMenuOpen()) {
            this.closeMenu();
        }
        if (this.openDropdownId()) {
            this.closeDropdown();
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event : MouseEvent) {
        const target = event.target as HTMLElement;
        if (this.openDropdownId() && ! target.closest('.relative')) {
            this.closeDropdown();
        }
    }

    toggleDropdown(event : Event, id : string) {
        event.stopPropagation();
        if (this.openDropdownId() === id) {
            this.openDropdownId.set(null);
        } else {
            this.openDropdownId.set(id);
        }
    }

    closeDropdown() {
        this.openDropdownId.set(null);
    }

    selectLanguage(lang : typeof this.languages[number]) {
        this.selectedLang.set(lang);
        this.closeDropdown();
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
