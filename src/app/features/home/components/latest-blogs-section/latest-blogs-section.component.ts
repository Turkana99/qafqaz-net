import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LATEST_BLOGS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {BlogCardComponent} from '../../../../shared/ui/blog-card/blog-card.component';

@Component({
    selector: 'app-latest-blogs-section',
    standalone: true,
    imports: [RouterLink, RevealDirective, BlogCardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="py-12 sm:py-20 lg:py-32 bg-[#F7F9FC]">
      <div class="container-main">
        
        <!-- Top Row: Title and Desktop Button -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
          <h2 appReveal revealDirection="left" class="text-[28px] sm:text-[48px] lg:text-[60px] leading-[1.2] lg:leading-[60px] font-bold font-bdo text-[#0A1642] tracking-normal m-0 text-center md:text-left">
            Blog yazıları
          </h2>
          
          <div appReveal revealDirection="right" [revealDelay]="100" class="hidden md:block">
            <a
              routerLink="/blogs"
              class="group inline-flex h-[48px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[12px] bg-white px-6 font-bdo text-[16px] font-medium leading-none text-[#4343FF] transition-colors duration-300 hover:text-[#0000AD] focus-visible:text-[#0000AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2 shadow-sm hover:shadow"
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

        <!-- Blog Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          @for (blog of blogs; track blog.slug; let i = $index) {
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
export class LatestBlogsSectionComponent {
    blogs = LATEST_BLOGS;
}

