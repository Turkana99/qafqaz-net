import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SERVICES } from '../../../../core/constants/mock-data';
import { CallToActionSectionComponent } from '../../../home/components/call-to-action-section/call-to-action-section.component';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';
import { ServiceCardComponent } from '../../../../shared/ui/service-card/service-card.component';
import { ServiceAudienceSectionComponent } from '../../components/service-audience-section/service-audience-section.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    CallToActionSectionComponent,
    RevealDirective,
    ServiceCardComponent,
    ServiceAudienceSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- 1. Services Page Jumbotron Section (600px Desktop Target Height) -->
    <section
      class="bg-[#F7F9FC] pt-28 md:pt-36 lg:pt-24 pb-16 lg:pb-0 lg:h-[600px] flex flex-col items-center justify-center"
    >
      <div class="container-main flex flex-col items-center text-center w-full">
        <div class="max-w-[950px] w-full flex flex-col items-center text-center">
          <!-- Page Title -->
          <h1
            appReveal
            revealDirection="up"
            [revealDelay]="0"
            class="font-bdo font-bold text-[36px] leading-[44px] md:text-[48px] md:leading-[58px] lg:text-[60px] lg:leading-[76px] text-[#0A1642] tracking-normal text-center m-0"
          >
            Təklif etdiyimiz xidmətlər<br class="hidden sm:block" />
            və həllər
          </h1>

          <!-- Page Description -->
          <p
            appReveal
            revealDirection="up"
            [revealDelay]="150"
            class="font-bdo font-normal text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#80899D] tracking-normal text-center max-w-[780px] mt-6 md:mt-8 m-0"
          >
            Hər bir biznes ölçüsündən və fəaliyyət sahəsindən asılı olmayaraq etibarlı və dayanıqlı
            İT həllərinə ehtiyac duyur. Biz QafqazNet olaraq, müxtəlif sektorlar üçün
            fərdiləşdirilmiş İT dəstək və həlləri təqdim edirik, bu da əməliyyatların fasiləsiz
            işləməsini və məhsuldarlığın artırılmasını təmin edir.
          </p>
        </div>
      </div>
    </section>

    <!-- 2. Services Grid Section (Reusing Shared ServiceCardComponent) -->
    <section class="py-12 sm:py-20 lg:py-32 bg-white">
      <div class="container-main">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          @for (service of services; track service.slug; let i = $index) {
            <app-service-card [service]="service" [revealDelay]="i * 80"></app-service-card>
          }
        </div>
      </div>
    </section>

    <!-- 3. "Kimlər faydalana bilər?" Section -->
    <app-service-audience-section></app-service-audience-section>

    <!-- 4. Shared Call To Action Section (Dark Variant) -->
    <app-call-to-action-section variant="dark"></app-call-to-action-section>
  `,
})
export class ServicesPageComponent {
  readonly services = SERVICES;
}
