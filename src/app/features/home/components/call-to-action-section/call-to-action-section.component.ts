import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';

export type CallToActionVariant = 'light' | 'dark';

interface TrustedCompanyLogo {
  readonly src: string;
  readonly alt: string;
}

@Component({
  selector: 'app-call-to-action-section',
  standalone: true,
  imports: [ButtonComponent, RevealDirective, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      [class]="sectionClass()"
      [style.backgroundImage]="
        variant() === 'light' ? 'url(assets/backgrounds/surveyBackgroundImg.png)' : 'none'
      "
    >
      <div class="container-main relative z-10 w-full flex flex-col items-center">
        <!-- Mobile: Trust Button -->
        <div
          appReveal
          revealDirection="up"
          [revealDelay]="0"
          class="order-1 mb-6 w-full flex justify-center md:hidden"
        >
          <a href="#" [class]="trustButtonClass()" [style]="trustButtonStyle()">
            <div class="flex items-center shrink-0">
              @for (logo of trustLogos; track logo.src; let i = $index) {
                <img
                  [src]="logo.src"
                  [alt]="logo.alt"
                  class="w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] rounded-full border border-white object-cover"
                  [style.marginLeft]="i === 0 ? '0' : '-8px'"
                />
              }
            </div>

            <span
              class="font-bdo text-white font-medium text-[13px] sm:text-[15px] whitespace-nowrap"
            >
              100+ şirkət güvənlə bizi seçir
            </span>
          </a>
        </div>

        <!-- Main Title -->
        <h2 appReveal revealDirection="up" [revealDelay]="100" [class]="titleClass()">
          Rəqəmsal həllərinizə buradan<br class="hidden sm:block" />
          bizimlə başlayın
        </h2>

        <!-- Description -->
        <p appReveal revealDirection="up" [revealDelay]="150" [class]="descriptionClass()">
          Müasir texnologiyalar və təcrübəli komanda ilə rəqəmsal transformasiyanızı
          sürətləndiririk.
        </p>

        <!-- Buttons Row (Desktop & Mobile Request Button) -->
        <div
          appReveal
          revealDirection="up"
          [revealDelay]="200"
          class="order-4 md:order-3 w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-2 md:mt-4"
        >
          <!-- Request Button -->
          <div class="w-full md:w-auto flex justify-center">
            <app-button
              variant="gradient"
              size="hero"
              routerLink="/contact"
              trailingIcon="assets/icons/right.svg"
              customClass="w-full md:w-[203px]"
            >
              Sorğu göndər
            </app-button>
          </div>

          <!-- Trust Button (Desktop Instance) -->
          <div class="hidden md:flex w-full md:w-[360px] justify-center">
            <a href="#" [class]="trustButtonClass()" [style]="trustButtonStyle()">
              <div class="flex items-center shrink-0">
                @for (logo of trustLogos; track logo.src; let i = $index) {
                  <img
                    [src]="logo.src"
                    [alt]="logo.alt"
                    class="w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] rounded-full border border-white object-cover"
                    [style.marginLeft]="i === 0 ? '0' : '-8px'"
                  />
                }
              </div>

              <span
                class="font-bdo text-white font-medium text-[13px] sm:text-[15px] whitespace-nowrap"
              >
                100+ şirkət güvənlə bizi seçir
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CallToActionSectionComponent {
  variant = input<CallToActionVariant>('light');

  readonly trustLogos: readonly TrustedCompanyLogo[] = [
    { src: 'assets/logos/survey1.svg', alt: 'Company 1' },
    { src: 'assets/logos/survey2.svg', alt: 'Company 2' },
    { src: 'assets/logos/survey3.svg', alt: 'Company 3' },
    { src: 'assets/logos/survey4.svg', alt: 'Company 4' },
  ];

  sectionClass = computed(() => {
    return this.variant() === 'dark'
      ? 'py-12 sm:py-20 lg:py-32 relative overflow-hidden flex items-center justify-center bg-[#0A1642]'
      : 'py-12 sm:py-20 lg:py-32 relative overflow-hidden flex items-center justify-center bg-white bg-cover bg-center';
  });

  titleClass = computed(() => {
    return this.variant() === 'dark'
      ? 'order-2 md:order-1 text-white font-bdo font-semibold text-[22px] sm:text-[48px] lg:text-[50px] leading-[1.2] lg:leading-[60px] text-center mb-3 sm:mb-4 max-w-[800px]'
      : 'order-2 md:order-1 text-[#0A1642] font-bdo font-semibold text-[26px] sm:text-[48px] lg:text-[50px] leading-[1.2] lg:leading-[60px] text-center mb-3 sm:mb-4 max-w-[800px]';
  });

  descriptionClass = computed(() => {
    return this.variant() === 'dark'
      ? 'order-3 md:order-2 text-white font-bdo font-normal text-[16px] sm:text-[20px] lg:text-[20px] leading-[22px] sm:leading-[32px] text-center max-w-[800px] mb-8 md:mb-12'
      : 'order-3 md:order-2 text-[#80899D] font-bdo font-normal text-[16px] sm:text-[20px] lg:text-[20px] leading-[22px] sm:leading-[32px] text-center max-w-[800px] mb-8 md:mb-12';
  });

  trustButtonClass = computed(() => {
    return this.variant() === 'dark'
      ? 'flex items-center justify-center md:justify-start w-full md:w-[360px] h-[56px] sm:h-[64px] rounded-[12px] gap-[12px] px-2 py-2 border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white hover:bg-white/10 transition-colors duration-300'
      : 'flex items-center justify-center md:justify-start w-full md:w-[360px] h-[56px] sm:h-[64px] rounded-[12px] gap-[12px] px-2 py-2 border border-[#F7F9FC] bg-[#0000FE] backdrop-blur-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0000FE] hover:bg-[#0000FE]/90 transition-colors duration-300';
  });

  trustButtonStyle = computed(() => {
    return this.variant() === 'dark'
      ? 'background-color: rgba(4, 6, 29, 0.01); backdrop-filter: blur(70px); -webkit-backdrop-filter: blur(70px);'
      : '';
  });
}
