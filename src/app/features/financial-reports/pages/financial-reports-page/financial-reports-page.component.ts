import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    signal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {TranslationService} from '../../../../core/services/translation.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of} from 'rxjs';
import {environment} from '../../../../../environments/environment';

interface FinancialReport {
    readonly id: string;
    readonly title: string;
    readonly fileUrl: string;
    readonly yearRange?: string;
    readonly sortOrder?: number;
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
          {{ t().financialReports }}
        </h1>
      </div>
    </div>

    <!-- Reports Section -->
    <section class="w-full bg-[#FFFFFF] py-16 md:py-24 lg:py-32">
      <div class="container-main flex flex-col gap-6">

        @for (report of reports(); track report.id || $index; let i = $index) {
          <a
            [href]="getFileUrl(report)"
            target="_blank"
            rel="noopener noreferrer"
            (click)="onReportClick($event, report)"
            appReveal revealDirection="up" [revealDelay]="i * 100"
            class="group w-full max-w-[1200px] mx-auto min-h-[92px] sm:min-h-[110px] rounded-[20px] bg-[#F7F9FC] p-6 md:p-8 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-[#EBF0F7] cursor-pointer"
          >
            <h3 class="font-bdo font-bold text-[18px] md:text-[22px] leading-[26px] md:leading-[32px] tracking-normal text-[#0A1642] m-0 group-hover:text-[#0000FE] transition-colors duration-300">
              {{ report.title }}
            </h3>
          </a>
        }

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
  `
})
export class FinancialReportsPageComponent {
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly translationService = inject(TranslationService);
    private readonly destroyRef = inject(DestroyRef);

    readonly t = this.translationService.translations;

    readonly reports = signal < FinancialReport[] > ([]);
    readonly currentPage = signal(1);
    readonly itemsPerPage = 10;
    readonly totalPages = signal(1);
    readonly hasPrev = signal(false);
    readonly hasNext = signal(false);

    constructor() {
        this.languageService.locale$.pipe(switchMap(() => this.fetchReports()), takeUntilDestroyed(this.destroyRef)).subscribe((res : any) => {
            this.handleResponse(res);
        });
    }

    fetchReports() {
        return this.apiService.getFinancialReports(this.currentPage(), this.itemsPerPage).pipe(catchError(() => of(null)));
    }

    loadPage(page : number) {
        this.currentPage.set(page);
        this.fetchReports().subscribe((res : any) => {
            this.handleResponse(res);
        });
    }

    handleResponse(res : any) {
        if (res && res.data) {
            this.reports.set(res.data);
            if (res.meta) {
                const meta = res.meta;
                this.currentPage.set(meta.current_page ?? 1);
                this.totalPages.set(meta.total_pages ?? 1);
                this.hasPrev.set(meta.has_prev ?? (meta.current_page > 1));
                this.hasNext.set(meta.has_next ?? (meta.current_page < meta.total_pages));
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

    getFileUrl(report: any): string {
        if (!report) return '#';
        let url = report.fileUrl || report.file_url || report.file || report.url || report.pdfUrl || report.pdf_url || report.filePath || report.file_path || report.documentUrl || report.document_url || report.attachmentUrl || report.attachment_url || report.path || '';
        if (typeof url === 'object' && url !== null) {
            url = url.url || url.fileUrl || url.file_url || url.path || '';
        }
        url = String(url || '').trim();
        if (!url || url === '#' || url === 'undefined' || url === 'null') return '#';

        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('blob:')) {
            const apiBase = environment.financialReports.getFinancialReports.replace(/\/api\/v1\/.*$/, '').replace(/\/api\/.*$/, '');
            url = url.startsWith('/') ? `${apiBase}${url}` : `${apiBase}/${url}`;
        }
        return url;
    }

    onReportClick(event: MouseEvent, report: any): void {
        event.preventDefault();
        event.stopPropagation();

        if (!report || !report.id) {
            const fallbackUrl = this.getFileUrl(report);
            if (fallbackUrl && fallbackUrl !== '#') {
                window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
            }
            return;
        }

        this.apiService.getFinancialReportById(report.id).pipe(
            catchError(() => of(null))
        ).subscribe((res: any) => {
            const fileUrl = this.getFileUrl(res || report);
            if (fileUrl && fileUrl !== '#') {
                window.open(fileUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }
}
