import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';
import { CallToActionSectionComponent } from '../../../home/components/call-to-action-section/call-to-action-section.component';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';
import { EquipmentSectionComponent } from '../../components/equipment-section/equipment-section.component';
import { PublicApiService } from '../../../../core/services/public-api.service';
import { LanguageService } from '../../../../core/services/language.service';

export interface ProductBenefit {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly iconBackground: string;
}

export const PRODUCT_BENEFITS: ReadonlyArray<ProductBenefit> = [
  {
    id: '1',
    title: 'Etibarlı məhsullar',
    description:
      'Təklif etdiyimiz bütün məhsullar keyfiyyət və uyğunluq baxımından seçilərək təqdim olunur.',
    icon: 'assets/icons/benefit1.svg',
    iconBackground: 'bg-[#F3E8FF]',
  },
  {
    id: '2',
    title: 'Qiymətdə rəqabətlilik',
    description:
      'Bazar standartlarına uyğun, optimal qiymətlərlə texnoloji məhsulları əlçatan edirik.',
    icon: 'assets/icons/benefit2.svg',
    iconBackground: 'bg-[#E9F9F1]',
  },
  {
    id: '3',
    title: 'Peşəkar dəstək',
    description: 'Məhsul seçimi və istifadəsi zamanı sizə operativ və peşəkar dəstək göstəririk.',
    icon: 'assets/icons/benefit3.svg',
    iconBackground: 'bg-[#FFF7E6]',
  },
];

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CallToActionSectionComponent, RevealDirective, EquipmentSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- 1. Products Page Jumbotron Section (702px Desktop Target Height) -->
    <section
      class="bg-[#F7F9FC] pt-28 md:pt-36 lg:pt-24 pb-16 lg:pb-12 lg:h-[702px] flex flex-col items-center justify-center"
    >
      <div class="container-main flex flex-col items-center text-center w-full">
        <!-- Main Title -->
        <h1
          appReveal
          revealDirection="up"
          [revealDelay]="0"
          class="font-bdo font-bold text-[36px] leading-[44px] md:text-[48px] md:leading-[56px] lg:text-[60px] lg:leading-[76px] text-[#0A1642] tracking-normal text-center m-0"
        >
          Məhsullar və avadanlıqlar
        </h1>

        <!-- Description -->
        <p
          appReveal
          revealDirection="up"
          [revealDelay]="150"
          class="font-bdo font-normal text-[14px] leading-[24px] md:text-[16px] md:leading-[28px] text-[#80899D] tracking-normal text-center max-w-[800px] mt-4 sm:mt-6 mb-8 sm:mb-12 m-0"
        >
          Məhsullarımız bazarın aparıcı texnologiyalarına əsaslanaraq seçilir və sizə təqdim olunur.
          Keyfiyyət, uyğunluq və performansı ön planda tutaraq, biznesiniz üçün etibarlı və effektiv
          həllər təqdim edirik.
        </p>

        <!-- 3 Product Benefit Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          @for (benefit of benefits; track benefit.id; let i = $index) {
            <div
              appReveal
              revealDirection="up"
              [revealDelay]="200 + i * 100"
              class="bg-white rounded-[20px] p-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] flex items-start gap-4 min-h-[154px] w-full"
            >
              <!-- Icon Container -->
              <div
                class="w-[56px] h-[56px] rounded-[12px] p-3 flex items-center justify-center shrink-0"
                [class]="benefit.iconBackground"
              >
                <img
                  [src]="benefit.icon"
                  alt=""
                  aria-hidden="true"
                  class="w-8 h-8 object-contain"
                />
              </div>

              <!-- Content -->
              <div class="flex flex-col text-left">
                <h2 class="font-bdo font-bold text-[20px] leading-[28px] text-[#0A1642] mb-3">
                  {{ benefit.title }}
                </h2>
                <p class="font-bdo font-normal text-[14px] leading-[18px] text-[#80899D] m-0">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- 2. Equipment Categories & Product Groups Section -->
    <app-equipment-section [products]="products()"></app-equipment-section>

    <!-- 3. Shared Call To Action Section -->
    <app-call-to-action-section variant="dark"></app-call-to-action-section>
  `,
})
export class ProductsPageComponent {
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly products = signal<any[]>([]);
  readonly benefits = PRODUCT_BENEFITS;

  constructor() {
    this.languageService.locale$.pipe(
      switchMap(() => this.apiService.getProducts(1, 100).pipe(
        catchError(() => of(null))
      )),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((res: any) => {
      if (res && res.data) {
        this.products.set(res.data);
      }
    });
  }
}
