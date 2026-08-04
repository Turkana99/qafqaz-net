import { ChangeDetectionStrategy, Component, computed, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PublicApiService } from '../../../../core/services/public-api.service';
import { LanguageService } from '../../../../core/services/language.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of, combineLatest } from 'rxjs';
import { ResolveMediaUrlPipe } from '../../../../core/utils/media.helper';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';
import { Product } from '../../../../core/models/api.model';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product(); as item) {
      <!-- Hero Header -->
      <div class="bg-[#F7F9FC] pt-[140px] pb-16 w-full">
        <div class="container-main">
          <!-- Back Link -->
          <a
            routerLink="/products"
            class="inline-flex items-center gap-2 text-[#4343FF] font-bdo font-medium text-[16px] hover:underline mb-8"
          >
            <svg class="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Məhsullara qayıt
          </a>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <!-- Left: Image Gallery -->
            <div appReveal revealDirection="left" class="flex flex-col gap-4">
              <!-- Main Image Display -->
              @if (selectedImage()) {
                <div class="w-full h-[360px] md:h-[480px] bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-center overflow-hidden border border-[#E2E8F0]">
                  <img
                    [src]="selectedImage()"
                    [alt]="item.title"
                    class="max-h-full max-w-full object-contain"
                  />
                </div>
              }

              <!-- Thumbnail Gallery if multiple images exist -->
              @if (galleryImages().length > 1) {
                <div class="flex items-center gap-3 overflow-x-auto py-2">
                  @for (imgUrl of galleryImages(); track imgUrl; let idx = $index) {
                    @if (imgUrl) {
                      <button
                        type="button"
                        (click)="selectImage(imgUrl)"
                        [class.border-[#4343FF]]="selectedImage() === imgUrl"
                        [class.border-transparent]="selectedImage() !== imgUrl"
                        class="w-20 h-20 rounded-[12px] bg-white border-2 p-2 shadow-sm shrink-0 flex items-center justify-center overflow-hidden transition-all focus:outline-none"
                      >
                        <img
                          [src]="imgUrl"
                          [alt]="item.title + ' ' + idx"
                          class="max-h-full max-w-full object-contain"
                        />
                      </button>
                    }
                  }
                </div>
              }
            </div>

            <!-- Right: Product Info & Specifications -->
            <div appReveal revealDirection="right" [revealDelay]="100" class="flex flex-col">
              @if (item.categoryName) {
                <span class="inline-block px-3 py-1 bg-[#E2E8F0] text-[#0A1642] font-bdo text-[14px] font-medium rounded-[6px] w-max mb-4">
                  {{ item.categoryName }}
                </span>
              }

              <h1 class="font-bdo font-bold text-[32px] md:text-[44px] leading-[1.2] text-[#0A1642] mb-6">
                {{ item.title }}
              </h1>

              @if (item.description) {
                <p class="font-bdo text-[16px] md:text-[18px] leading-[28px] text-[#80899D] mb-8">
                  {{ item.description }}
                </p>
              }

              <!-- Specifications Table / List -->
              @if (specsList().length > 0) {
                <div class="bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-sm mb-8">
                  <h3 class="font-bdo font-bold text-[20px] text-[#0A1642] mb-4">Texniki xüsusiyyətlər</h3>
                  <div class="flex flex-col divide-y divide-[#E2E8F0]">
                    @for (spec of specsList(); track spec.key) {
                      <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span class="font-bdo font-medium text-[15px] text-[#0A1642]">{{ spec.key }}</span>
                        <span class="font-bdo text-[15px] text-[#80899D]">{{ spec.value }}</span>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed HTML Description Section -->
      @if (item.content) {
        <section class="w-full bg-white py-16 md:py-24">
          <div class="container-main max-w-[960px]">
            <h2 class="font-bdo font-bold text-[28px] text-[#0A1642] mb-8">Məhsul haqqında ətraflı</h2>
            <!-- Safely rendered HTML description -->
            <div
              class="font-bdo text-[16px] leading-[1.7] text-[#0A1642] prose prose-lg max-w-none"
              [innerHTML]="item.content"
            ></div>
          </div>
        </section>
      }

      <!-- Related Products Section -->
      @if (relatedProducts().length > 0) {
        <section class="w-full bg-[#F7F9FC] py-16 md:py-24 border-t border-[#E2E8F0]">
          <div class="container-main">
            <h2 class="font-bdo font-bold text-[32px] md:text-[40px] text-[#0A1642] mb-10">
              Oxşar məhsullar
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (rel of relatedProducts(); track rel.id) {
                <a
                  [routerLink]="['/products', rel.slug || rel.id]"
                  class="bg-white rounded-[20px] p-6 border border-[#E2E8F0] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  @if (rel.coverImage || rel.imageUrl || rel.images?.[0]) {
                    <div class="w-full h-40 mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        [src]="rel.coverImage || rel.imageUrl || rel.images?.[0]"
                        [alt]="rel.title"
                        class="max-h-full max-w-full object-contain"
                      />
                    </div>
                  }
                  <div>
                    <h3 class="font-bdo font-bold text-[18px] text-[#0A1642] mb-2">{{ rel.title }}</h3>
                    <p class="font-bdo text-[14px] text-[#80899D] line-clamp-2">{{ rel.description }}</p>
                  </div>
                </a>
              }
            </div>
          </div>
        </section>
      }
    } @else {
      <!-- Not Found Fallback -->
      <div class="bg-[#F7F9FC] pt-[180px] pb-32 w-full min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="font-bdo font-bold text-[48px] text-[#0A1642] mb-4">Məhsul tapılmadı</h1>
          <a routerLink="/products" class="text-[#4343FF] hover:underline font-bdo text-[18px]">Məhsullara qayıt</a>
        </div>
      </div>
    }
  `
})
export class ProductDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly destroyRef = inject(DestroyRef);

  readonly product = signal<Product | null>(null);
  readonly selectedImage = signal<string>('');
  readonly relatedProducts = signal<Product[]>([]);

  readonly galleryImages = computed<string[]>(() => {
    const item = this.product() as any;
    if (!item) return [];
    const list: string[] = [];
    if (item.coverImage) list.push(item.coverImage);
    if (item.imageUrl && !list.includes(item.imageUrl)) list.push(item.imageUrl);
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach((img: any) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list;
  });

  readonly specsList = computed<{ key: string; value: string }[]>(() => {
    const item = this.product() as any;
    if (!item || !item.features) return [];
    if (Array.isArray(item.features)) {
      return item.features.map((feat: any, idx: number) => ({
        key: `Xüsusiyyət ${idx + 1}`,
        value: String(feat)
      }));
    }
    const entries = Object.entries(item.features);
    return entries.map(([key, value]) => ({ key, value: String(value) }));
  });

  constructor() {
    combineLatest([
      this.route.paramMap,
      this.languageService.locale$
    ]).pipe(
      switchMap(([params]) => {
        const slug = params.get('slug');
        if (!slug) return of(null);
        return this.apiService.getProductBySlug(slug).pipe(
          catchError(() => of(null))
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((prod: any) => {
      this.product.set(prod);
      if (prod) {
        const firstImg = prod.coverImage || prod.imageUrl || (prod.images && prod.images[0]) || '';
        this.selectedImage.set(firstImg);

        const pageTitle = prod.metaTitle || prod.title || 'QafqazNet Məhsullar';
        this.titleService.setTitle(pageTitle);

        const desc = prod.metaDescription || prod.description || '';
        if (desc) {
          this.metaService.updateTag({ name: 'description', content: desc });
        }

        // Fetch related products
        this.apiService.getProducts(1, 100).pipe(
          catchError(() => of(null))
        ).subscribe((res: any) => {
          if (res && res.data) {
            const others = res.data
              .filter((p: Product) => p.slug !== prod.slug && p.id !== prod.id)
              .slice(0, 3);
            this.relatedProducts.set(others);
          }
        });
      }
    });
  }

  selectImage(img: string): void {
    this.selectedImage.set(img);
  }
}
