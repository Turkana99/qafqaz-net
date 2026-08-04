import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceItem } from '../../../core/constants/mock-data';
import { RevealDirective } from '../reveal/reveal.directive';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      appReveal
      revealDirection="up"
      [revealDelay]="revealDelay()"
      [routerLink]="['/services', service().slug]"
      class="group service-card-hover block w-full h-[280px] sm:h-[300px] rounded-[20px] sm:rounded-[24px] pt-6 sm:pt-8 pr-6 sm:pr-8 pb-6 sm:pb-8 pl-6 sm:pl-[31px] bg-[#F7F9FC] flex flex-col justify-start transition-transform duration-300 ease-in hover:-translate-y-[10px] hover:scale-[1.02] focus-within:-translate-y-[10px] focus-within:scale-[1.02] outline-none motion-reduce:transition-none motion-reduce:transform-none overflow-hidden"
    >
      <!-- Icon Row -->
      <div class="flex items-start justify-between mb-4 sm:mb-6 shrink-0">
        <!-- Left Icon Box -->
        @if (service().iconUrl || service().icon) {
          <div
            class="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-[12px] bg-white flex items-center justify-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)]"
          >
            <img
              [src]="service().iconUrl || service().icon"
              alt=""
              aria-hidden="true"
              class="h-5 w-5 sm:h-6 sm:w-6 object-contain"
            />
          </div>
        }

        <!-- Right Hover Icon Box -->
        <div
          class="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-[12px] bg-white flex items-center justify-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] opacity-0 scale-95 transition-all duration-300 ease-in group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 motion-reduce:transition-none motion-reduce:scale-100"
        >
          <img
            src="/assets/icons/serviceRightIcon.svg"
            alt=""
            aria-hidden="true"
            class="h-5 w-5 sm:h-6 sm:w-6 object-contain"
          />
        </div>
      </div>

      <!-- Title -->
      <h3
        [title]="service().title"
        class="text-[18px] sm:text-[20px] leading-[22px] sm:leading-[24px] font-bold font-bdo text-[#0A1642] group-hover:text-[#0000FE] group-focus-within:text-[#0000FE] transition-colors duration-300 ease-in mb-2 sm:mb-3 line-clamp-2 shrink-0"
      >
        {{ service().title }}
      </h3>

      <!-- Description -->
      <p
        [title]="service().shortDescription || service().description || ''"
        class="text-[14px] leading-[18px] font-normal font-bdo text-[#80899D] m-0 line-clamp-4 overflow-hidden"
      >
        {{ service().shortDescription || service().description }}
      </p>
    </a>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class ServiceCardComponent {
  service = input.required<any>();
  revealDelay = input<number>(0);
}

