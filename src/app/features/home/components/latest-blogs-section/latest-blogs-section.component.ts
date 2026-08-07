import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LATEST_BLOGS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {BlogCardComponent} from '../../../../shared/ui/blog-card/blog-card.component';
import {TranslationService} from '../../../../core/services/translation.service';

@Component({
    selector: 'app-latest-blogs-section',
    standalone: true,
    imports: [RouterLink, RevealDirective, BlogCardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="py-12 sm:py-20 lg:py-32 bg-[#F7F9FC]">
      <div class="container-main">
        
        <!-- Top Row: Title and Desktop Button -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div class="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 appReveal revealDirection="left" class="text-[28px] sm:text-[48px] lg:text-[60px] leading-[1.2] lg:leading-[60px] font-bold font-bdo text-[#0A1642] tracking-normal m-0">
              {{ title() || t().blogPosts }}
            </h2>
            @if (body(); as b) {
              <div appReveal revealDirection="left" [revealDelay]="100" class="font-bdo font-normal text-[16px] sm:text-[18px] leading-[26px] text-[#80899D] m-0 max-w-[800px] mt-2" [innerHTML]="b"></div>
            }
          </div>
          
          <div appReveal revealDirection="right" [revealDelay]="100" class="hidden md:block">
            <a
              routerLink="/blogs"
              class="group inline-flex h-[48px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] bg-white px-6 font-bdo text-[16px] font-medium leading-none text-[#4343FF] transition-colors duration-300 hover:text-[#0000AD] focus-visible:text-[#0000AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2 shadow-sm hover:shadow"
            >
              <span class="font-bdo font-bold transition-colors duration-300 group-hover:text-[#0000AD] group-focus-visible:text-[#0000AD]">{{ t().common.showMore }}</span>
              <span
                aria-hidden="true"
                class="h-5 w-5 bg-current transition-colors duration-300"
                style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
              ></span>
            </a>
          </div>
        </div>

        <!-- Blog Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          @for (blog of blogs(); track blog.slug || blog.id; let i = $index) {
            <div appReveal revealDirection="up" [revealDelay]="i * 150">
              <app-blog-card [blog]="blog"></app-blog-card>
            </div>
          }
        </div>

        <!-- Mobile Action Button (Rendered after all blog cards) -->
        <div appReveal revealDirection="up" [revealDelay]="300" class="mt-8 text-center md:hidden">
          <a
            routerLink="/blogs"
            class="group inline-flex h-[48px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] bg-white px-6 font-bdo text-[16px] font-medium leading-none text-[#4343FF] transition-colors duration-300 hover:text-[#0000AD] focus-visible:text-[#0000AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2 shadow-sm hover:shadow"
          >
            <span class="font-bdo font-bold transition-colors duration-300 group-hover:text-[#0000AD] group-focus-visible:text-[#0000AD]">{{ t().common.showMore }}</span>
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
export class LatestBlogsSectionComponent {
    private readonly translationService = inject(TranslationService);
    readonly t = this.translationService.translations;

    title = input<string | undefined>(undefined);
    body = input<string | undefined>(undefined);
    items = input<any[] | undefined>(undefined);

    readonly blogs = computed(() => {
        const custom = this.items();
        if (custom && custom.length > 0) {
            return custom;
        }
        return LATEST_BLOGS.slice(0, 3);
    });
}
