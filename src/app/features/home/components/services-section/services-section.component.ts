import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SERVICES} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';

@Component({
    selector: 'app-services-section',
    standalone: true,
    imports: [RouterLink, RevealDirective],
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
            <a appReveal revealDirection="up" [revealDelay]="i * 100" [routerLink]="['/services', service.slug]" class="group service-card-hover block w-full lg:min-h-[278px] rounded-[20px] sm:rounded-[24px] pt-6 sm:pt-8 pr-6 sm:pr-8 pb-6 sm:pb-8 pl-6 sm:pl-[31px] bg-[#F7F9FC] flex flex-col transition-transform duration-300 ease-in hover:-translate-y-[10px] hover:scale-[1.02] focus-within:-translate-y-[10px] focus-within:scale-[1.02] outline-none motion-reduce:transition-none motion-reduce:transform-none">
              
              <!-- Icon Row -->
              <div class="flex items-start justify-between mb-4 sm:mb-6">
                <!-- Left Icon Box -->
                <div class="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-[12px] bg-white flex items-center justify-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)]">
                  <img [src]="service.icon" alt="" aria-hidden="true" class="h-5 w-5 sm:h-6 sm:w-6 object-contain"/>
                </div>
                
                <!-- Right Hover Icon Box -->
                @if (service.hoverIcon) {
                  <div class="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-[12px] bg-white flex items-center justify-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] opacity-0 scale-95 transition-all duration-300 ease-in group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 motion-reduce:transition-none motion-reduce:scale-100">
                    <img [src]="service.hoverIcon" alt="" aria-hidden="true" class="h-5 w-5 sm:h-6 sm:w-6 object-contain"/>
                  </div>
                }
              </div>
              
              <!-- Title -->
              <h3 class="text-[18px] sm:text-[20px] leading-[22px] sm:leading-[24px] font-bold font-bdo text-[#0A1642] group-hover:text-[#0000FE] group-focus-within:text-[#0000FE] transition-colors duration-300 ease-in mb-2 sm:mb-3">
                {{ service.title }}
              </h3>
              
              <!-- Description -->
              <p class="text-[14px] leading-[18px] font-normal font-bdo text-[#80899D] m-0">
                {{ service.description }}
              </p>
              
            </a>
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
