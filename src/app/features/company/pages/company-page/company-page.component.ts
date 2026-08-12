import { ChangeDetectionStrategy, Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';
import { StatisticCardComponent } from '../../../../shared/ui/statistic-card/statistic-card.component';
import { ABOUT_STATS, AboutStatistic } from '../../../../core/constants/mock-data';
import { CallToActionSectionComponent } from '../../../home/components/call-to-action-section/call-to-action-section.component';
import { PublicApiService } from '../../../../core/services/public-api.service';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';

import { TooltipDirective } from '../../../../shared/ui/tooltip/tooltip.directive';

interface CompanyValue {
  readonly title: string;
  readonly description: string;
}

interface CompanyValueCard {
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string | null;
  readonly iconBackground?: string;
}

interface CompanyFact {
  readonly title: string;
  readonly description: string;
}

const INITIAL_VALUES: ReadonlyArray<CompanyValue> = [
  {
    title: 'Etibarlılıq',
    description: 'Müştərilərimizə yüksək təhlükəsizlik və davamlılıq təmin edən stabil İT infrastrukturu qururuq.'
  },
  {
    title: 'İnnovasiya',
    description: 'Daim yenilənən texnologiyalarla iş proseslərinizi optimallaşdırır, daha sürətli və çevik həllər təqdim edirik.'
  },
  {
    title: 'Effektivlik',
    description: 'Resurslarınızı maksimum səmərəli idarə etməyə imkan verən intellektual İT həlləri ilə iş yükünüzü azaldırıq.'
  },
  {
    title: 'Məqsədimiz',
    description: 'Müştərilərimizin rəqəmsal dünyada fərqlənməsinə, böyüməsinə və rəqabət üstünlüyü qazanmasına dəstək olmaqdır.'
  }
];

const INITIAL_VALUE_CARDS: ReadonlyArray<CompanyValueCard> = [
  {
    title: 'Müştəriyönümlülük',
    description: 'Biznesiniz üçün fərdi həllər! Müştərilərimizin ehtiyaclarını dərindən anlayır, onların uğuruna doğru gedən yolu asanlaşdırırıq. Hər bir həllimizi fərdi və ehtiyaclarınıza uyğun şəkildə formalaşdırırıq.',
    imageUrl: null,
    iconBackground: '#E9F9F1'
  },
  {
    title: 'İnnovasiya',
    description: 'Gələcəyi indidən qururuq! Biz daim ən son texnoloji yenilikləri araşdırır və tətbiq edirik. Müştərilərimizə çevik, müasir və effektiv həllər təqdim edərək, onların rəqəmsal dünyada liderliyini təmin edirik.',
    imageUrl: null,
    iconBackground: '#F3E8FF'
  },
  {
    title: 'Etibar və keyfiyyət',
    description: 'Bizə güvənənlər qazanır! Hər layihəyə maksimum məsuliyyət və peşəkarlıqla yanaşırıq. Yüksək keyfiyyət və vaxtında icra edilən xidmətlərimizlə biznesiniz üçün etibarlı tərəfdaş oluruq.',
    imageUrl: null,
    iconBackground: '#FFF7E6'
  },
  {
    title: 'Komanda işi',
    description: 'Birlikdə daha güclüyük! Bizim uğurumuz peşəkar və sadiq komandamızdır. Güclü əməkdaşlıq ruhu ilə müştərilərimizin uğurunu təmin edərək, daha böyük hədəflərə birlikdə çatırıq.',
    imageUrl: null,
    iconBackground: '#E6F6FF'
  }
];

const INITIAL_FACTS: ReadonlyArray<CompanyFact> = [
  {
    title: 'Missiyamız',
    description: 'Bizim missiyamız — müştərilərimizə yüksək etibarlı, innovativ və effektiv İT həlləri təqdim edərək onların fəaliyyətini daha təhlükəsiz, səmərəli və gələcəyə hazır vəziyyətə gətirməkdir. Biz texnologiya ilə bizneslərin böyüməsinə və rəqabət üstünlüyü əldə etməsinə zəmanət veririk.'
  },
  {
    title: 'Vizyonumuz',
    description: 'QAFQAZNET olaraq, texnologiyanın gələcəyini açan kimi görür və daim yenilikləri ön planda tuturuq.'
  },
  {
    title: 'Hədəfimiz',
    description: 'Azərbaycanda və regionda İT sektorunda liderliyimizi gücləndirmək, müştərilərimizə qabaqcıl texnologiyalar və premium xidmətlər təqdim etməkdir.'
  }
];

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [
    CommonModule, RevealDirective, StatisticCardComponent, CallToActionSectionComponent, TooltipDirective
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
          {{ heroTitle() }}
        </h1>

        <!-- Main Description -->
        <p 
          appReveal revealDirection="up" [revealDelay]="100"
          class="max-w-[1000px] mx-auto font-bdo font-medium text-[22px] md:text-[27px] lg:text-[32px] leading-[30px] md:leading-[34px] lg:leading-[38px] tracking-normal text-center text-[#0A1642] mb-20 lg:mb-32"
        >
          {{ heroBody() }}
        </p>

        <!-- Values Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          @for (value of values(); track value.title; let i = $index) {
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
          {{ valuesSectionTitle() }}
        </h2>
        
        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (card of valueCards(); track card.title || $index; let i = $index) {
            <div 
              appReveal revealDirection="up" [revealDelay]="100 + (i * 100)"
              class="w-full lg:w-[282px] min-h-[338px] rounded-[20px] bg-[#F7F9FC] p-[32px] flex flex-col gap-[10px]"
            >
              <div 
                class="w-[56px] h-[56px] rounded-[12px] p-[12px] flex items-center justify-center mb-4 shadow-sm"
                [style.backgroundColor]="card.iconBackground"
              >
                @if (card.imageUrl) {
                  <img [src]="card.imageUrl" alt="" class="w-[32px] h-[32px] object-contain">
                }
              </div>
              
              <h3 
                class="font-bdo font-medium text-[20px] leading-[28px] text-[#0A1642] m-0 truncate w-full cursor-default"
                [appTooltip]="card.title"
              >
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
          {{ keyFactsSectionTitle() }}
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-[576px_1fr] gap-10 lg:gap-16 items-stretch">
          <!-- Left Information Card -->
          <div 
            appReveal revealDirection="left" [revealDelay]="100"
            class="w-full h-full bg-[#FFFFFF] rounded-[24px] p-[32px] md:p-[44px] flex flex-col justify-between gap-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]"
          >
            @for (fact of companyFacts(); track fact.title; let i = $index) {
              <div class="flex flex-col gap-2">
                <h3 
                  class="font-bdo font-bold text-[20px] leading-[30px] text-[#0A1642] m-0 truncate w-full cursor-default"
                  [appTooltip]="fact.title"
                >
                  {{ fact.title }}
                </h3>
                <p 
                  class="font-bdo font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#80899D] m-0 line-clamp-3 cursor-default"
                  [appTooltip]="fact.description"
                >
                  {{ fact.description }}
                </p>
              </div>
              @if (i < companyFacts().length - 1) {
                <hr class="border-t border-[#E5E7EB] w-full my-1">
              }
            }
          </div>

          <!-- Right Statistic Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-full items-stretch">
            <!-- Column 1 -->
            <div class="flex flex-col gap-4 sm:gap-6 justify-between h-full">
              <!-- Card 1: Layihə (Taller) -->
              @if (orderedStats()[0]) {
                <div appReveal revealDirection="up" [revealDelay]="150" class="flex-1 flex flex-col min-h-[200px] sm:min-h-[220px]">
                  <app-statistic-card [stat]="orderedStats()[0]"></app-statistic-card>
                </div>
              }
              <!-- Card 2: Təcrübə (Shorter) -->
              @if (orderedStats()[1]) {
                <div appReveal revealDirection="up" [revealDelay]="250" class="flex flex-col min-h-[130px] sm:min-h-[140px]">
                  <app-statistic-card [stat]="orderedStats()[1]"></app-statistic-card>
                </div>
              }
            </div>

            <!-- Column 2 -->
            <div class="flex flex-col gap-4 sm:gap-6 justify-between h-full">
              <!-- Card 3: Tərəfdaş (Taller) -->
              @if (orderedStats()[2]) {
                <div appReveal revealDirection="up" [revealDelay]="350" class="flex-1 flex flex-col min-h-[200px] sm:min-h-[220px]">
                  <app-statistic-card [stat]="orderedStats()[2]"></app-statistic-card>
                </div>
              }
              <!-- Card 4: Müştəri (Shorter) -->
              @if (orderedStats()[3]) {
                <div appReveal revealDirection="up" [revealDelay]="450" class="flex flex-col min-h-[130px] sm:min-h-[140px]">
                  <app-statistic-card [stat]="orderedStats()[3]"></app-statistic-card>
                </div>
              }
            </div>
          </div>
        </div>
        
      </div>
    </section>

    <!-- Final CTA Section (Dark Variant) -->
    <app-call-to-action-section variant="dark"></app-call-to-action-section>
  `
})
export class CompanyPageComponent {
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly translationService = inject(TranslationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly stats = signal<AboutStatistic[]>([...ABOUT_STATS]);

  readonly orderedStats = computed(() => {
    const list = this.stats();
    if (!list || list.length === 0) return [];

    const layihe = list.find(s => s.label?.toLowerCase().includes('layihə')) || list[0];
    const tecrube = list.find(s => s.label?.toLowerCase().includes('təcrübə')) || list[2] || list[0];
    const terefdas = list.find(s => s.label?.toLowerCase().includes('tərəfdaş')) || list[1] || list[0];
    const musteri = list.find(s => s.label?.toLowerCase().includes('müştəri')) || list[3] || list[0];

    return [layihe, tecrube, terefdas, musteri];
  });
  readonly heroTitle = signal<string>('Haqqımızda');
  readonly heroBody = signal<string>(
    'QAFQAZNET — 2015-ci ildən etibarən bizneslərin inkişafına dəstək olan etibarlı İT tərəfdaşıdır.\nBiz texnologiyanı sadəcə bir vasitə kimi deyil, biznes uğurunun əsas açarı kimi görürük.'
  );
  readonly values = signal<CompanyValue[]>([...INITIAL_VALUES]);
  readonly valuesSectionTitle = signal<string>('Dəyərlərimiz');
  readonly valueCards = signal<CompanyValueCard[]>([...INITIAL_VALUE_CARDS]);
  readonly keyFactsSectionTitle = signal<string>('Əsas faktlar');
  readonly companyFacts = signal<CompanyFact[]>([...INITIAL_FACTS]);

  constructor() {
    this.languageService.locale$.pipe(
      switchMap((locale) => this.apiService.getPageContents('about', locale).pipe(catchError(() => of(null)))),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((pageContent: any) => {
      if (!pageContent?.sections) return;
      const sections = pageContent.sections;

      // 1. Hero
      if (sections.hero) {
        if (sections.hero.title) this.heroTitle.set(sections.hero.title);
        if (sections.hero.body) this.heroBody.set(sections.hero.body);
      }

      // Jumbotron feature columns (Etibarlılıq, İnnovasiya, Effektivlik, Məqsədimiz)
      this.values.update(list => list.map((v, idx) => {
        const featKey = `feature_${idx + 1}`;
        const feat = sections[featKey];
        if (feat) {
          return {
            title: feat.title || v.title,
            description: feat.body || feat.description || v.description
          };
        }
        return v;
      }));

      // 2. Dəyərlərimiz - items mapped using title, description, imageUrl, and sorted by order
      if (sections.values) {
        if (sections.values.title) {
          this.valuesSectionTitle.set(sections.values.title);
        }
        let itemsData = sections.values.items;
        if (typeof itemsData === 'string') {
          try {
            itemsData = JSON.parse(itemsData);
          } catch (e) {
            itemsData = null;
          }
        }
        if (!itemsData && sections.values.body) {
          try {
            itemsData = typeof sections.values.body === 'string'
              ? JSON.parse(sections.values.body)
              : sections.values.body;
          } catch (e) {
            itemsData = null;
          }
        }
        if (Array.isArray(itemsData)) {
          const bgColors = ['#E9F9F1', '#F3E8FF', '#FFF7E6', '#E6F6FF'];
          const sortedItems = [...itemsData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          const mappedCards: CompanyValueCard[] = sortedItems.map((item: any, idx: number) => {
            return {
              title: item.title || '',
              description: item.description || '',
              imageUrl: item.imageUrl || item.image_url || null,
              iconBackground: bgColors[idx % bgColors.length]
            };
          });
          this.valueCards.set(mappedCards);
        }
      }

      // 3. Əsas faktlar
      if (sections.key_facts) {
        if (sections.key_facts.title) {
          this.keyFactsSectionTitle.set(sections.key_facts.title);
        }
        let newFacts: CompanyFact[] = [];
        if (Array.isArray(sections.key_facts.items) && sections.key_facts.items.length > 0) {
          const sorted = [...sections.key_facts.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          newFacts = sorted.map((item: any) => ({
            title: item.title || '',
            description: item.description || ''
          }));
        } else if (sections.key_facts.body) {
          try {
            const rawFacts = typeof sections.key_facts.body === 'string'
              ? JSON.parse(sections.key_facts.body)
              : sections.key_facts.body;
            if (Array.isArray(rawFacts)) {
              rawFacts.forEach((item: any) => {
                if (item.title) {
                  newFacts.push({ title: item.title, description: item.description || '' });
                }
              });
            } else if (rawFacts && typeof rawFacts === 'object') {
              if (rawFacts.mission) {
                newFacts.push({ title: rawFacts.mission.title || 'Missiyamız', description: rawFacts.mission.description || '' });
              }
              if (rawFacts.vision) {
                newFacts.push({ title: rawFacts.vision.title || 'Vizyonumuz', description: rawFacts.vision.description || '' });
              }
              if (rawFacts.goal) {
                newFacts.push({ title: rawFacts.goal.title || 'Hədəfimiz', description: rawFacts.goal.description || '' });
              }
            }
          } catch (e) {}
        }
        if (newFacts.length > 0) {
          this.companyFacts.set(newFacts);
        }
      }

      // 4. Stats
      const rawStats = Array.isArray(sections.stats?.items) && sections.stats.items.length > 0
        ? [...sections.stats.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        : (sections.stats?.body ? (typeof sections.stats.body === 'string' ? JSON.parse(sections.stats.body) : sections.stats.body) : ABOUT_STATS);

      if (Array.isArray(rawStats) && rawStats.length > 0) {
        try {
          const defaultStats = ABOUT_STATS;
          const updatedStats: AboutStatistic[] = rawStats.map((item: any, idx: number) => {
            const defaultStat = defaultStats[idx] || defaultStats[0];
            const rawVal = item.numericValue != null && item.numericValue !== ''
              ? String(item.numericValue)
              : (item.value != null ? String(item.value) : String(defaultStat.value));

            const numMatch = rawVal.match(/\d+/);
            const num = numMatch ? parseInt(numMatch[0], 10) : 0;
            const seq = num > 0
              ? [num, Math.round(num * 0.8), Math.round(num * 0.6), Math.round(num * 0.4), Math.round(num * 0.2), 1]
              : defaultStat.animationSequence;

            return {
              ...defaultStat,
              value: rawVal,
              showPlus: false,
              suffix: '',
              animationSequence: seq,
              label: item.title || item.label || defaultStat.label || '',
              description: item.description !== undefined ? item.description : defaultStat.description
            };
          });
          this.stats.set(updatedStats);
        } catch (e) {}
      }
    });
  }
}
