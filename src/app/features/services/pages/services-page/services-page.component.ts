import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
    DestroyRef
} from '@angular/core';
import {CallToActionSectionComponent} from '../../../home/components/call-to-action-section/call-to-action-section.component';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {ServiceCardComponent} from '../../../../shared/ui/service-card/service-card.component';
import {ServiceAudienceSectionComponent} from '../../components/service-audience-section/service-audience-section.component';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of, forkJoin} from 'rxjs';

@Component({
    selector: 'app-services-page',
    standalone: true,
    imports: [
        CallToActionSectionComponent, RevealDirective, ServiceCardComponent, ServiceAudienceSectionComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- 1. Services Page Jumbotron Section (600px Desktop Target Height) -->
    <section
      class="bg-[#F7F9FC] pt-28 md:pt-36 lg:pt-24 pb-16 lg:pb-0 lg:h-[600px] flex flex-col items-center justify-center"
    >
      <div class="container-main flex flex-col items-center text-center w-full">
        <div class="max-w-[950px] w-full flex flex-col items-center text-center">
          <!-- Page Title -->
          <h1
            appReveal
            revealDirection="up"
            [revealDelay]="0"
            class="font-bdo font-bold text-[36px] leading-[44px] md:text-[48px] md:leading-[58px] lg:text-[60px] lg:leading-[76px] text-[#0A1642] tracking-normal text-center m-0"
          >
            {{ heroTitle() }}
          </h1>

          <!-- Page Description -->
          <p
            appReveal
            revealDirection="up"
            [revealDelay]="150"
            class="font-bdo font-normal text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#80899D] tracking-normal text-center max-w-[780px] mt-6 md:mt-8 m-0"
          >
            {{ heroDescription() }}
          </p>

          @if (heroImageUrl()) {
            <div
              appReveal
              revealDirection="up"
              [revealDelay]="200"
              class="w-full mt-8 flex justify-center"
            >
              <img
                [src]="heroImageUrl()"
                [alt]="heroTitle()"
                class="max-w-full h-auto rounded-[20px] object-cover"
              />
            </div>
          }
        </div>
      </div>
    </section>

    <!-- 2. Services Grid Section (Reusing Shared ServiceCardComponent) -->
    <section class="py-12 sm:py-20 lg:py-32 bg-white">
      <div class="container-main">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          @for (service of services(); track service.slug || service.id; let i = $index) {
            <app-service-card [service]="service" [revealDelay]="i * 80"></app-service-card>
          }
        </div>

        <!-- Pagination UI -->
  
          <div
            appReveal revealDirection="up"
            class="flex items-center justify-between mt-12 w-full max-w-[1200px] mx-auto"
          >
            <!-- Prev Page Button -->
            <div class="w-11 h-11">
              @if (hasPrev()) {
                <button
                  type="button"
                  (click)="prevPage()"
                  aria-label="Previous page"
                  class="w-11 h-11 rounded-[14px] bg-[#F7F9FC] hover:bg-[#EBF0F7] text-[#0000FE] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                >
                  <svg class="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              }
            </div>

            <!-- Page Indicator -->
            <span class="font-bdo font-normal text-[14px] md:text-[16px] text-[#80899D]">
              {{ currentPage() }}/{{ totalPages() }}
            </span>

            <!-- Next Page Button -->
            <div class="w-11 h-11">
              @if (hasNext()) {
                <button
                  type="button"
                  (click)="nextPage()"
                  aria-label="Next page"
                  class="w-11 h-11 rounded-[14px] bg-[#F7F9FC] hover:bg-[#EBF0F7] text-[#0000FE] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              }
            </div>
          </div>

      </div>
    </section>

    <!-- 3. "Kimlər faydalana bilər?" Section -->
    <app-service-audience-section
      [title]="whoCanBenefitTitle()"
      [items]="whoCanBenefitItems()"
    ></app-service-audience-section>

    <!-- 4. Shared Call To Action Section (Dark Variant) -->
    <app-call-to-action-section variant="dark"></app-call-to-action-section>
  `
})
export class ServicesPageComponent {
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly destroyRef = inject(DestroyRef);

    readonly services = signal < any[] > ([]);
    readonly heroTitle = signal < string > ('');
    readonly heroDescription = signal < string > ('');
    readonly heroImageUrl = signal < string | null > (null);

    readonly whoCanBenefitTitle = signal < string > ('');
    readonly whoCanBenefitItems = signal < string[] > ([]);

    readonly currentPage = signal(1);
    readonly itemsPerPage = 10;
    readonly totalPages = signal(1);
    readonly hasPrev = signal(false);
    readonly hasNext = signal(false);

    constructor() {
        this.languageService.locale$.pipe(switchMap((locale) => this.loadData(locale)), takeUntilDestroyed(this.destroyRef)).subscribe(({servicesRes, pageContent} : any) => {
            this.handleServicesResponse(servicesRes);
            this.handlePageContentResponse(pageContent);
        });
    }

    loadData(locale?: string) {
        return forkJoin({
            servicesRes: this.apiService.getServices(this.currentPage(), this.itemsPerPage, locale).pipe(catchError(() => of(null))),
            pageContent: this.apiService.getPageContents('services', locale).pipe(catchError(() => of(null)))
        });
    }

    loadPage(page : number) {
        this.currentPage.set(page);
        const locale = this.languageService.currentLocale();
        this.apiService.getServices(this.currentPage(), this.itemsPerPage, locale).pipe(catchError(() => of(null))).subscribe((res : any) => {
            this.handleServicesResponse(res);
        });
    }

    handleServicesResponse(res : any) {
        if (res) {
            const list = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
            this.services.set(list);
            if (res.meta) {
                const meta = res.meta;
                this.currentPage.set(meta.current_page ?? 1);
                this.totalPages.set(meta.total_pages ?? 1);
                this.hasPrev.set(meta.has_prev ?? (meta.current_page > 1));
                this.hasNext.set(meta.has_next ?? (meta.current_page < meta.total_pages));
            }
        }
    }

    handlePageContentResponse(pageContent : any) {
        if (pageContent?.sections) {
            const sections = pageContent.sections;
            if (sections.hero) {
                if (sections.hero.title) {
                    this.heroTitle.set(sections.hero.title);
                }
                if (sections.hero.body) {
                    this.heroDescription.set(sections.hero.body);
                }
                this.heroImageUrl.set(sections.hero.imageUrl || null);
            }
            if (sections.who_can_benefit) {
                if (sections.who_can_benefit.title) {
                    this.whoCanBenefitTitle.set(sections.who_can_benefit.title);
                }
                if (Array.isArray(sections.who_can_benefit.items) && sections.who_can_benefit.items.length > 0) {
                    const sortedItems = [...sections.who_can_benefit.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                    const mappedTitles: string[] = sortedItems.map((item: any) => item.title || '').filter((t: string) => t.length > 0);
                    this.whoCanBenefitItems.set(mappedTitles);
                }
            }
        }
    }

    nextPage(): void {
        if (this.hasNext()) {
            this.loadPage(this.currentPage() + 1);
        }
    }

    prevPage(): void {
        if (this.hasPrev()) {
            this.loadPage(this.currentPage() - 1);
        }
    }
}
