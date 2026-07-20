import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ABOUT_STATS} from '../../../../core/constants/mock-data';
import {StatisticCardComponent} from '../../../../shared/ui/statistic-card/statistic-card.component';
import {CommonModule} from '@angular/common';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';

@Component({
    selector: 'app-about-section',
    standalone: true,
    imports: [
        CommonModule, StatisticCardComponent, RevealDirective
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
                  Rəqəmsal inkişafınız üçün ağıllı İT həlləri
                </span>
              </div>
              
              <h2 appReveal revealDirection="left" [revealDelay]="150" class="text-[24px] sm:text-[32px] md:text-[36px] leading-[1.3] font-bold font-bdo text-[#0A1642] tracking-normal">
                <span class="uppercase">QAFQAZNET 2015-Cİ İLDƏN ETİBARƏN</span> bizneslərin inkişafına dəstək olan 
                etibarlı İT tərəfdaşıdır.<br class="hidden md:block">
                Biz texnologiyanı sadəcə bir<br class="hidden md:block">
                vasitə kimi deyil, biznes<br class="hidden md:block">
                uğurunun əsas açarı kimi görürük.
              </h2>
            </div>

            <!-- Statistic Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
              <div class="flex flex-col gap-4 sm:gap-6">
                <div appReveal revealDirection="up" [revealDelay]="150">
                  <app-statistic-card [stat]="stats[0]"></app-statistic-card>
                </div>
                <div appReveal revealDirection="up" [revealDelay]="250">
                  <app-statistic-card [stat]="stats[1]"></app-statistic-card>
                </div>
              </div>
              <div class="flex flex-col gap-4 sm:gap-6">
                <div appReveal revealDirection="up" [revealDelay]="350">
                  <app-statistic-card [stat]="stats[2]"></app-statistic-card>
                </div>
                <div appReveal revealDirection="up" [revealDelay]="450">
                  <app-statistic-card [stat]="stats[3]"></app-statistic-card>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Image Area (Hidden on mobile & tablet, shown on lg screens) -->
          <div appReveal revealDirection="right" [revealDelay]="300" class="hidden lg:block relative w-full lg:w-[454px] aspect-[454/676] rounded-[40px] overflow-hidden lg:mt-[65px] shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <img src="assets/backgrounds/aboutImg.png" alt="QafqazNet office team" class="w-full h-full object-cover">
          </div>
          
        </div>
      </div>
    </section>
  `
})
export class AboutSectionComponent {
    stats = ABOUT_STATS;
}
