import {ChangeDetectionStrategy, Component, inject, signal, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {CallToActionSectionComponent} from '../../../home/components/call-to-action-section/call-to-action-section.component';
import {RequestModalService} from '../../../../shared/services/request-modal.service';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of, combineLatest} from 'rxjs';
import {ServiceDetail} from '../../../../core/models/api.model';

@Component({
  selector: 'app-service-detail-page',
  standalone: true,
  imports: [
    CommonModule, RevealDirective, CallToActionSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isLoading()) {
      <div class="bg-[#F7F9FC] pt-[180px] pb-32 w-full min-h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4343FF]"></div>
      </div>
    } @else if (service(); as item) {
      <!-- Hero Section -->
      <section class="w-full bg-[#F7F9FC] pt-[180px] pb-16 lg:pb-32 overflow-hidden">
        <div class="container-main">
          <div class="flex flex-col lg:flex-row justify-between lg:items-center gap-12 lg:gap-8">
            
            <!-- Left Content -->
            <div class="w-full lg:max-w-[650px] xl:max-w-[700px] flex flex-col items-start lg:pt-4 min-w-0">
              <h1 
                appReveal revealDirection="left" [revealDelay]="0"
                class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[58px] lg:leading-[65px] tracking-normal text-[#0A1642] mb-6 break-words"
              >
                {{ item.title }}
              </h1>
              
              <p 
                appReveal revealDirection="left" [revealDelay]="100"
                class="font-bdo font-normal text-[16px] leading-[26px] text-[#80899D] mb-10 lg:mb-12 break-words"
              >
                {{ item.description || '' }}
              </p>
              
              <button 
                appReveal revealDirection="up" [revealDelay]="200"
                (click)="openModal()"
                class="group inline-flex items-center justify-center font-bdo font-medium text-[16px] text-white btn-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4343FF] active:scale-[0.98] btn-gradient w-auto h-[52px] md:h-[64px] rounded-[16px] px-6 gap-[6px] whitespace-nowrap"
              >
                <span>Sorğunu göndər</span>
                <img src="assets/icons/right.svg" alt="Right Arrow" class="w-5 h-5 object-contain transition-transform duration-300 group-hover:translate-x-1 brightness-0 invert">
              </button>
            </div>

            <!-- Right Content: Image Wrapper -->
            @if (item.coverImageUrl) {
              <div 
                appReveal revealDirection="right" [revealDelay]="100"
                class="w-full lg:w-auto flex justify-center lg:justify-end shrink-0"
              >
                <div class="w-[360px] h-[360px] bg-[#FFFFFF] rounded-[32px] p-[24px] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] flex items-center justify-center overflow-hidden">
                  <img [src]="item.coverImageUrl" [alt]="item.title" class="w-full h-full object-contain">
                </div>
              </div>
            }

          </div>
        </div>
      </section>

      <!-- Rich Text & Features Section -->
      <section class="w-full bg-[#FFFFFF] pt-12 lg:pt-16 pb-16 lg:pb-32 overflow-hidden">
        <div class="container-main max-w-full">
          <div class="w-full max-w-[1200px] mx-auto flex flex-col items-start text-left">
            @if (item.features && item.features.length) {
              <h2 
                appReveal revealDirection="up" [revealDelay]="0"
                class="font-bdo font-bold text-[28px] md:text-[36px] leading-[36px] md:leading-[42px] tracking-normal text-[#0A1642] mb-8"
              >
                Xidmətlərimizə daxildir:
              </h2>

              <div class="w-full flex flex-col gap-8 mb-12">
                @for (feature of item.features; track feature.id || $index) {
                  <div appReveal revealDirection="up" [revealDelay]="100" class="w-full">
                    <h3 class="font-bdo font-bold text-[22px] text-[#0A1642] mb-4">{{ feature.title }}</h3>
                    @if (feature.description) {
                      <div 
                        class="w-full rich-text-content overflow-x-auto break-words"
                        [innerHTML]="feature.description"
                      ></div>
                    }
                  </div>
                }
              </div>
            }

            @if (item.detailedContent) {
              <div 
                appReveal revealDirection="up" [revealDelay]="100"
                class="w-full rich-text-content mt-4 overflow-x-auto break-words"
                [innerHTML]="item.detailedContent"
              ></div>
            }
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <app-call-to-action-section variant="dark"></app-call-to-action-section>
    } @else {
      <!-- Not found fallback -->
      <div class="bg-[#F7F9FC] pt-[180px] pb-32 w-full min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="font-bdo font-bold text-[48px] text-[#0A1642] mb-4">Xidmət tapılmadı</h1>
        </div>
      </div>
    }
  `,
  styles: [`
    /* Reusable Rich Text Styles */
    :host ::ng-deep .rich-text-content {
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      word-break: break-word;
      overflow-wrap: break-word;
      color: inherit;
    }

    :host ::ng-deep .rich-text-content h1,
    :host ::ng-deep .rich-text-content h2,
    :host ::ng-deep .rich-text-content h3,
    :host ::ng-deep .rich-text-content h4,
    :host ::ng-deep .rich-text-content h5,
    :host ::ng-deep .rich-text-content h6 {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: bold;
      font-style: normal;
      font-size: 22px;
      line-height: 40px;
      letter-spacing: 0;
      color: #0A1642;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }

    @media (max-width: 1024px) {
      :host ::ng-deep .rich-text-content h1,
      :host ::ng-deep .rich-text-content h2,
      :host ::ng-deep .rich-text-content h3,
      :host ::ng-deep .rich-text-content h4 {
        font-size: 20px;
        line-height: 32px;
      }
    }

    :host ::ng-deep .rich-text-content p {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0;
      margin-bottom: 1rem;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    :host ::ng-deep .rich-text-content ul {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0;
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
      list-style-type: disc;
    }

    :host ::ng-deep .rich-text-content ol {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0;
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
      list-style-type: decimal;
    }

    :host ::ng-deep .rich-text-content li {
      margin-bottom: 0.5rem;
    }

    :host ::ng-deep .rich-text-content strong,
    :host ::ng-deep .rich-text-content b {
      font-weight: bold;
      color: #0A1642;
    }

    :host ::ng-deep .rich-text-content a {
      color: #4343FF;
      text-decoration: underline;
      transition: color 0.2s ease;
    }
    
    :host ::ng-deep .rich-text-content a:hover {
      color: #00F090;
    }

    :host ::ng-deep .rich-text-content table,
    :host ::ng-deep .rich-text-content pre,
    :host ::ng-deep .rich-text-content img {
      max-width: 100%;
      overflow-x: auto;
    }
  `]
})
export class ServiceDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly modalService = inject(RequestModalService);
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(true);
  readonly service = signal<ServiceDetail | undefined>(undefined);

  constructor() {
    combineLatest([
      this.route.paramMap,
      this.languageService.locale$
    ]).pipe(
      switchMap(([params, locale]) => {
        this.isLoading.set(true);
        const slug = params.get('slug');
        if (!slug) return of(null);
        return this.apiService.getServiceBySlug(slug).pipe(
          catchError(() => of(null))
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((serv: ServiceDetail | null) => {
      this.isLoading.set(false);
      this.service.set(serv || undefined);
      if (serv) {
        const pageTitle = serv.title || 'QafqazNet Xidmətlər';
        this.titleService.setTitle(pageTitle);

        const desc = serv.metaDescription || serv.shortDescription || serv.description || '';
        if (desc) {
          this.metaService.updateTag({ name: 'description', content: desc });
        }
      }
    });
  }

  openModal() {
    this.modalService.open();
  }
}
