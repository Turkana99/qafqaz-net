import {ChangeDetectionStrategy, Component, computed, inject, signal, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of} from 'rxjs';
import {ResolveMediaUrlPipe} from '../../../../core/utils/media.helper';

interface FinancialReport {
    readonly id: string;
    readonly title: string;
    readonly fileUrl: string;
    readonly fileType: 'pdf' | 'word' | 'excel';
    readonly year?: string | number;
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

        <!-- Year / Period Filters -->
        <div appReveal revealDirection="up" class="flex items-center justify-center gap-2 mb-4">
          @for (year of years(); track year.value) {
            <button
              type="button"
              (click)="selectYear(year.value)"
              [class.bg-[#0A1642]]="selectedYear() === year.value"
              [class.text-white]="selectedYear() === year.value"
              [class.bg-[#F7F9FC]]="selectedYear() !== year.value"
              [class.text-[#0A1642]]="selectedYear() !== year.value"
              class="px-5 py-2.5 rounded-[12px] font-bdo font-medium text-[15px] transition-all hover:bg-[#EBF0F7] focus:outline-none"
            >
              {{ year.label }}
            </button>
          }
        </div>

        @for (report of currentReports(); track report.id; let i = $index) {
          <div
            appReveal revealDirection="up" [revealDelay]="i * 100"
            class="group w-full max-w-[1200px] mx-auto min-h-[132px] rounded-[24px] bg-[#F7F9FC] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:bg-[#EBF0F7]"
          >
            <div class="flex items-center gap-4">
              <!-- Document Icon -->
              <div class="w-12 h-12 rounded-[12px] bg-white flex items-center justify-center shadow-sm shrink-0">
                <svg class="w-6 h-6 text-[#4343FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <h3 class="font-bdo font-medium text-[16px] md:text-[20px] leading-[26px] md:leading-[30px] tracking-normal text-[#0A1642] m-0 group-hover:text-[#0000FE] transition-colors duration-300">
                {{ report.title }}
              </h3>
            </div>

            <!-- Download / View Actions -->
            <div class="flex items-center gap-3 self-end sm:self-center">
              <a
                [href]="report.fileUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-[10px] bg-white text-[#0A1642] hover:text-[#4343FF] font-bdo font-medium text-[14px] shadow-sm transition-colors border border-[#E2E8F0]"
              >
                Bax
              </a>

              <a
                [href]="report.fileUrl"
                download
                class="px-4 py-2 rounded-[10px] bg-[#0A1642] text-white hover:bg-[#4343FF] font-bdo font-medium text-[14px] shadow-sm transition-colors"
              >
                Yüklə
              </a>
            </div>
          </div>
        }

        <!-- Pagination -->
        @if (totalPages() > 1) {
          <div 
            appReveal revealDirection="up" [revealDelay]="currentReports().length * 100"
            class="flex items-center justify-between mt-6 w-full max-w-[1200px] mx-auto"
          >
            <div class="w-[48px] h-[48px]">
              @if (currentPage() > 1) {
                <button
                  type="button"
                  (click)="prevPage()"
                  aria-label="Previous page"
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
                  aria-label="Next page"
                  class="w-full h-full rounded-[12px] bg-[#F7F9FC] hover:bg-[#E2E8F0] text-[#0A1642] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642]"
                >
                  <span
                    aria-hidden="true"
                    class="h-5 w-5 bg-[#0A1642]"
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
export class FinancialReportsPageComponent {
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly destroyRef = inject(DestroyRef);

    readonly defaultReports: readonly FinancialReport[] = [
        {
            id: '1',
            title: '2021-2022-ci illər üzrə Maliyyə hesabatı və Audit rəyi',
            fileUrl: 'assets/documents/2021-2022-hesabat.pdf',
            fileType: 'pdf',
            year: '2022'
        }, {
            id: '2',
            title: '2023-cü il üzrə Maliyyə hesabatı və Audit rəyi',
            fileUrl: 'assets/documents/2023-hesabat.pdf',
            fileType: 'pdf',
            year: '2023'
        }, {
            id: '3',
            title: '2024-cü il üzrə Maliyyə hesabatı və Audit rəyi',
            fileUrl: 'assets/documents/2024-hesabat.pdf',
            fileType: 'pdf',
            year: '2024'
        }
    ];

    readonly years = signal<{ label: string; value: string }[]>([
        { label: 'Hamısı', value: 'all' },
        { label: '2024', value: '2024' },
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' }
    ]);
    readonly selectedYear = signal<string>('all');

    readonly reports = signal<FinancialReport[]>([...this.defaultReports]);
    readonly currentPage = signal(1);
    readonly itemsPerPage = 10;
    readonly totalPages = signal(1);

    readonly currentReports = computed(() => {
        const list = this.reports();
        const year = this.selectedYear();
        const filtered = year === 'all' ? list : list.filter(r => String(r.year || '') === year || r.title.includes(year));
        const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
        return filtered.slice(startIndex, startIndex + this.itemsPerPage);
    });

    constructor() {
        this.languageService.locale$.pipe(
            switchMap(() => this.loadReports()),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((res: any) => {
            if (res && res.data && res.data.length > 0) {
                this.reports.set(res.data);
                this.totalPages.set(res.meta?.total_pages || Math.ceil(res.data.length / this.itemsPerPage) || 1);
            }
        });
    }

    loadReports() {
        const yearVal = this.selectedYear() === 'all' ? undefined : this.selectedYear();
        return this.apiService.getFinancialReports(this.currentPage(), this.itemsPerPage, yearVal).pipe(
            catchError(() => of(null))
        );
    }

    selectYear(year: string): void {
        this.selectedYear.set(year);
        this.currentPage.set(1);
        this.loadReports().subscribe((res: any) => {
            if (res && res.data && res.data.length > 0) {
                this.reports.set(res.data);
                this.totalPages.set(res.meta?.total_pages || Math.ceil(res.data.length / this.itemsPerPage) || 1);
            }
        });
    }

    nextPage(): void {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update(p => p + 1);
            this.loadReports();
        }
    }

    prevPage(): void {
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
            this.loadReports();
        }
    }
}
