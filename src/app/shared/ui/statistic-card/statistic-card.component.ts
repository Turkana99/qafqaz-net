import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutStatistic} from '../../../core/constants/mock-data';

@Component({
    selector: 'app-statistic-card',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 flex flex-col justify-start h-full min-h-[190px]"
         [ngClass]="{'md:min-h-[360px]': stat().size === 'large'}">
      <div class="flex items-center">
        <span class="text-[48px] leading-[50px] font-bold text-[#0A1642]">
          {{ stat().value }}
        </span>
        @if (stat().suffix) {
          <span class="text-[48px] leading-[50px] font-bold text-[#0A1642] ml-3">
            {{ stat().suffix }}
          </span>
        }
        @if (stat().showPlus) {
          <span class="text-[48px] leading-[50px] font-bold text-accent-green ml-3">
            +
          </span>
        }
      </div>
      
      <hr class="border-t border-border w-full mt-6 mb-5">

      <span class="text-[20px] leading-[38px] font-normal text-[#0A1642] align-middle">
        {{ stat().label }}
      </span>

      @if (stat().description) {
        <p class="text-[16px] leading-[1.35] text-[#80899D] font-normal  mt-2 whitespace-normal break-words">
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
