import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../../../core/constants/mock-data';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';
import { ServiceCardComponent } from '../../../../shared/ui/service-card/service-card.component';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [RouterLink, RevealDirective, ServiceCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-12 sm:py-20 lg:py-32 bg-white">
      <div class="container-main">
        
        <!-- Subtitle Badge -->
        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <div appReveal revealDirection="left" [revealDelay]="0" class="inline-flex items-center gap-2 bg-[#F7F9FC] rounded-[7px] px-3 sm:px-4 py-1.5 min-h-[32px] mb-4 sm:mb-6 max-w-full mx-auto md:mx-0">
            <img src="assets/icons/serviceIcon.svg" alt="" class="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0">
            <span class="text-[14px] sm:text-[16px] text-[#0A1642] font-normal font-bdo m-0 tracking-normal align-middle mt-[1px]">
              İnnovativ həllər, ölçülə bilən nəticələr
            </span>
          </div>

          <!-- Top Row: Title and Desktop Button -->
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-8 mb-10 sm:mb-16 w-full">
            
            <h2 appReveal revealDirection="left" [revealDelay]="100" class="text-[26px] sm:text-[40px] lg:text-[60px] leading-[1.2] lg:leading-[70px] font-bold font-bdo text-[#0A1642] tracking-normal max-w-[800px] text-center md:text-left">
              Aşağıdakı xidmətlər üzrə<br class="hidden md:block"> ixtisaslaşmışıq
            </h2>
            
            <div appReveal revealDirection="right" [revealDelay]="200" class="hidden md:block">
              <a
                routerLink="/services"
                class="group inline-flex h-[48px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] bg-[#F7F9FC] px-6 font-bdo text-[16px] font-medium leading-none text-[#4343FF] transition-colors duration-300 hover:text-[#0000AD] focus-visible:text-[#0000AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2"
              >
                <span class="font-bdo font-bold transition-colors duration-300 group-hover:text-[#0000AD] group-focus-visible:text-[#0000AD]">Daha çox göstər</span>

                <span
                  aria-hidden="true"
                  class="h-5 w-5 bg-current transition-colors duration-300"
                  style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
                ></span>
              </a>
            </div>

          </div>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          @for (service of services; track service.slug; let i = $index) {
            <app-service-card [service]="service" [revealDelay]="i * 100"></app-service-card>
          }
        </div>
        
        <!-- Mobile Action Button (Rendered after all service cards) -->
        <div appReveal revealDirection="up" [revealDelay]="300" class="mt-8 text-center md:hidden">
          <a
            routerLink="/services"
            class="group inline-flex h-[48px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] bg-[#F7F9FC] px-6 font-bdo text-[16px] font-medium leading-none text-[#4343FF] transition-colors duration-300 hover:text-[#0000AD] focus-visible:text-[#0000AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2"
          >
            <span class="font-bdo font-bold transition-colors duration-300 group-hover:text-[#0000AD] group-focus-visible:text-[#0000AD]">Daha çox göstər</span>

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
export class ServicesSectionComponent {
  services = SERVICES;
}
