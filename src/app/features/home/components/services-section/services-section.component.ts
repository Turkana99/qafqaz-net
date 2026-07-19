import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SERVICES} from '../../../../core/constants/mock-data';

@Component({
    selector: 'app-services-section',
    standalone: true,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="py-20 lg:py-32 bg-white">
      <div class="container-main">
        
        <!-- Subtitle Badge -->
        <div class="inline-flex items-center gap-2 bg-[#F7F9FC] rounded-[7px] px-4 min-h-[32px] mb-6">
          <img src="assets/icons/serviceIcon.svg" alt="" class="w-5 h-5 object-contain">
          <span class="text-[16px] text-[#0A1642] font-normal font-bdo m-0 tracking-normal align-middle mt-[2px]">
            İnnovativ həllər, ölçülə bilən nəticələr
          </span>
        </div>

        <!-- Top Row: Title and Button -->
        <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-16">
          
          <h2 class="text-[32px] md:text-[60px] leading-[1.2] md:leading-[70px] font-bold font-bdo text-[#0A1642] tracking-normal max-w-[800px]">
            Aşağıdakı xidmətlər üzrə<br class="hidden md:block"> ixtisaslaşmışıq
          </h2>
          
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

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (service of services; track service.slug) {
            <a [routerLink]="['/services', service.slug]" class="group service-card-hover block w-full lg:min-h-[278px] rounded-[24px] pt-8 pr-8 pb-8 pl-[31px] bg-[#F7F9FC] flex flex-col transition-transform duration-300 ease-in hover:-translate-y-[10px] hover:scale-[1.02] focus-within:-translate-y-[10px] focus-within:scale-[1.02] outline-none motion-reduce:transition-none motion-reduce:transform-none">
              
              <!-- Icon Row -->
              <div class="flex items-start justify-between mb-6">
                <!-- Left Icon Box -->
                <div class="w-[48px] h-[48px] rounded-[12px] bg-white flex items-center justify-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)]">
                  <img [src]="service.icon" alt="" aria-hidden="true" class="h-6 w-6 object-contain"/>
                </div>
                
                <!-- Right Hover Icon Box -->
                @if (service.hoverIcon) {
                  <div class="w-[48px] h-[48px] rounded-[12px] bg-white flex items-center justify-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] opacity-0 scale-95 transition-all duration-300 ease-in group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 motion-reduce:transition-none motion-reduce:scale-100">
                    <img [src]="service.hoverIcon" alt="" aria-hidden="true" class="h-6 w-6 object-contain"/>
                  </div>
                }
              </div>
              
              <!-- Title -->
              <h3 class="text-[20px] leading-[24px] font-bold font-bdo text-[#0A1642] group-hover:text-[#0000FE] group-focus-within:text-[#0000FE] transition-colors duration-300 ease-in mb-3">
                {{ service.title }}
              </h3>
              
              <!-- Description -->
              <p class="text-[14px] leading-[18px] font-normal font-bdo text-[#80899D] m-0">
                {{ service.description }}
              </p>
              
            </a>
          }
        </div>
        
      </div>
    </section>
  `
})
export class ServicesSectionComponent {
    services = SERVICES;
}
