import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LATEST_BLOGS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';

@Component({
    selector: 'app-latest-blogs-section',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="py-20 lg:py-32 bg-[#F7F9FC]">
      <div class="container-main">
        
        <!-- Top Row: Title and Button -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <h2 appReveal revealDirection="left" class="text-[36px] md:text-[48px] lg:text-[60px] leading-[1.2] lg:leading-[60px] font-bold font-bdo text-[#0A1642] tracking-normal m-0">
            Blog yazıları
          </h2>
          
          <div appReveal revealDirection="right" [revealDelay]="100">
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
            <a 
              appReveal revealDirection="up" [revealDelay]="i * 150"
              [routerLink]="['/blogs', blog.slug]" 
              class="group block w-full bg-white p-2 rounded-[24px] shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0000AD] focus-visible:ring-offset-2 flex flex-col"
            >
              <!-- Image -->
              <div class="w-full aspect-[368/296] relative overflow-hidden rounded-[16px]">
                <img 
                  [src]="blog.imageUrl" 
                  [alt]="blog.title" 
                  class="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-125 group-focus-visible:scale-105" 
                />
              </div>
              
              <!-- Content -->
              <div class="px-2 pt-6 pb-4 flex flex-col flex-grow">
                <h3 class="font-bdo font-bold text-[20px] md:text-[24px] leading-[1.3] md:leading-[32px] text-[#0A1642] mb-6 line-clamp-3">
                  {{ blog.title }}
                </h3>
                
                <!-- Bottom row: Badge and Date -->
                <div class="mt-auto flex items-center gap-4">
                  <div 
                    class="h-[36px] px-4 rounded-[8px] flex items-center justify-center font-bdo text-[14px] font-medium text-white"
                    [style.backgroundColor]="getCategoryColor(blog.category)"
                  >
                    {{ blog.category }}
                  </div>
                  
                  <span class="font-bdo font-normal text-[16px] leading-[28px] text-[#80899D] align-middle">
                    {{ blog.date }}
                  </span>
                </div>
              </div>
            </a>
          }
        </div>

      </div>
    </section>
  `
})
export class LatestBlogsSectionComponent {
    blogs = LATEST_BLOGS;

    getCategoryColor(category : string): string {
        const cat = category.toLowerCase();
        if (cat.includes('məhsul')) 
            return '#FF9182';
        


        if (cat.includes('araşdırma')) 
            return '#D5ADFF';
        


        if (cat.includes('texnologiya')) 
            return '#82B4FF';
        


        return '#E2E8F0';
    }
}
