import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of, forkJoin } from 'rxjs';
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

export const INITIAL_PRODUCT_BENEFITS: ReadonlyArray<ProductBenefit> = [
  {
    id: '1',
    title: '',
    description: '',
    icon: '',
    iconBackground: 'bg-[#F3E8FF]',
  },
  {
    id: '2',
    title: '',
    description: '',
    icon: '',
    iconBackground: 'bg-[#E9F9F1]',
  },
  {
    id: '3',
    title: '',
    description: '',
    icon: '',
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
          {{ heroTitle() }}
        </h1>

        <!-- Description -->
        <p
          appReveal
          revealDirection="up"
          [revealDelay]="150"
          class="font-bdo font-normal text-[14px] leading-[24px] md:text-[16px] md:leading-[28px] text-[#80899D] tracking-normal text-center max-w-[800px] mt-4 sm:mt-6 mb-8 sm:mb-12 m-0"
        >
          {{ heroDescription() }}
        </p>

        <!-- 3 Product Benefit Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          @for (benefit of benefits(); track benefit.id; let i = $index) {
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
    <app-equipment-section
      [categories]="categories()"
      [products]="products()"
    ></app-equipment-section>

    <!-- 3. Shared Call To Action Section -->
    <app-call-to-action-section variant="dark"></app-call-to-action-section>
  `,
})
export class ProductsPageComponent {
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = signal<any[]>([]);
  readonly products = signal<any[]>([]);
  readonly heroTitle = signal<string>('');
  readonly heroDescription = signal<string>('');
  readonly benefits = signal<ProductBenefit[]>(INITIAL_PRODUCT_BENEFITS as ProductBenefit[]);

  constructor() {
    this.languageService.locale$.pipe(
      switchMap((locale) => forkJoin({
        categoriesRes: this.apiService.getProductCategories().pipe(
          catchError(() => of([]))
        ),
        productsRes: this.apiService.getProducts(1, 100).pipe(
          catchError(() => of(null))
        ),
        pageContent: this.apiService.getPageContents('products', locale).pipe(
          catchError(() => of(null))
        )
      })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(({ categoriesRes, productsRes, pageContent }: any) => {
      if (Array.isArray(categoriesRes)) {
        this.categories.set(categoriesRes);
      }
      if (productsRes && productsRes.data) {
        this.products.set(productsRes.data);
      }
      if (pageContent?.sections) {
        const sections = pageContent.sections;
        if (sections.hero) {
          if (sections.hero.title) {
            this.heroTitle.set(sections.hero.title);
          }
          if (sections.hero.body) {
            this.heroDescription.set(sections.hero.body);
          }
        }

        const featureSection = sections.features || sections.benefits;
        if (Array.isArray(featureSection?.items) && featureSection.items.length > 0) {
          const sortedItems = [...featureSection.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          const mappedBenefits: ProductBenefit[] = sortedItems.map((item: any, idx: number) => {
            const initial = (INITIAL_PRODUCT_BENEFITS as ProductBenefit[])[idx] || (INITIAL_PRODUCT_BENEFITS as ProductBenefit[])[0];
            return {
              id: initial.id || String(idx + 1),
              iconBackground: initial.iconBackground || 'bg-[#F3E8FF]',
              icon: item.imageUrl || item.icon || initial?.icon || '',
              title: item.title || initial?.title || '',
              description: item.description || initial?.description || ''
            };
          });
          this.benefits.set(mappedBenefits);
        } else {
          this.benefits.update(list => list.map((b, idx) => {
            const sectionKey = `feature_${idx + 1}` as keyof typeof sections;
            const feat = sections[sectionKey];
            if (feat) {
              return {
                ...b,
                title: feat.title || b.title,
                description: feat.body || b.description,
                icon: feat.imageUrl || (feat.items && feat.items[0]?.imageUrl) || b.icon
              };
            }
            return b;
          }));
        }
      }
    });
  }
}
