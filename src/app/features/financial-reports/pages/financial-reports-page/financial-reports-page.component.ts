import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';

interface FinancialReport {
    readonly id: string;
    readonly title: string;
    readonly fileUrl: string;
    readonly fileType: 'pdf' | 'word' | 'excel';
}

@Component({
    selector: 'app-financial-reports-page',
    standalone: true,
    imports: [
        CommonModule, RevealDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- Hero Section -->
    <div class="bg-[#F7F9FC] pt-[180px] pb-16 md:pb-24 lg:pb-32 flex flex-col items-center justify-center">
      <div class="container-main w-full">
        <h1 
          appReveal revealDirection="up" [revealDelay]="0"
          class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[76px] tracking-normal text-center text-[#0A1642] m-0"
        >
          Maliyyə hesabatları
        </h1>
      </div>
    </div>

    <!-- Reports Section -->
    <section class="w-full bg-[#FFFFFF] py-16 md:py-24 lg:py-32">
      <div class="container-main flex flex-col gap-6">
        @for (report of currentReports(); track report.id; let i = $index) {
          <a
            [href]="report.fileUrl"
            [target]="report.fileType === 'pdf' ? '_blank' : '_self'"
            [rel]="report.fileType === 'pdf' ? 'noopener noreferrer' : ''"
            [download]="report.fileType !== 'pdf' ? '' : null"
            appReveal revealDirection="up" [revealDelay]="i * 100"
            class="group w-full max-w-[1200px] mx-auto min-h-[132px] rounded-[24px] bg-[#F7F9FC] p-6 md:p-8 flex items-center transition-all duration-300 hover:bg-[#EBF0F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FE] focus-visible:ring-offset-2"
          >
            <h3 class="font-bdo font-medium text-[20px] md:text-[24px] leading-[26px] md:leading-[30px] tracking-normal text-[#0A1642] m-0 group-hover:text-[#0000FE] transition-colors duration-300">
              {{ report.title }}
            </h3>
          </a>
        }

        <!-- Pagination -->
        <div 
          appReveal revealDirection="up" [revealDelay]="currentReports().length * 100"
          class="flex items-center justify-between mt-3 md:mt-3 w-full max-w-[1200px] mx-auto"
        >
          <!-- Spacer to ensure the page indicator is perfectly centered -->
          <div class="w-[48px] h-[48px]">
            @if (currentPage() > 1) {
              <button
                (click)="prevPage()"
                class="w-full h-full rounded-[12px] bg-[#F7F9FC] flex items-center justify-center transition-colors duration-300 hover:bg-[#EBF0F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0000FE]"
              >
                <!-- Reuse right arrow but rotate for left, assuming a specific left arrow isn't specified or rightArrowBlue is easier to reuse if we rotate it, but using rightArrowBlue.svg might not work well reversed unless styled. I'll stick to a generic approach or assume an icon exists. -->
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
                class="absolute right-0 w-[48px] h-[48px] bg-[#F7F9FC] hover:bg-[#E2E8F0] text-[#0A1642] rounded-[12px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642] disabled:opacity-50 disabled:cursor-not-allowed"
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
        
      </div>
    </section>
  `
})
export class FinancialReportsPageComponent {
    readonly reports : readonly FinancialReport[] = [
        {
            id: '1',
            title: '2021-2022-ci illər üzrə Maliyyə hesabatı və Audit rəyi',
            fileUrl: 'assets/documents/2021-2022-hesabat.pdf',
            fileType: 'pdf'
        }, {
            id: '2',
            title: '2023-cü il üzrə Maliyyə hesabatı və Audit rəyi',
            fileUrl: 'assets/documents/2023-hesabat.pdf',
            fileType: 'pdf'
        }, {
            id: '3',
            title: '2024-cü il üzrə Maliyyə hesabatı və Audit rəyi',
            fileUrl: 'assets/documents/2024-hesabat.pdf',
            fileType: 'pdf'
        }
    ];

    currentPage = signal(1);
    itemsPerPage = 10; // High enough to show all 3, but enables the 1/1 pagination to show as expected in a real app

    totalPages = computed(() => Math.ceil(this.reports.length / this.itemsPerPage) || 1);

    currentReports = computed(() => {
        const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
        return this.reports.slice(startIndex, startIndex + this.itemsPerPage);
    });

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
