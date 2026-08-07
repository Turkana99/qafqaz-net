import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ABOUT_STATS, AboutStatistic } from '../../../../core/constants/mock-data';
import { StatisticCardComponent } from '../../../../shared/ui/statistic-card/statistic-card.component';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';
import { TooltipDirective } from '../../../../shared/ui/tooltip/tooltip.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [
    CommonModule, StatisticCardComponent, RevealDirective, TooltipDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-12 sm:py-20 lg:py-32 bg-surface">
      <div class="container-main">
        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_454px] gap-10 lg:gap-24 items-start">
          
          <!-- Left Content Area -->
          <div class="flex flex-col gap-8 sm:gap-12">
            
            <!-- Badge and Heading -->
            <div class="flex flex-col items-center lg:items-start gap-4 sm:gap-6 text-center lg:text-left">
              <div appReveal revealDirection="left" [revealDelay]="0" class="inline-flex items-center gap-2 bg-white rounded-[7px] px-3 sm:px-4 py-1.5 min-h-[32px] shadow-sm max-w-full mx-auto lg:mx-0">
                <img src="assets/icons/aboutIcon.svg" alt="" class="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0">
                <span class="text-[14px] sm:text-[16px] text-[#0A1642] leading-[20px] font-normal font-bdo m-0 tracking-normal align-middle mt-[1px]">
                  {{ subtitle || 'Rəqəmsal inkişafınız üçün ağıllı İT həlləri' }}
                </span>
              </div>
              
              <h2 appReveal revealDirection="left" [revealDelay]="150" class="text-[24px] sm:text-[32px] md:text-[36px] leading-[1.3] font-bold font-bdo text-[#0A1642] tracking-normal">
                {{ title || keyFactsTitle || 'Əsas faktlar' }}
              </h2>
            </div>

            @if (body) {
              <div appReveal revealDirection="left" [revealDelay]="180" class="font-bdo font-normal text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px] text-[#80899D] m-0" [innerHTML]="body"></div>
            }

            <!-- Key Facts Left Details -->
            @if (companyFacts && companyFacts.length > 0) {
              <div appReveal revealDirection="left" [revealDelay]="200" class="flex flex-col gap-4 bg-white rounded-[24px] p-6 sm:p-8 shadow-sm">
                @for (fact of companyFacts; track fact.title; let i = $index) {
                  <div class="flex flex-col gap-1">
                    <h3 
                      class="font-bdo font-bold text-[18px] sm:text-[20px] text-[#0A1642] m-0 truncate w-full cursor-default"
                      [appTooltip]="fact.title"
                    >
                      {{ fact.title }}
                    </h3>
                    <p 
                      class="font-bdo font-normal text-[14px] sm:text-[16px] leading-[24px] text-[#80899D] m-0 line-clamp-3 cursor-default"
                      [appTooltip]="fact.description"
                    >
                      {{ fact.description }}
                    </p>
                  </div>
                  @if (i < companyFacts.length - 1) {
                    <hr class="border-t border-[#EBF0F7] my-2">
                  }
                }
              </div>
            } @else if (content?.title; as title) {
              <h2 appReveal revealDirection="left" [revealDelay]="150" [innerHTML]="title" class="text-[24px] sm:text-[32px] md:text-[36px] leading-[1.3] font-bold font-bdo text-[#0A1642] tracking-normal"></h2>
            }

            <!-- Statistic Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
              <!-- Column 1 -->
              <div class="flex flex-col gap-4 sm:gap-6 justify-between">
                <!-- Card 1: Taller -->
                @if (effectiveStats[0]) {
                  <div appReveal revealDirection="up" [revealDelay]="150" class="flex-1 flex flex-col min-h-[200px] sm:min-h-[220px]">
                    <app-statistic-card [stat]="effectiveStats[0]"></app-statistic-card>
                  </div>
                }
                <!-- Card 2: Shorter -->
                @if (effectiveStats[1]) {
                  <div appReveal revealDirection="up" [revealDelay]="250" class="flex flex-col min-h-[130px] sm:min-h-[140px]">
                    <app-statistic-card [stat]="effectiveStats[1]"></app-statistic-card>
                  </div>
                }
              </div>

              <!-- Column 2 -->
              <div class="flex flex-col gap-4 sm:gap-6 justify-between">
                <!-- Card 3: Shorter -->
                @if (effectiveStats[2]) {
                  <div appReveal revealDirection="up" [revealDelay]="350" class="flex flex-col min-h-[130px] sm:min-h-[140px]">
                    <app-statistic-card [stat]="effectiveStats[2]"></app-statistic-card>
                  </div>
                }
                <!-- Card 4: Taller -->
                @if (effectiveStats[3]) {
                  <div appReveal revealDirection="up" [revealDelay]="450" class="flex-1 flex flex-col min-h-[200px] sm:min-h-[220px]">
                    <app-statistic-card [stat]="effectiveStats[3]"></app-statistic-card>
                  </div>
                }
              </div>
            </div>

          </div>

          <!-- Right Image Area (Hidden on mobile & tablet, shown on lg screens) -->
          <div appReveal revealDirection="right" [revealDelay]="300" class="hidden lg:block relative w-full lg:w-[454px] aspect-[454/676] rounded-[40px] overflow-hidden lg:mt-[65px] shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <img [src]="imageUrl || 'assets/backgrounds/aboutImg.png'" alt="QafqazNet office team" class="w-full h-full object-cover">
          </div>
          
        </div>
      </div>
    </section>
  `
})
export class AboutSectionComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() body?: string;
  @Input() imageUrl?: string;
  @Input() content?: any;
  @Input() stats?: AboutStatistic[];
  @Input() keyFactsTitle?: string;
  @Input() companyFacts: { title: string; description: string }[] = [];

  get effectiveStats(): AboutStatistic[] {
    const list = this.stats;
    const statsList = (list && list.length > 0) ? list : ABOUT_STATS;
    return statsList.map((item, idx) => {
      const defaultStat = ABOUT_STATS[idx] || ABOUT_STATS[0];
      const rawVal = item.value != null ? String(item.value) : String(defaultStat.value);
      const numMatch = rawVal.match(/\d+/);
      const num = numMatch ? parseInt(numMatch[0], 10) : 0;
      const seq = item.animationSequence || (num > 0
        ? [num, Math.round(num * 0.8), Math.round(num * 0.6), Math.round(num * 0.4), Math.round(num * 0.2), 1]
        : defaultStat.animationSequence);

      return {
        ...defaultStat,
        ...item,
        value: rawVal,
        showPlus: false,
        suffix: '',
        animationSequence: seq
      };
    });
  }
}

