import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';

interface TrustedCompanyLogo {
    readonly src: string;
    readonly alt: string;
}

@Component({
    selector: 'app-call-to-action-section',
    standalone: true,
    imports: [ButtonComponent, RevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="py-12 sm:py-20 lg:py-32 relative overflow-hidden flex items-center justify-center bg-white bg-cover bg-center" style="background-image: url('assets/backgrounds/surveyBackgroundImg.png');">
      <div class="container-main relative z-10 w-full flex flex-col items-center">
        
        <!-- 1 (Mobile) / 4 (Desktop): Trust Button / Pill Badge -->
        <div appReveal revealDirection="up" [revealDelay]="0" class="order-1 md:order-4 mb-6 md:mb-0 md:mt-12 w-full md:w-[360px] flex justify-center">
          <a href="#" class="flex items-center justify-center md:justify-start w-full md:w-[360px] h-[56px] sm:h-[64px] rounded-[12px] gap-[12px] px-4 py-2 border border-[#F7F9FC] bg-[#0000FE] backdrop-blur-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0000FE] hover:bg-[#0000FE]/90 transition-colors duration-300">
            <div class="flex items-center shrink-0">
              @for (logo of trustLogos; track logo.src; let i = $index) {
                <img [src]="logo.src" [alt]="logo.alt" class="w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] rounded-full border border-white object-cover" [style.marginLeft]="i === 0 ? '0' : '-8px'">
              }
            </div>
            
            <span class="font-bdo text-white font-medium text-[13px] sm:text-[15px] whitespace-nowrap">
              100+ şirkət güvənlə bizi seçir
            </span>
          </a>
        </div>

        <!-- 2 (Mobile) / 1 (Desktop): Main Title -->
        <h2 appReveal revealDirection="up" [revealDelay]="100" class="order-2 md:order-1 text-[#0A1642] font-bdo font-semibold text-[26px] sm:text-[48px] lg:text-[60px] leading-[1.2] lg:leading-[76px] text-center mb-3 sm:mb-4 max-w-[800px]">
          Rəqəmsal həllərinizə buradan bizimlə başlayın
        </h2>
        
        <!-- 3 (Mobile) / 2 (Desktop): Description -->
        <p appReveal revealDirection="up" [revealDelay]="150" class="order-3 md:order-2 text-[#80899D] font-bdo font-normal text-[16px] sm:text-[20px] lg:text-[24px] leading-[26px] sm:leading-[32px] text-center max-w-[800px] mb-8 md:mb-12">
          Müasir texnologiyalar və təcrübəli komanda ilə rəqəmsal transformasiyanızı sürətləndiririk.
        </p>
        
        <!-- 4 (Mobile) / 3 (Desktop): Sorğu göndər Button -->
        <div appReveal revealDirection="up" [revealDelay]="200" class="order-4 md:order-3 w-full md:w-auto flex justify-center">
          <app-button variant="gradient" size="hero" trailingIcon="assets/icons/right.svg" customClass="w-full md:w-[203px]">
            Sorğu göndər
          </app-button>
        </div>

      </div>
    </section>
  `
})
export class CallToActionSectionComponent {
    readonly trustLogos : readonly TrustedCompanyLogo[] = [
        {
            src: 'assets/logos/survey1.svg',
            alt: 'Company 1'
        }, {
            src: 'assets/logos/survey2.svg',
            alt: 'Company 2'
        }, {
            src: 'assets/logos/survey3.svg',
            alt: 'Company 3'
        }, {
            src: 'assets/logos/survey4.svg',
            alt: 'Company 4'
        }
    ];
}
