import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ABOUT_STATS} from '../../../../core/constants/mock-data';
import {StatisticCardComponent} from '../../../../shared/ui/statistic-card/statistic-card.component';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-about-section',
    standalone: true,
    imports: [
        CommonModule, StatisticCardComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="py-20 lg:py-32 bg-surface">
      <div class="container-main">
        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_454px] gap-16 lg:gap-24 items-start">
          
          <!-- Left Content Area -->
          <div class="flex flex-col gap-12">
            
            <!-- Badge and Heading -->
            <div class="flex flex-col items-start gap-6">
              <div class="inline-flex items-center gap-2 bg-white rounded-[7px] px-4 min-h-[32px] shadow-sm">
                <img src="assets/icons/aboutIcon.svg" alt="" class="w-5 h-5 object-contain">
                <span class="text-[16px] text-[#0A1642] leading-[20px] font-normal m-0 tracking-normal align-middle mt-[2px]">
                  Rəqəmsal inkişafınız üçün ağıllı İT həlləri
                </span>
              </div>
              
              <h2 class="text-[28px] md:text-[36px] leading-[1.3] font-bold text-[#0A1642] tracking-normal">
                <span class="uppercase">QAFQAZNET 2015-Cİ İLDƏN ETİBARƏN</span> bizneslərin inkişafına dəstək olan 
                etibarlı İT tərəfdaşıdır.<br class="hidden md:block">
                Biz texnologiyanı sadəcə bir<br class="hidden md:block">
                vasitə kimi deyil, biznes<br class="hidden md:block">
                uğurunun əsas açarı kimi görürük.
              </h2>
            </div>

            <!-- Statistic Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div class="flex flex-col gap-6">
                <app-statistic-card [stat]="stats[0]"></app-statistic-card>
                <app-statistic-card [stat]="stats[1]"></app-statistic-card>
              </div>
              <div class="flex flex-col gap-6 ">
                <app-statistic-card [stat]="stats[2]"></app-statistic-card>
                <app-statistic-card [stat]="stats[3]"></app-statistic-card>
              </div>
            </div>

          </div>

          <!-- Right Image Area -->
          <div class="relative w-full lg:w-[454px] aspect-[454/676] rounded-[40px] overflow-hidden mt-8 lg:mt-[65px]  shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
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
