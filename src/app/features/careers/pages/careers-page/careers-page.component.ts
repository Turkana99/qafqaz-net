import {ChangeDetectionStrategy, Component, computed, inject, signal, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {TranslationService} from '../../../../core/services/translation.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of, forkJoin} from 'rxjs';

interface Vacancy {
    readonly slug: string;
    readonly title: string;
    readonly type: string;
    readonly rawEmpType?: any;
    readonly location: string;
    readonly deadline: string;
    readonly rawDeadline?: string;
    readonly isExpired?: boolean;
}

type TabKey = 'all' | 'fullTime' | 'partTime';

@Component({
    selector: 'app-careers-page',
    standalone: true,
    imports: [
        CommonModule, RouterLink, RevealDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- Careers Hero Section -->
    <div class="bg-[#F7F9FC] pt-[180px] pb-16 md:pb-24 lg:pb-32 flex flex-col items-center justify-center">
      <div class="container-main w-full flex flex-col items-center">
        <h1 
          appReveal revealDirection="up" [revealDelay]="0"
          class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[40px] tracking-normal text-center text-[#0A1642] m-0 mb-6 md:mb-10"
        >
          {{ heroTitle() || t().nav.careers }}
        </h1>
        <p 
          appReveal revealDirection="up" [revealDelay]="100"
          class="font-bdo font-normal text-[16px] md:text-[22px] lg:text-[20px] leading-[26px] md:leading-[32px] lg:leading-[38px] tracking-normal text-center text-[#0A1642] max-w-[900px] m-0"
        >
          {{ heroBody() || 'Bizim komandaya qoşulmaq və sürətlə inkişaf edən İT sektorunda karyeranızı qurmaq fürsəti qazanın. Uğurun bir hissəsi olmaq üçün hazırkı vakansiyalarımızla tanış olun.' }}
        </p>
      </div>
    </div>

    <!-- Vacancies Section -->
    <section class="w-full bg-[#FFFFFF] py-16 md:py-24 lg:py-32">
      <div class="container-main flex flex-col">
        
        <!-- Top Row: Title & Tabs -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 md:mb-16">
          <h2 
            appReveal revealDirection="left" [revealDelay]="0"
            class="font-bdo font-bold text-[32px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[70px] tracking-normal text-[#0A1642] m-0 text-center lg:text-left"
          >
            {{ openVacanciesTitle() || t().openVacancies }}
          </h2>
          
          <div 
            appReveal revealDirection="right" [revealDelay]="100"
            class="bg-[#F7F9FC] rounded-[12px] p-[6px] flex items-center justify-center lg:justify-start overflow-x-auto mx-auto lg:mx-0 max-w-full"
          >
            @for (tabKey of tabKeys; track tabKey) {
              <button 
                (click)="selectTab(tabKey)"
                [class.bg-[#FFFFFF]]="selectedTab() === tabKey"
                [class.text-[#0A1642]]="selectedTab() === tabKey"
                [class.shadow-sm]="selectedTab() === tabKey"
                [class.rounded-[8px]]="selectedTab() === tabKey"
                [class.text-[#A0A9BD]]="selectedTab() !== tabKey"
                class="font-bdo font-normal text-[14px] md:text-[16px] leading-[28px] px-6 py-2 transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FE]"
              >
                {{ t().careers.filterTabs[tabKey] }}
              </button>
            }
          </div>
        </div>

        <!-- Desktop Headings -->
        <div class="hidden lg:grid grid-cols-4 gap-4 px-6 md:px-8 mb-6">
          <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ t().careers.table.position }}</span>
          <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ t().careers.table.type }}</span>
          <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ t().careers.table.location }}</span>
          <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ t().careers.table.deadline }}</span>
        </div>

        <!-- Vacancy Cards -->
        <div class="flex flex-col gap-4 md:gap-6">
          @for (vacancy of currentVacancies(); track vacancy.slug; let i = $index) {
            <a 
              [routerLink]="['/careers', vacancy.slug]"
              appReveal revealDirection="up" [revealDelay]="i * 100"
              class="group w-full max-w-[1200px] mx-auto min-h-[132px] rounded-[20px] bg-[#F7F9FC] p-6 md:p-8 flex flex-col lg:grid lg:grid-cols-4 lg:items-center gap-4 lg:gap-4 transition-colors duration-300 hover:bg-[#EBF0F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FE]"
            >
              <!-- 1. Vəzifə -->
              <h3 class="font-bdo font-bold text-[16px] md:text-[20px] leading-[24px] tracking-normal text-[#0A1642] m-0 group-hover:text-[#0000FE] transition-colors duration-300">
                {{ vacancy.title }}
              </h3>
              
              <!-- 2. Vakansiya növü -->
              <div class="flex items-center gap-2">
                <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">{{ t().careers.table.type }}:</span>
                <div class="flex items-center gap-2">
                  <img src="assets/icons/clockIcon.svg" alt="Type" class="w-5 h-5 object-contain">
                  <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ formatEmploymentType(vacancy.rawEmpType != null ? vacancy.rawEmpType : vacancy.type) }}</span>
                </div>
              </div>

              <!-- 3. Yer -->
              <div class="flex items-center gap-2">
                <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">{{ t().careers.table.location }}:</span>
                <div class="flex items-center gap-2">
                  <img src="assets/icons/locationIcon.svg" alt="Location" class="w-5 h-5 object-contain">
                  <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ vacancy.location }}</span>
                </div>
              </div>

              <!-- 4. Son müraciət tarixi -->
              <div class="flex items-center gap-2">
                <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">{{ t().careers.table.deadline }}:</span>
                <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ formatDeadline(vacancy.rawDeadline || vacancy.deadline) }}</span>
              </div>
            </a>
          }
        </div>

        <!-- Pagination -->
        @if (totalPages() > 1) {
          <div 
            appReveal revealDirection="up" [revealDelay]="currentVacancies().length * 100"
            class="flex items-center justify-between mt-12 md:mt-16 w-full max-w-[1200px] mx-auto"
          >
            <div class="w-[48px] h-[48px]">
              @if (currentPage() > 1) {
                <button
                  type="button"
                  (click)="prevPage()"
                  [attr.aria-label]="t().shared.pagination.prev"
                  class="w-full h-full rounded-[12px] bg-[#F7F9FC] flex items-center justify-center transition-colors duration-300 hover:bg-[#EBF0F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0000FE]"
                >
                  <span
                    aria-hidden="true"
                    class="h-5 w-5 bg-[#0A1642] rotate-180"
                    style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
                  ></span>
                </button>
              }
            </div>

            <!-- Page Indicator -->
            <span class="font-bdo font-normal text-[14px] md:text-[16px] text-[#80899D]">
              {{ currentPage() }}/{{ totalPages() }}
            </span>

            <!-- Next Button -->
            <div class="w-[48px] h-[48px]">
              @if (currentPage() < totalPages()) {
                <button
                  type="button"
                  (click)="nextPage()"
                  class="w-full h-full bg-[#F7F9FC] hover:bg-[#E2E8F0] text-[#0A1642] rounded-[12px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642]"
                  [attr.aria-label]="t().shared.pagination.next"
                >
                  <span
                    aria-hidden="true"
                    class="h-5 w-5 bg-current"
                    style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
                  ></span>
                </button>
              }
            </div>
          </div>
        }
        
      </div>
    </section>
  `
})
export class CareersPageComponent {
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly translationService = inject(TranslationService);
    private readonly destroyRef = inject(DestroyRef);

    readonly t = this.translationService.translations;

    readonly tabKeys: readonly TabKey[] = ['all', 'fullTime', 'partTime'];

    readonly defaultVacancies: readonly Vacancy[] = [
        {
            slug: 'sebeke-administratoru',
            title: 'Şəbəkə administratoru',
            type: 'Tam ştat',
            location: 'Azərbaycan, Bakı',
            deadline: '17 noyabr 2025'
        }, {
            slug: 'biznesin-inkisafi-uzre-menecer',
            title: 'Biznesin inkişafı üzrə Menecer',
            type: 'Tam ştat',
            location: 'Azərbaycan, Bakı',
            deadline: '17 noyabr 2025'
        }, {
            slug: 'middle-product-owner',
            title: 'Middle Product Owner',
            type: 'Tam ştat',
            location: 'Azərbaycan, Bakı',
            deadline: '17 noyabr 2025'
        }, {
            slug: 'periferiya-qurgulari-temiri',
            title: 'Periferiya qurğuları təmiri və dolumu üzrə usta',
            type: 'Tam ştat',
            location: 'Azərbaycan, Bakı',
            deadline: '17 noyabr 2025'
        }
    ];

    readonly heroTitle = signal<string | undefined>(undefined);
    readonly heroBody = signal<string | undefined>(undefined);
    readonly openVacanciesTitle = signal<string | undefined>(undefined);

    readonly allVacancies = signal<Vacancy[]>([]);
    readonly totalMetaPages = signal<number>(1);

    selectedTab = signal<TabKey>('all');
    currentPage = signal(1);
    itemsPerPage = 10;

    totalPages = computed(() => this.totalMetaPages());
    currentVacancies = computed(() => this.allVacancies());

    constructor() {
      this.languageService.locale$.pipe(
        switchMap((locale) => forkJoin({
          pageContent: this.apiService.getPageContents('careers', locale).pipe(catchError(() => of(null)))
        })),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(({ pageContent }) => {
        if (pageContent?.sections) {
          const secs = pageContent.sections;
          if (secs.hero) {
            if (secs.hero.title) this.heroTitle.set(secs.hero.title);
            if (secs.hero.body) this.heroBody.set(secs.hero.body);
          }
          if (secs.open_vacancies?.title) {
            this.openVacanciesTitle.set(secs.open_vacancies.title);
          }
        }
        this.loadVacancies();
      });
    }

    loadVacancies(locale?: string): void {
      const currentLocale = locale || this.languageService.currentLocale();
      const tabKey = this.selectedTab();
      let empTypeParam: number | string | undefined = undefined;
      if (tabKey === 'fullTime') {
        empTypeParam = 0;
      } else if (tabKey === 'partTime') {
        empTypeParam = 1;
      }

      this.apiService.getVacancies(this.currentPage(), this.itemsPerPage, empTypeParam, currentLocale).pipe(
        catchError(() => of(null))
      ).subscribe((res: any) => {
        if (res && res.data) {
          const mapped: Vacancy[] = res.data.map((item: any) => {
            return {
              slug: item.slug || String(item.id),
              title: item.title || '',
              type: String(item.employmentType),
              rawEmpType: item.employmentType,
              location: item.location || 'Azərbaycan, Bakı',
              deadline: item.deadline || item.endDate || '',
              rawDeadline: item.deadline || item.endDate,
              isExpired: item.isExpired || false
            };
          });
          this.allVacancies.set(mapped);
          if (res.meta) {
            this.totalMetaPages.set(res.meta.total_pages || Math.ceil((res.meta.total || mapped.length) / this.itemsPerPage) || 1);
          }
        }
      });
    }

    formatEmploymentType(empType: any): string {
      if (empType === 0 || empType === '0') {
        return this.t().careers.fullTime;
      }
      if (empType === 1 || empType === '1') {
        return this.t().careers.partTime;
      }
      if (typeof empType === 'string') {
        const lower = empType.toLowerCase();
        if (lower.includes('tam') || lower.includes('full') || lower.includes('постоянн')) {
          return this.t().careers.fullTime;
        }
        if (lower.includes('yarım') || lower.includes('part') || lower.includes('неполн')) {
          return this.t().careers.partTime;
        }
      }
      return String(empType || '');
    }

    formatDeadline(dateStr?: string | null): string {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return String(dateStr);

      const locale = this.languageService.currentLocale();
      if (locale === 'az') {
        const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      } else if (locale === 'ru') {
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      } else {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      }
    }

    selectTab(tab: TabKey): void {
        this.selectedTab.set(tab);
        this.currentPage.set(1);
        this.loadVacancies();
    }

    nextPage(): void {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update(p => p + 1);
            this.loadVacancies();
        }
    }

    prevPage(): void {
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
            this.loadVacancies();
        }
    }
}
