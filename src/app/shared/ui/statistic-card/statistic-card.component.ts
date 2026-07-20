import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutStatistic} from '../../../core/constants/mock-data';
import {AnimatedNumberComponent} from '../animated-number/animated-number.component';

@Component({
    selector: 'app-statistic-card',
    standalone: true,
    imports: [CommonModule, AnimatedNumberComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5 sm:p-8 flex flex-col justify-start h-full min-h-[160px] md:min-h-[190px]"
         [ngClass]="{'md:min-h-[360px]': stat().size === 'large'}">
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
      
      <hr class="border-t border-border w-full mt-4 sm:mt-6 mb-4 sm:mb-5">

      <span class="text-[18px] sm:text-[20px] leading-[28px] sm:leading-[38px] font-normal font-bdo text-[#0A1642] align-middle">
        {{ stat().label }}
      </span>

      @if (stat().description) {
        <p class="text-[14px] sm:text-[16px] leading-[1.35] text-[#80899D] font-normal font-bdo mt-2 whitespace-normal break-words">
          {{ stat().description }}
        </p>
      }
    </div>
  `,
    styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class StatisticCardComponent {
    stat = input.required<AboutStatistic>();
}
