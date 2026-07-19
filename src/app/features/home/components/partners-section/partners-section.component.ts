import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PARTNERS} from '../../../../core/constants/mock-data';

@Component({
    selector: 'app-partners-section',
    standalone: true,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="py-20 lg:py-32 bg-white">
      <div class="container-main">
        
        <div class="mb-16 flex flex-col gap-6">
          <!-- Top Row: Title and Button -->
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <h2 class="text-[36px] md:text-[48px] lg:text-[60px] leading-[1.2] lg:leading-[60px] font-bold font-bdo text-[#0A1642] tracking-normal m-0">
              Tərəfdaşlarımız
            </h2>
            
            <a
              routerLink="/company"
              class="group inline-flex h-[48px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] bg-[#F7F9FC] px-6 font-bdo text-[16px] font-medium leading-none text-[#4343FF] transition-colors duration-300 hover:text-[#0000AD] focus-visible:text-[#0000AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2"
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
          <p class="text-[18px] md:text-[20px] leading-[32px] align-middle font-normal font-bdo text-[#80899D] m-0 max-w-[800px]">
            Müxtəlif sahələrdən olan müştərilərimiz üçün etibarlı və innovativ IT həlləri təqdim edirik. Hər layihədə keyfiyyət və uzunmüddətli əməkdaşlıq əsas prioritetimizdir.
          </p>
        </div>

        <!-- Third Row: Partner Logos -->
<div class="w-full overflow-x-auto lg:overflow-visible">
  <div
    class="grid min-w-[900px] grid-cols-6 items-center gap-x-8 lg:min-w-0 lg:w-full"
  >
    @for (partner of partners; track partner.id) {
      <div class="flex min-w-0 items-center justify-start">
        <img
          [src]="partner.logoUrl"
          [alt]="partner.name + ' logo'"
          class="h-[40px] w-full max-w-[150px] object-contain object-left"
        />
      </div>
    }
  </div>
</div>

      </div>
    </section>
  `
})
export class PartnersSectionComponent {
    partners = PARTNERS;
}
