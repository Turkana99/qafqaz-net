import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutStatistic} from '../../../core/constants/mock-data';
import {AnimatedNumberComponent} from '../animated-number/animated-number.component';
import {TooltipDirective} from '../tooltip/tooltip.directive';

@Component({
    selector: 'app-statistic-card',
    standalone: true,
    imports: [
        CommonModule, AnimatedNumberComponent, TooltipDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5 sm:p-7 flex flex-col justify-between h-full w-full min-h-[160px]">
      <div>
        <div class="flex items-center flex-wrap">
          <span class="text-[36px] sm:text-[48px] leading-[40px] sm:leading-[50px] font-bold font-bdo text-[#0A1642]">
            <app-animated-number [finalValue]="stat().value" [sequence]="stat().animationSequence"></app-animated-number>
          </span>
          @if (stat().suffix) {
            <span class="text-[36px] sm:text-[48px] leading-[40px] sm:leading-[50px] font-bold font-bdo text-[#0A1642] ml-2 sm:ml-3">
              {{ stat().suffix }}
            </span>
          }
          @if (stat().showPlus) {
            <span class="text-[36px] sm:text-[48px] leading-[40px] sm:leading-[50px] font-bold font-bdo text-accent-green ml-2 sm:ml-3">
              +
            </span>
          }
        </div>
        
        <hr class="border-t border-border w-full mt-3 sm:mt-4 mb-3 sm:mb-4">

        <span 
          class="text-[18px] sm:text-[20px] leading-[26px] sm:leading-[30px] font-normal font-bdo text-[#0A1642] block truncate w-full cursor-default"
          [appTooltip]="stat().label"
        >
          {{ stat().label }}
        </span>

        @if (stat().description) {
          <p 
            class="text-[14px] sm:text-[15px] leading-[20px] text-[#80899D] font-normal font-bdo mt-1.5 sm:mt-2 line-clamp-3 cursor-default"
            [appTooltip]="stat().description"
          >
            {{ stat().description }}
          </p>
        }
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      height: 100%;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class StatisticCardComponent {
    stat = input.required<AboutStatistic>();
}
