import {ChangeDetectionStrategy, Component, inject, signal, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {StatisticCardComponent} from '../../../../shared/ui/statistic-card/statistic-card.component';
import {ABOUT_STATS} from '../../../../core/constants/mock-data';
import {CallToActionSectionComponent} from '../../../home/components/call-to-action-section/call-to-action-section.component';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of} from 'rxjs';
import {ResolveMediaUrlPipe} from '../../../../core/utils/media.helper';

interface CompanyValue {
    readonly title: string;
    readonly description: string;
}

interface CompanyValueCard {
    readonly title: string;
    readonly description: string;
    readonly icon: string;
    readonly iconBackground: string;
}

interface CompanyFact {
    readonly title: string;
    readonly description: string;
}

@Component({
    selector: 'app-company-page',
    standalone: true,
    imports: [
        CommonModule, RevealDirective, StatisticCardComponent, CallToActionSectionComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="bg-[#F7F9FC] pt-[180px] pb-24 md:pb-32">
      <div class="container-main">
        
        <!-- Page Title -->
        <h1 
          appReveal revealDirection="up" [revealDelay]="0"
          class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[40px] tracking-normal text-center text-[#0A1642] mb-12 lg:mb-16"
        >
          Haqqımızda
        </h1>

        <!-- Main Description -->
        <p 
          appReveal revealDirection="up" [revealDelay]="100"
          class="max-w-[1000px] mx-auto font-bdo font-medium text-[22px] md:text-[27px] lg:text-[32px] leading-[30px] md:leading-[34px] lg:leading-[38px] tracking-normal text-center text-[#0A1642] mb-20 lg:mb-32"
        >
          QAFQAZNET — 2015-ci ildən etibarən bizneslərin inkişafına dəstək olan etibarlı İT tərəfdaşıdır.
          <br class="hidden md:block">
          Biz texnologiyanı sadəcə bir vasitə kimi deyil, biznes uğurunun əsas açarı kimi görürük.
        </p>

        <!-- Values Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          @for (value of values; track value.title; let i = $index) {
            <div 
              appReveal revealDirection="up" [revealDelay]="200 + (i * 100)"
              class="flex flex-col gap-4 text-center md:text-left"
            >
              <h3 class="font-bdo font-semibold text-[20px] leading-[26px] text-[#0A1642] m-0">
                {{ value.title }}
              </h3>
              <p class="font-bdo font-normal text-[16px] leading-[22px] text-[#80899D] m-0">
                {{ value.description }}
              </p>
            </div>
          }
        </div>
        
      </div>
    </div>
    
    <!-- Dəyərlərimiz Section -->
    <section class="w-full bg-[#FFFFFF] py-20 md:py-24 lg:py-32">
      <div class="container-main">
        <!-- Title -->
        <h2 
          appReveal revealDirection="left" [revealDelay]="0"
          class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[40px] tracking-normal text-center lg:text-left text-[#0A1642] mb-12 lg:mb-16"
        >
          Dəyərlərimiz
        </h2>
        
        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (card of valueCards; track card.title; let i = $index) {
            <div 
              appReveal revealDirection="up" [revealDelay]="100 + (i * 100)"
              class="w-full lg:w-[282px] min-h-[338px] rounded-[20px] bg-[#F7F9FC] p-[32px] flex flex-col gap-[10px]"
            >
              <div 
                class="w-[56px] h-[56px] rounded-[12px] p-[12px] flex items-center justify-center mb-4"
                [style.backgroundColor]="card.iconBackground"
              >
                <img [src]="card.icon" alt="" class="w-[32px] h-[32px] object-contain">
              </div>
              
              <h3 class="font-bdo font-medium text-[20px] leading-[28px] text-[#0A1642] m-0">
                {{ card.title }}
              </h3>
              
              <p class="font-bdo font-normal text-[14px] leading-[18px] text-[#80899D] m-0 mt-2">
                {{ card.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Əsas faktlar Section -->
    <section class="w-full bg-[#F7F9FC] py-20 md:py-24 lg:py-32">
      <div class="container-main">
        <!-- Title -->
        <h2 
          appReveal revealDirection="left" [revealDelay]="0"
          class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[60px] tracking-normal text-center lg:text-left text-[#0A1642] mb-12 lg:mb-16"
        >
          Əsas faktlar
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-[576px_1fr] gap-10 lg:gap-16 items-start">
          <!-- Left Information Card -->
          <div 
            appReveal revealDirection="left" [revealDelay]="100"
            class="w-full bg-[#FFFFFF] rounded-[24px] p-[32px] md:p-[52px] flex flex-col gap-[16px] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]"
          >
            @for (fact of companyFacts; track fact.title; let i = $index) {
              <div class="flex flex-col gap-2">
                <h3 class="font-bdo font-bold text-[20px] leading-[32px] text-[#0A1642] m-0">
                  {{ fact.title }}
                </h3>
                <p class="font-bdo font-normal text-[16px] leading-[26px] text-[#80899D] m-0">
                  {{ fact.description }}
                </p>
              </div>
              @if (i < companyFacts.length - 1) {
                <hr class="border-t border-[#E5E7EB] w-full my-2">
              }
            }
          </div>

          <!-- Right Statistic Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
            <div class="flex flex-col gap-4 sm:gap-6">
              <div appReveal revealDirection="up" [revealDelay]="150">
                <app-statistic-card [stat]="stats[0]"></app-statistic-card>
              </div>
              <div appReveal revealDirection="up" [revealDelay]="250">
                <app-statistic-card [stat]="stats[1]"></app-statistic-card>
              </div>
            </div>
            <div class="flex flex-col gap-4 sm:gap-6 lg:mt-0">
              <div appReveal revealDirection="up" [revealDelay]="350">
                <app-statistic-card [stat]="stats[2]"></app-statistic-card>
              </div>
              <div appReveal revealDirection="up" [revealDelay]="450">
                <app-statistic-card [stat]="stats[3]"></app-statistic-card>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>

    <!-- Team Section -->
    @if (teamMembers().length > 0) {
      <section class="w-full bg-[#FFFFFF] py-20 md:py-24 lg:py-32">
        <div class="container-main">
          <!-- Title -->
          <h2 
            appReveal revealDirection="left" [revealDelay]="0"
            class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[60px] tracking-normal text-center lg:text-left text-[#0A1642] mb-12 lg:mb-16"
          >
            Komandamız
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            @for (member of teamMembers(); track member.id || member.name; let i = $index) {
              <div 
                appReveal revealDirection="up" [revealDelay]="i * 80"
                class="w-full rounded-[24px] bg-[#F7F9FC] p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              >
                <!-- Member Photo -->
                @if (member.photoUrl || member.image || member.imageUrl) {
                  <div class="w-32 h-32 rounded-full overflow-hidden bg-white mb-4 shadow-sm">
                    <img 
                      [src]="member.photoUrl || member.image || member.imageUrl" 
                      [alt]="member.name"
                      class="w-full h-full object-cover"
                    >
                  </div>
                }

                <!-- Name & Position -->
                <h3 class="font-bdo font-bold text-[20px] text-[#0A1642] m-0 mb-1">
                  {{ member.name || member.fullName }}
                </h3>
                <p class="font-bdo font-normal text-[15px] text-[#80899D] m-0">
                  {{ member.position || member.jobTitle }}
                </p>

                <!-- Social Links (Only displayed if provided by API) -->
                @if (member.linkedin || member.twitter || member.socialLinks) {
                  <div class="flex items-center gap-3 mt-4">
                    @if (member.linkedin) {
                      <a [href]="member.linkedin" target="_blank" rel="noopener noreferrer" class="text-[#80899D] hover:text-[#0000FE] transition-colors" aria-label="LinkedIn">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5V13.2a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.75a1.63 1.63 0 0 0-1.63 1.63a1.64 1.64 0 0 0 1.63 1.64a1.64 1.64 0 0 0 1.63-1.64a1.63 1.63 0 0 0-1.63-1.63Z"/></svg>
                      </a>
                    }
                    @if (member.twitter) {
                      <a [href]="member.twitter" target="_blank" rel="noopener noreferrer" class="text-[#80899D] hover:text-[#0000FE] transition-colors" aria-label="Twitter">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23Z"/></svg>
                      </a>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>
    }

    <!-- Final CTA Section (Dark Variant) -->
    <app-call-to-action-section variant="dark"></app-call-to-action-section>
  `
})
export class CompanyPageComponent {
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly destroyRef = inject(DestroyRef);

    stats = ABOUT_STATS;

    readonly teamMembers = signal<any[]>([]);

    readonly values : readonly CompanyValue[] = [
        {
            title: 'Etibarlılıq',
            description: 'Müştərilərimizə yüksək təhlükəsizlik və davamlılıq təmin edən stabil İT infrastrukturu qururuq.'
        }, {
            title: 'İnnovasiya',
            description: 'Daim yenilənən texnologiyalarla iş proseslərinizi optimallaşdırır, daha sürətli və çevik həllər təqdim edirik.'
        }, {
            title: 'Effektivlik',
            description: 'Resurslarınızı maksimum səmərəli idarə etməyə imkan verən intellektual İT həlləri ilə iş yükünüzü azaldırıq.'
        }, {
            title: 'Məqsədimiz',
            description: 'Müştərilərimizin rəqəmsal dünyada fərqlənməsinə, böyüməsinə və rəqabət üstünlüyü qazanmasına dəstək olmaqdır.'
        }
    ];

    readonly valueCards : readonly CompanyValueCard[] = [
        {
            title: 'Müştəriyönümlülük',
            description: 'Biznesiniz üçün fərdi həllər! Müştərilərimizin ehtiyaclarını dərindən anlayır, onların uğuruna doğru gedən yolu asanlaşdırırıq. Hər bir həllimizi fərdi və ehtiyaclarınıza uyğun şəkildə formalaşdırırıq.',
            icon: 'assets/icons/about1.svg',
            iconBackground: '#E9F9F1'
        }, {
            title: 'İnnovasiya',
            description: 'Gələcəyi indidən qururuq! Biz daim ən son texnoloji yenilikləri araşdırır və tətbiq edirik. Müştərilərimizə çevik, müasir və effektiv həllər təqdim edərək, onların rəqəmsal dünyada liderliyini təmin edirik.',
            icon: 'assets/icons/about2.svg',
            iconBackground: '#F3E8FF'
        }, {
            title: 'Etibar və keyfiyyət',
            description: 'Bizə güvənənlər qazanır! Hər layihəyə maksimum məsuliyyət və peşəkarlıqla yanaşırıq. Yüksək keyfiyyət və vaxtında icra edilən xidmətlərimizlə biznesiniz üçün etibarlı tərəfdaş oluruq.',
            icon: 'assets/icons/about3.svg',
            iconBackground: '#FFF7E6'
        }, {
            title: 'Komanda işi',
            description: 'Birlikdə daha güclüyük! Bizim uğurumuz peşəkar və sadiq komandamızdır. Güclü əməkdaşlıq ruhu ilə müştərilərimizin uğurunu təmin edərək, daha böyük hədəflərə birlikdə çatırıq.',
            icon: 'assets/icons/about4.svg',
            iconBackground: '#E6F6FF'
        }
    ];

    readonly companyFacts : readonly CompanyFact[] = [
        {
            title: 'Missiyamız',
            description: 'Bizim missiyamız — müştərilərimizə yüksək etibarlı, innovativ və effektiv İT həlləri təqdim edərək onların fəaliyyətini daha təhlükəsiz, səmərəli və gələcəyə hazır vəziyyətə gətirməkdir. Biz texnologiya ilə bizneslərin böyüməsinə və rəqabət üstünlüyü əldə etməsinə zəmanət veririk.'
        }, {
            title: 'Vizyonumuz',
            description: 'QAFQAZNET olaraq, texnologiyanın gələcəyini açan kimi görür və daim yenilikləri ön planda tuturuq.'
        }, {
            title: 'Hədəfimiz',
            description: 'Azərbaycanda və regionda İT sektorunda liderliyimizi gücləndirmək, müştərilərimizə qabaqcıl texnologiyalar və premium xidmətlər təqdim etməkdir.'
        }
    ];

    constructor() {
        this.languageService.locale$.pipe(
            switchMap(() => this.apiService.getTeam().pipe(
                catchError(() => of(null))
            )),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((res: any) => {
            const list = Array.isArray(res) ? res : (res && res.data ? res.data : []);
            if (list && list.length > 0) {
                this.teamMembers.set(list);
            }
        });
    }
}
