import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PARTNERS } from '../../../../core/constants/mock-data';
import { LogoMarqueeComponent } from '../../../../shared/ui/logo-marquee/logo-marquee.component';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';

@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [RouterLink, LogoMarqueeComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-12 sm:py-20 lg:py-32 bg-white">
      <div class="container-main">
        
        <div class="mb-10 sm:mb-16 flex flex-col gap-4 sm:gap-6">
          <!-- Top Row: Title and Button -->
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6">
            <h2 appReveal revealDirection="left" class="text-[28px] sm:text-[48px] lg:text-[60px] leading-[1.2] lg:leading-[60px] font-bold font-bdo text-[#0A1642] tracking-normal m-0 text-center md:text-left">
              Tərəfdaşlarımız
            </h2>
            
            <a
              appReveal revealDirection="right" [revealDelay]="100"
              routerLink="/company"
              class="hidden md:inline-flex group h-[48px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] bg-[#F7F9FC] px-6 font-bdo text-[16px] font-medium leading-none text-[#4343FF] transition-colors duration-300 hover:text-[#0000AD] focus-visible:text-[#0000AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2"
            >
              <span class="font-bdo font-bold transition-colors duration-300 group-hover:text-[#0000AD] group-focus-visible:text-[#0000AD]">20+ tərəfdaşın hamısını göstər</span>
              <span
                aria-hidden="true"
                class="h-5 w-5 bg-current transition-colors duration-300"
                style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
              ></span>
            </a>
          </div>

          <!-- Second Row: Description -->
          <p appReveal revealDirection="left" [revealDelay]="100" class="text-[16px] sm:text-[20px] leading-[26px] sm:leading-[32px] font-normal font-bdo text-[#80899D] m-0 max-w-[800px] text-center md:text-left mx-auto md:mx-0">
            Müxtəlif sahələrdən olan müştərilərimiz üçün etibarlı və innovativ İT həlləri təqdim edirik. Hər layihədə keyfiyyət və uzunmüddətli əməkdaşlıq əsas prioritetimizdir.
          </p>
        </div>

        <!-- Third Row: Continuous Partner Logos Marquee -->
        <div appReveal revealDirection="up" [revealDelay]="200" class="w-full my-4 sm:my-6">
          <app-logo-marquee [logos]="partners" [logoHeight]="40" [gap]="56"></app-logo-marquee>
        </div>

        <!-- Mobile Action Button (Rendered after partner logos) -->
        <div appReveal revealDirection="up" [revealDelay]="300" class="mt-8 text-center md:hidden">
          <a
            routerLink="/company"
            class="group inline-flex h-[48px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] bg-[#F7F9FC] px-6 font-bdo text-[16px] font-medium leading-none text-[#4343FF] transition-colors duration-300 hover:text-[#0000AD] focus-visible:text-[#0000AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2"
          >
            <span class="font-bdo font-bold transition-colors duration-300 group-hover:text-[#0000AD] group-focus-visible:text-[#0000AD]">20+ tərəfdaşın hamısını göstər</span>
            <span
              aria-hidden="true"
              class="h-5 w-5 bg-current transition-colors duration-300"
              style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
            ></span>
          </a>
        </div>

      </div>
    </section>
  `
})
export class PartnersSectionComponent {
  partners = PARTNERS;
}
