import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';

export interface ServiceAudience {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-service-audience-section',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-16 sm:py-24 lg:py-28 bg-[#F7F9FC]">
      <div class="container-main">
        <!-- Section Title -->
        @if (title()) {
          <h2
            appReveal
            revealDirection="up"
            [revealDelay]="0"
            class="font-bdo font-bold text-[32px] sm:text-[48px] lg:text-[60px] leading-[1.15] lg:leading-[60px] text-[#0A1642] tracking-normal mb-8 sm:mb-12 text-left"
          >
            {{ title() }}
          </h2>
        }

        <!-- Text-Only Audience Boxes -->
        <div class="flex flex-wrap items-stretch gap-3 sm:gap-4">
          @for (item of items(); track $index; let i = $index) {
            <div
              appReveal
              revealDirection="up"
              [revealDelay]="i * 40"
              class="w-full sm:w-auto bg-white rounded-[12px] px-6 py-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] flex items-center justify-start min-h-[54px]"
            >
              <span
                class="font-bdo font-normal text-[15px] sm:text-[16px] leading-[1.3] text-[#0A1642] text-left"
              >
                {{ item }}
              </span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServiceAudienceSectionComponent {
  readonly title = input<string>('Kimlər faydalana bilər?');
  readonly items = input<string[]>([]);
}
