import { ChangeDetectionStrategy, Component, computed, inject, signal, DestroyRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/ui/reveal/reveal.directive';
import { TranslationService } from '../../core/services/translation.service';
import { PublicApiService } from '../../core/services/public-api.service';
import { LanguageService } from '../../core/services/language.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';

interface FooterLink {
  readonly label: string;
  readonly route: string;
}

interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: string;
  readonly hoverIcon?: string;
}

const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: '/assets/icons/linkedinIcon.svg',
    hoverIcon: '/assets/icons/linkedinHover.svg',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: '/assets/icons/instagramIcon.svg',
    hoverIcon: '/assets/icons/instagramHover.svg',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: '/assets/icons/facebookIcon.svg',
    hoverIcon: '/assets/icons/facebookHover.svg',
  },
];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-white pt-12 sm:pt-16 pb-8 sm:pb-12">
      <div class="container-main">
        <!-- Upper Row: Four columns -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 sm:mb-20">
          <!-- First Column: Logo -->
          <div appReveal revealDirection="up" [revealDelay]="0" class="flex flex-col items-start">
            <a
              routerLink="/"
              aria-label="QafqazNet Home"
              class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded"
            >
              <img
                src="/assets/logos/qafqaznet-logo.png"
                alt="QafqazNet Logo"
                class="w-[150px] sm:w-[179px] h-[32px] sm:h-[38px] object-contain object-left"
              />
            </a>
          </div>

          <!-- Second Column: First Navigation Group -->
          <nav
            appReveal
            revealDirection="up"
            [revealDelay]="100"
            class="flex flex-col"
            aria-label="Footer First Navigation"
          >
            <ul class="flex flex-col gap-4 m-0 p-0 list-none">
              @for (item of firstNavGroup(); track item.route) {
                <li>
                  <a
                    [routerLink]="item.route"
                    class="font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642] text-gradient-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded inline-block"
                  >
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>

          <!-- Third Column: Second Navigation Group -->
          <nav
            appReveal
            revealDirection="up"
            [revealDelay]="200"
            class="flex flex-col"
            aria-label="Footer Second Navigation"
          >
            <ul class="flex flex-col gap-4 m-0 p-0 list-none">
              @for (item of secondNavGroup(); track item.route) {
                <li>
                  <a
                    [routerLink]="item.route"
                    class="font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642] text-gradient-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded inline-block"
                  >
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>

          <!-- Fourth Column: Contact -->
          <div
            appReveal
            revealDirection="up"
            [revealDelay]="300"
            class="flex flex-col gap-4 font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642]"
          >
            <div>
              {{ t().phone }}
              @if (phoneItems().length > 0) {
                @for (phone of phoneItems(); track phone.title; let isLast = $last) {
                  <a
                    [href]="'tel:' + phone.title"
                    class="text-[#0A1642] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded"
                    >{{ phone.title }}</a
                  >{{ isLast ? '' : ', ' }}
                }
              } @else {
                <a
                  href="tel:+994102346464"
                  class="text-[#0A1642] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded"
                  >+994102346464</a
                >,
                <a
                  href="tel:+994123100707"
                  class="text-[#0A1642] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded"
                  >+994123100707</a
                >
              }
            </div>
            <div>
              {{ t().email }}
              @if (emailItems().length > 0) {
                @for (email of emailItems(); track email.title; let isLast = $last) {
                  <a
                    [href]="'mailto:' + email.title"
                    class="text-[#0A1642] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded"
                    >{{ email.title }}</a
                  >{{ isLast ? '' : ', ' }}
                }
              } @else {
                <a
                  href="mailto:office@qafqaz.net"
                  class="text-[#0A1642] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded"
                  >office&#64;qafqaz.net</a
                >
              }
            </div>
            @if (locationItems().length > 0) {
              @for (loc of locationItems(); track loc.title) {
                <div class="break-words ">{{ t().address }} {{ loc.title }}</div>
              }
            } @else {
              <div class="break-words ">{{ t().address }} “ÇİNAR PARK BİZNES MƏRKƏZİ” 4-cü mərtəbə</div>
            }
          </div>
        </div>

        <!-- Lower Row -->
        <div
          appReveal
          revealDirection="up"
          [revealDelay]="400"
          class="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pt-8 border-t border-border text-center md:text-left"
        >
          <!-- Copyright -->
          <p
            class="font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642] m-0 text-center md:text-left"
          >
            © 2026 {{ t().copyright }}
          </p>

          <!-- Social Media Icons -->
          <div class="flex items-center justify-center gap-4">
            @for (social of socialLinks; track social.name) {
              <a
                [href]="social.url"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="social.name"
                class="relative group block w-[24px] h-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] rounded"
              >
                @if (social.hoverIcon) {
                  <img
                    [src]="social.icon"
                    [alt]="social.name + ' icon'"
                    class="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-focus-visible:opacity-0"
                  />
                  <img
                    [src]="social.hoverIcon"
                    [alt]="social.name + ' hover icon'"
                    class="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                } @else {
                  <img
                    [src]="social.icon"
                    [alt]="social.name + ' icon'"
                    class="absolute inset-0 w-full h-full object-contain"
                  />
                }
              </a>
            }
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  private readonly translationService = inject(TranslationService);
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly t = this.translationService.translations;

  readonly talkBoxItems = signal<any[]>([]);

  readonly phoneItems = computed(() => {
    const items = this.talkBoxItems();
    return items.filter(i => i.icon === 'phone' || i.description?.toLowerCase().includes('telefon'));
  });

  readonly emailItems = computed(() => {
    const items = this.talkBoxItems();
    return items.filter(i => i.icon === 'email' || i.title?.includes('@'));
  });

  readonly locationItems = computed(() => {
    const items = this.talkBoxItems();
    return items.filter(i => i.icon === 'location' || i.description?.toLowerCase().includes('ünvan'));
  });

  constructor() {
    this.languageService.locale$.pipe(
      switchMap(locale => this.apiService.getPageContents('contact', locale).pipe(catchError(() => of(null)))),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(res => {
      if (res?.sections?.talk_box?.items && Array.isArray(res.sections.talk_box.items)) {
        const sorted = [...res.sections.talk_box.items].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
        this.talkBoxItems.set(sorted);
      }
    });
  }

  readonly firstNavGroup = computed<ReadonlyArray<FooterLink>>(() => {
    const navT = this.t().nav;
    return [
      { label: navT.services, route: '/services' },
      { label: navT.products, route: '/products' },
      { label: navT.about, route: '/company' },
      { label: this.t().financialReports, route: '/financial-reports' },
    ];
  });

  readonly secondNavGroup = computed<ReadonlyArray<FooterLink>>(() => {
    const navT = this.t().nav;
    return [
      { label: navT.blog, route: '/blogs' },
      { label: navT.careers, route: '/careers' },
      { label: navT.contact, route: '/contact' },
    ];
  });

  socialLinks = SOCIAL_LINKS;
}
