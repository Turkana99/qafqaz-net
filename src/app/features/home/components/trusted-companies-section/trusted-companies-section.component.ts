import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PARTNERS } from '../../../../core/constants/mock-data';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';
import { LogoMarqueeComponent } from '../../../../shared/ui/logo-marquee/logo-marquee.component';

@Component({
  selector: 'app-trusted-companies-section',
  standalone: true,
  imports: [RevealDirective, LogoMarqueeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-8 md:py-12 bg-white border-b border-border">
      <div class="container-main flex items-center gap-6 md:gap-8">
        <p appReveal revealDirection="left" class="hidden md:block shrink-0 font-bdo font-semibold text-[20px] md:text-[24px] leading-none text-[#0A1642] m-0 whitespace-nowrap">
          100+ şirkət güvənlə bizi seçir
        </p>
        
        <div appReveal revealDirection="right" [revealDelay]="150" class="grow min-w-0 w-full">
          <app-logo-marquee [logos]="partners" [logoHeight]="36" [gap]="48"></app-logo-marquee>
        </div>
      </div>
    </section>
  `
})
export class TrustedCompaniesSectionComponent {
  partners = PARTNERS;
}
