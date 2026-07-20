import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { EQUIPMENT_CATEGORIES, EquipmentCategory } from '../../data/equipment.data';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';

@Component({
  selector: 'app-equipment-section',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-16 sm:py-24 lg:py-32 bg-white">
      <div class="container-main">
        <div
          class="grid grid-cols-1 lg:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.4fr)] gap-8 lg:gap-16 items-start"
        >
          <!-- Left Column: Title & Equipment Categories List -->
          <div class="flex flex-col w-full">
            <!-- Main Title -->
            <h2
              appReveal
              revealDirection="left"
              [revealDelay]="0"
              class="font-bdo font-bold text-[32px] leading-[44px] md:text-[42px] md:leading-[50px] lg:text-[40px] lg:leading-[56px] text-[#0A1642] tracking-normal text-left mb-8 sm:mb-10 m-0"
            >
              İşiniz üçün<br class="hidden sm:block" />
              doğru avadanlıqlar
            </h2>

            <!-- Category Navigation List -->
            <div class="flex flex-col w-full">
              @for (category of categories; track category.id; let i = $index) {
                <div appReveal revealDirection="left" [revealDelay]="100 + i * 60" class="w-full">
                  <button
                    type="button"
                    (click)="selectCategory(category.id)"
                    [attr.aria-pressed]="selectedCategoryId() === category.id"
                    class="w-full flex items-center justify-between py-4 sm:py-5 text-left border-b border-[#F0F2F5] group transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18E792]"
                  >
                    <span
                      class="font-bdo text-[16px] sm:text-[18px] leading-[20px] transition-colors duration-300 pr-4"
                      [class]="
                        selectedCategoryId() === category.id
                          ? 'font-medium text-[#18E792]'
                          : 'font-normal text-[#80899D] group-hover:text-[#18E792]'
                      "
                    >
                      {{ category.label }}
                    </span>

                    <img
                      [src]="
                        selectedCategoryId() === category.id
                          ? category.activeArrowIcon
                          : category.defaultArrowIcon
                      "
                      alt=""
                      aria-hidden="true"
                      class="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0 transition-transform duration-300"
                    />
                  </button>
                </div>
              }
            </div>
          </div>

          <!-- Right Column: Product Groups for Selected Category -->
          <div class="flex flex-col gap-8 sm:gap-10 w-full min-w-0">
            @for (group of activeCategory().groups; track group.id; let gIndex = $index) {
              <div
                appReveal
                revealDirection="right"
                [revealDelay]="gIndex * 100"
                class="flex flex-col w-full min-w-0"
              >
                <!-- Group Title -->
                <h3
                  class="font-bdo font-bold text-[20px] leading-[28px] text-[#0A1642] mb-4 text-left"
                >
                  {{ group.title }}
                </h3>

                <!-- If Slider Group: Horizontally Scrollable Cards with Left/Right Buttons -->
                @if (group.slider) {
                  <div class="relative w-full min-w-0 group/slider">
                    <!-- Left Arrow Scroll Button -->
                    <button
                      type="button"
                      (click)="scrollSlider(sliderTrack, -260)"
                      aria-label="Əvvəlki məhsullar"
                      class="absolute left-[-16px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2E8F0] bg-white text-[#0A1642] shadow-md flex items-center justify-center hover:border-[#18E792] hover:text-[#18E792] focus:outline-none focus:ring-2 focus:ring-[#18E792] transition-all"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.5"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <!-- Scroll Track -->
                    <div
                      #sliderTrack
                      class="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-1 px-1 w-full min-w-0"
                    >
                      @for (item of group.items; track item.id) {
                        <div
                          class="shrink-0 snap-start bg-[#F7F9FC] rounded-[12px] p-5 sm:p-6 w-[240px] sm:w-[280px] min-h-[92px] flex items-center justify-start"
                        >
                          <span
                            class="font-bdo font-normal text-[15px] sm:text-[16px] leading-[22px] text-[#0A1642] text-left"
                          >
                            {{ item.label }}
                          </span>
                        </div>
                      }
                    </div>

                    <!-- Right Arrow Scroll Button -->
                    <button
                      type="button"
                      (click)="scrollSlider(sliderTrack, 260)"
                      aria-label="Növbəti məhsullar"
                      class="absolute right-[-16px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2E8F0] bg-white text-[#0A1642] shadow-md flex items-center justify-center hover:border-[#18E792] hover:text-[#18E792] focus:outline-none focus:ring-2 focus:ring-[#18E792] transition-all"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.5"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                } @else {
                  <!-- Standard Non-Slider Grid Cards -->
                  <div class="flex flex-wrap gap-3 sm:gap-4 w-full">
                    @for (item of group.items; track item.id) {
                      <div
                        class="bg-[#F7F9FC] rounded-[12px] p-5 sm:p-6 w-full sm:w-[240px] lg:w-[260px] min-h-[92px] flex items-center justify-start"
                      >
                        <span
                          class="font-bdo font-normal text-[15px] sm:text-[16px] leading-[22px] text-[#0A1642] text-left"
                        >
                          {{ item.label }}
                        </span>
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `,
  ],
})
export class EquipmentSectionComponent {
  readonly categories = EQUIPMENT_CATEGORIES;
  readonly selectedCategoryId = signal<string>(EQUIPMENT_CATEGORIES[0].id);

  readonly activeCategory = computed<EquipmentCategory>(() => {
    return this.categories.find((c) => c.id === this.selectedCategoryId()) ?? this.categories[0];
  });

  selectCategory(id: string): void {
    this.selectedCategoryId.set(id);
  }

  scrollSlider(element: HTMLDivElement, amount: number): void {
    element.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
