import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';

interface TrustedCompanyLogo {
    readonly src: string;
    readonly alt: string;
}

@Component({
    selector: 'app-call-to-action-section',
    standalone: true,
    imports: [ButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="py-20 lg:py-32 relative overflow-hidden flex items-center justify-center bg-white bg-cover bg-center" style="background-image: url('assets/backgrounds/surveyBackgroundImg.png');">
      <div class="container-main relative z-10 w-full flex flex-col items-center">
        
        <h2 class="text-[#0A1642] font-bdo font-semibold text-[36px] md:text-[48px] lg:text-[60px] leading-[1.2] lg:leading-[76px] text-center mb-4 max-w-[800px]">
          Rəqəmsal həllərinizə buradan bizimlə başlayın
        </h2>
        
        <p class="text-[#80899D] font-bdo font-normal text-[20px] lg:text-[24px] leading-[32px] text-center max-w-[800px] mb-12">
          Müasir texnologiyalar və təcrübəli komanda ilə rəqəmsal transformasiyanızı sürətləndiririk.
        </p>
        
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          
          <app-button variant="gradient" size="hero" trailingIcon="assets/icons/right.svg" customClass="w-full md:w-auto">
            Sorğu göndər
          </app-button>
          
          <a href="#" class="flex items-center w-full md:w-[360px] h-[64px] rounded-[12px] gap-[12px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] border border-[#F7F9FC] bg-[#0000FE] backdrop-blur-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0000FE] hover:bg-[#0000FE]/90 transition-colors duration-300">
            <div class="flex items-center">
              @for (logo of trustLogos; track logo.src; let i = $index) {
                <img [src]="logo.src" [alt]="logo.alt" class="w-[38px] h-[38px] rounded-full border border-white object-cover" [style.marginLeft]="i === 0 ? '0' : '-12px'">
              }
            </div>
            
            <span class="font-bdo text-white font-medium text-[15px] whitespace-nowrap">
              100+ şirkət güvənlə bizi seçir
            </span>
          </a>
          
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
