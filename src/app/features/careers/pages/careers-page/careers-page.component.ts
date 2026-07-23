import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';

interface Vacancy {
    readonly slug: string;
    readonly title: string;
    readonly type: 'Tam ştat' | 'Yarım ştat';
    readonly location: string;
    readonly deadline: string;
}

type TabType = 'Hamısı' | 'Tam ştat' | 'Yarım ştat';

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
          Karyera
        </h1>
        <p 
          appReveal revealDirection="up" [revealDelay]="100"
          class="font-bdo font-normal text-[16px] md:text-[22px] lg:text-[20px] leading-[26px] md:leading-[32px] lg:leading-[38px] tracking-normal text-center text-[#0A1642] max-w-[900px] m-0"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
            Açıq vakansiyalar
          </h2>
          
          <div 
            appReveal revealDirection="right" [revealDelay]="100"
            class="bg-[#F7F9FC] rounded-[12px] p-[6px] flex items-center justify-center lg:justify-start overflow-x-auto mx-auto lg:mx-0 max-w-full"
          >
            @for (tab of tabs; track tab) {
              <button 
                (click)="selectTab(tab)"
                [class.bg-[#FFFFFF]]="selectedTab() === tab"
                [class.text-[#0A1642]]="selectedTab() === tab"
                [class.shadow-sm]="selectedTab() === tab"
                [class.rounded-[8px]]="selectedTab() === tab"
                [class.text-[#A0A9BD]]="selectedTab() !== tab"
                class="font-bdo font-normal text-[14px] md:text-[16px] leading-[28px] px-6 py-2 transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FE]"
              >
                {{ tab }}
              </button>
            }
          </div>
        </div>

        <!-- Desktop Headings -->
        <div class="hidden lg:grid grid-cols-4 gap-4 px-6 md:px-8 mb-6">
          <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">Vəzifə</span>
          <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">Vakansiya növü</span>
          <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">Yer</span>
          <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">Son müraciət tarixi</span>
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
                <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">Vakansiya növü:</span>
                <div class="flex items-center gap-2">
                  <img src="assets/icons/clockIcon.svg" alt="Type" class="w-5 h-5 object-contain">
                  <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ vacancy.type }}</span>
                </div>
              </div>

              <!-- 3. Yer -->
              <div class="flex items-center gap-2">
                <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">Yer:</span>
                <div class="flex items-center gap-2">
                  <img src="assets/icons/locationIcon.svg" alt="Location" class="w-5 h-5 object-contain">
                  <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ vacancy.location }}</span>
                </div>
              </div>

              <!-- 4. Son müraciət tarixi -->
              <div class="flex items-center gap-2">
                <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">Son müraciət tarixi:</span>
                <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ vacancy.deadline }}</span>
              </div>
            </a>
          }
        </div>

        <!-- Pagination -->
        @if (totalPages() > 1 || true) {
          <div 
            appReveal revealDirection="up" [revealDelay]="currentVacancies().length * 100"
            class="flex items-center justify-between mt-12 md:mt-16 w-full max-w-[1200px] mx-auto"
          >
            <!-- Spacer to ensure the page indicator is perfectly centered -->
            <div class="w-[48px] h-[48px]">
              @if (currentPage() > 1) {
                <button
                  (click)="prevPage()"
                  class="w-full h-full rounded-[12px] bg-[#F7F9FC] flex items-center justify-center transition-colors duration-300 hover:bg-[#EBF0F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0000FE]"
                >
                  <img src="assets/icons/arrow-left.svg" alt="Previous" class="w-5 h-5 md:w-6 md:h-6 object-contain">
                </button>
              }
            </div>

            <!-- Page Indicator -->
            <span class="font-bdo font-normal text-[14px] md:text-[16px] text-[#80899D]">
              {{ currentPage() }}/{{ totalPages() }}
            </span>

            <!-- Next Button -->
            <div class="w-[48px] h-[48px]">
              <button
                type="button"
                (click)="nextPage()"
                [disabled]="currentPage() >= totalPages()"
                class="w-full h-full bg-[#F7F9FC] hover:bg-[#E2E8F0] text-[#0A1642] rounded-[12px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <span
                  aria-hidden="true"
                  class="h-5 w-5 bg-current"
                  style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
                ></span>
              </button>
            </div>
          </div>
        }
        
      </div>
    </section>
  `
})
export class CareersPageComponent {
    readonly tabs : readonly TabType[] = ['Hamısı', 'Tam ştat', 'Yarım ştat'];

    readonly allVacancies : readonly Vacancy[] = [
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

    selectedTab = signal < TabType > ('Hamısı');
    currentPage = signal(1);
    itemsPerPage = 10;

    filteredVacancies = computed(() => {
        const tab = this.selectedTab();
        if (tab === 'Hamısı') {
            return this.allVacancies;
        }
        return this.allVacancies.filter(v => v.type === tab);
    });

    totalPages = computed(() => Math.ceil(this.filteredVacancies().length / this.itemsPerPage) || 1);

    currentVacancies = computed(() => {
        const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
        return this.filteredVacancies().slice(startIndex, startIndex + this.itemsPerPage);
    });

    selectTab(tab : TabType): void {
        this.selectedTab.set(tab);
        this.currentPage.set(1); // Reset page on tab change
    }

    nextPage(): void {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update(p => p + 1);
        }
    }

    prevPage(): void {
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
        }
    }
}
