import {ChangeDetectionStrategy, Component, computed, inject, signal, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {CallToActionSectionComponent} from '../../../home/components/call-to-action-section/call-to-action-section.component';
import {SERVICES} from '../../../../core/constants/mock-data';
import {RequestModalService} from '../../../../shared/services/request-modal.service';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of, combineLatest} from 'rxjs';
import {ResolveMediaUrlPipe} from '../../../../core/utils/media.helper';

@Component({
    selector: 'app-service-detail-page',
    standalone: true,
    imports: [
        CommonModule, RevealDirective, CallToActionSectionComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (service(); as item) {
      <!-- Hero Section -->
      <section class="w-full bg-[#F7F9FC] pt-[180px] pb-16 lg:pb-32">
        <div class="container-main">
          <div class="flex flex-col lg:flex-row justify-between lg:items-center gap-12 lg:gap-8">
            
            <!-- Left Content -->
            <div class="w-full lg:max-w-[650px] xl:max-w-[700px] flex flex-col items-start lg:pt-4">
              <h1 
                appReveal revealDirection="left" [revealDelay]="0"
                class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[58px] lg:leading-[65px] tracking-normal text-[#0A1642] mb-6"
              >
                {{ item.title }}
              </h1>
              
              <p 
                appReveal revealDirection="left" [revealDelay]="100"
                class="font-bdo font-normal text-[16px] leading-[26px] text-[#80899D] mb-10 lg:mb-12"
              >
                {{ item.shortDescription || item.description || defaultDesc }}
              </p>
              
              <button 
                appReveal revealDirection="up" [revealDelay]="200"
                (click)="openModal()"
                class="group inline-flex items-center justify-center font-bdo font-medium text-[16px] text-white btn-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4343FF] active:scale-[0.98] btn-gradient w-[204px] h-[52px] md:w-[203px] md:h-[64px] rounded-[16px] px-6 gap-[6px]"
              >
                <span>Sorğunu göndər</span>
                <img src="assets/icons/right.svg" alt="Right Arrow" class="w-5 h-5 object-contain transition-transform duration-300 group-hover:translate-x-1 brightness-0 invert">
              </button>
            </div>

            <!-- Right Content: Image Wrapper -->
            <div 
              appReveal revealDirection="right" [revealDelay]="100"
              class="w-full lg:w-auto flex justify-center lg:justify-end shrink-0"
            >
              @if (item.iconUrl) {
                <div class="w-[360px] h-[360px] bg-[#FFFFFF] rounded-[32px] p-[36px] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] flex items-center justify-center">
                  <img [src]="item.iconUrl" [alt]="item.title" class="w-[256px] h-[256px] object-contain">
                </div>
              }
            </div>

          </div>
        </div>
      </section>

      <!-- Rich Text Section -->
      <section class="w-full bg-[#FFFFFF] pt-12 lg:pt-16 pb-16 lg:pb-32">
        <div class="container-main">
          <div class="w-full flex flex-col items-start text-left">
            @if (item.coverImageUrl) {
              <div class="w-full max-w-[1200px] mb-12 rounded-[24px] overflow-hidden">
                <img [src]="item.coverImageUrl" [alt]="item.title" class="w-full h-auto object-cover" />
              </div>
            }

            @if (item.features && item.features.length) {
              <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                @for (feature of item.features; track $index) {
                  <div class="p-6 bg-[#F7F9FC] rounded-[24px] flex flex-col items-start gap-4">
                    @if (feature.icon) {
                      <img [src]="feature.icon" [alt]="feature.title" class="w-12 h-12 object-contain" />
                    }
                    <h3 class="font-bdo font-bold text-[20px] text-[#0A1642]">{{ feature.title }}</h3>
                    @if (feature.description) {
                      <p class="font-bdo text-[16px] text-[#80899D]">{{ feature.description }}</p>
                    }
                  </div>
                }
              </div>
            }

            <h2 
              appReveal revealDirection="up" [revealDelay]="0"
              class="font-bdo font-bold text-[28px] md:text-[36px] leading-[36px] md:leading-[42px] tracking-normal text-[#0A1642] mb-8"
            >
              Xidmətlərimizə daxildir:
            </h2>

            <div 
              appReveal revealDirection="up" [revealDelay]="100"
              class="w-full rich-text-content"
              [innerHTML]="item.content || mockContent"
            ></div>
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
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 1024px) {
      :host ::ng-deep .rich-text-content h2,
      :host ::ng-deep .rich-text-content h3,
      :host ::ng-deep .rich-text-content h4 {
        font-size: 24px;
        line-height: 34px;
      }
    }

    :host ::ng-deep .rich-text-content p {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0;
      color: #0A1642;
      margin-bottom: 1.5rem;
    }

    :host ::ng-deep .rich-text-content ul {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0;
      color: #0A1642;
      list-style-type: disc;
      padding-left: 24px;
      margin-bottom: 2rem;
    }

    :host ::ng-deep .rich-text-content ol {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0;
      color: #0A1642;
      list-style-type: decimal;
      padding-left: 24px;
      margin-bottom: 2rem;
    }

    :host ::ng-deep .rich-text-content li {
      margin-bottom: 0.5rem;
    }

    :host ::ng-deep .rich-text-content li::marker {
      color: #0A1642;
    }

    :host ::ng-deep .rich-text-content strong,
    :host ::ng-deep .rich-text-content b {
      font-weight: 500;
    }

    :host ::ng-deep .rich-text-content a {
      color: #0000FE;
      text-decoration: underline;
      transition: color 0.3s;
    }
    
    :host ::ng-deep .rich-text-content a:hover {
      color: #00F090;
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

    readonly service = signal<any | undefined>(undefined);

    readonly defaultDesc = 'Server otaqları və data mərkəzləri müəssisənin informasiya texnologiyaları sistemlərinin təhlükəsiz və fasiləsiz fəaliyyətini təmin edən əsas mərkəzlərdir. Şirkətimiz beynəlxalq standartlara uyğun, çevik və dayanıqlı İT infrastrukturu yaratmaq üçün kompleks həllər təqdim edir.';

    readonly mockContent = `
    <h2>1. Tələblərin Təhlili və Layihələndirmə</h2>
    <ul>
      <li>Texniki ehtiyaclar və biznes hədəflərinə əsaslanan analiz</li>
      <li>Server otaqları və ya data mərkəzinin ölçüsü, enerji ehtiyacı, soyutma və təhlükəsizlik tələblərinin müəyyən edilməsi</li>
      <li>Gələcək genişlənmələr nəzərə alınmaqla dizaynın hazırlanması</li>
      <li>Yeni data mərkəzlərinin sıfırdan layihələndirilməsi və tikintisi</li>
    </ul>

    <h2>2. İnfrastrukturun Qurulması</h2>
    <ul>
      <li>Elektrik, UPS və enerji sistemlərinin inteqrasiyası</li>
      <li>Soyutma sistemləri: klimat nəzarəti, kondisionerlər, hava axını istiqamətləndiriciləri</li>
      <li>Təhlükəsizlik və monitorinq sistemləri: kart oxuyucular, biometrik giriş, yanğın siqnalizasiyası, kameralar</li>
    </ul>

    <h2>3. Strukturlaşdırılmış Kabelləşmə</h2>
    <ul>
      <li>Data və enerji kabellərinin optimallaşdırılmış şəkildə çəkilməsi</li>
      <li>Kabellərin etiketlənməsi, qruplaşdırılması və test olunması</li>
      <li>Kabel idarəetmə sistemlərinin tətbiqi (tray-lər, patch panel-lər və s.)</li>
    </ul>

    <h2>4. Rack Kabinetlərinin Qurulması və Avadanlıq Montajı</h2>
    <ul>
      <li>Server, şəbəkə və storage avadanlıqları üçün uyğun rack kabinetlərinin montajı</li>
      <li>Avadanlıqların texniki tələblərə uyğun şəkildə quraşdırılması və sazlanması</li>
      <li>Şəbəkə əlaqələrinin düzgün şəkildə qurulması</li>
    </ul>

    <h2>5. Test, Təhvil və Texniki Dəstək</h2>
    <ul>
      <li>Qurulmuş infrastrukturun funksional testləri</li>
      <li>Əməliyyat sənədlərinin hazırlanması və təqdim olunması</li>
      <li>Texniki bilik və ilkin dəstək xidmətləri</li>
    </ul>

    <p>Peşəkar şəkildə qurulmuş server otağı və ya data mərkəzi:</p>
    <ul>
      <li>Sistemlərin fasiləsiz və təhlükəsiz işləməsini təmin edir</li>
      <li>Avadanlığın ömrünü uzadır və nasazlıq risklərini azaldır</li>
      <li>Gələcək genişlənmələr üçün çevik və etibarlı baza yaradır</li>
      <li>İT komandası üçün idarəetməni asanlaşdırır</li>
    </ul>
    
    <p>Server otaqlarınızı və data mərkəzinizi beynəlxalq standartlara uyğun şəkildə dizayn edib, sıfırdan inşa edək.</p>
  `;

    constructor() {
        combineLatest([
            this.route.paramMap,
            this.languageService.locale$
        ]).pipe(
            switchMap(([params]) => {
                const slug = params.get('slug');
                if (!slug) return of(null);
                return this.apiService.getServiceBySlug(slug).pipe(
                    catchError(() => {
                        const mock = SERVICES.find(v => v.slug === slug);
                        return of(mock || null);
                    })
                );
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((serv: any) => {
            this.service.set(serv);
            if (serv) {
                const pageTitle = serv.metaTitle || serv.title || 'QafqazNet Xidmətlər';
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
