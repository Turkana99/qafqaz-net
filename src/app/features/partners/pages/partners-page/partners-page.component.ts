import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PARTNERS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';

@Component({
    selector: 'app-partners-page',
    standalone: true,
    imports: [
        CommonModule, RevealDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- Hero Section -->
    <div class="bg-[#F7F9FC] pt-[180px] pb-16 md:pb-24 lg:pb-32 flex flex-col items-center justify-center">
      <div class="container-main w-full">
        <h1 
          appReveal revealDirection="up" [revealDelay]="0"
          class="font-bdo font-bold text-[40px] md:text-[50px] lg:text-[60px] leading-[1.2] lg:leading-[76px] tracking-normal text-center text-[#0A1642] m-0"
        >
          Tərəfdaşlarımız
        </h1>
      </div>
    </div>

    <!-- Partners Grid Section -->
    <section class="w-full bg-[#FFFFFF] py-16 md:py-24 lg:py-32">
      <div class="container-main">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1200px] mx-auto">
          @for (partner of partners; track partner.id; let i = $index) {
            <div 
              appReveal revealDirection="up" [revealDelay]="i * 50"
              class="w-full min-h-[150px] rounded-[20px] bg-[#F7F9FC] p-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] flex items-center justify-center transition-all duration-300 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              <img 
                [src]="partner.logoUrl" 
                [alt]="partner.name"
                class="w-auto h-auto max-w-[80%] max-h-[80px] object-contain"
                loading="lazy"
              >
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class PartnersPageComponent {
    partners = PARTNERS;
}
