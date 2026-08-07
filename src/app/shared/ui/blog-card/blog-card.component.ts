import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-blog-card',
    standalone: true,
    imports: [
        RouterLink, CommonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <a 
      [routerLink]="['/blogs', blog.slug]" 
      class="group block w-full h-full bg-white p-2 rounded-[24px] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] focus-visible:ring-offset-2 flex flex-col"
    >
      <!-- Image -->
      @if (blog.coverImageUrl || blog.coverImage || blog.imageUrl) {
        <div class="w-full aspect-[368/296] relative overflow-hidden rounded-[16px] shrink-0">
          <img 
            [src]="blog.coverImageUrl || blog.coverImage || blog.imageUrl" 
            [alt]="blog.title" 
            class="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105" 
          />
        </div>
      }
      
      <!-- Content -->
      <div class="px-2 pt-4 sm:pt-6 pb-3 sm:pb-4 flex flex-col flex-grow">
        <h3 class="font-bdo font-bold text-[18px] sm:text-[24px] leading-[1.3] md:leading-[32px] text-[#0A1642] mb-3 sm:mb-4 line-clamp-3 group-hover:text-[#4343FF] group-focus-visible:text-[#4343FF] transition-colors duration-300">
          {{ blog.title }}
        </h3>

        @if (blog.excerpt) {
          <p class="font-bdo font-normal text-[14px] sm:text-[15px] leading-[22px] text-[#80899D] mb-4 line-clamp-2">
            {{ blog.excerpt }}
          </p>
        }
        
        <!-- Bottom row: Badge and Date -->
        <div class="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div 
            class="min-w-max h-[32px] sm:h-[36px] px-3 sm:px-4 rounded-[8px] flex items-center justify-center font-bdo text-[13px] sm:text-[14px] font-medium text-white shrink-0"
            [style.backgroundColor]="getCategoryColor(blog.categoryName || blog.category)"
          >
            {{ blog.categoryName || blog.category || 'İcmal' }}
          </div>
          
          @if (formattedDate) {
            <span class="font-bdo font-normal text-[14px] sm:text-[16px] leading-[24px] sm:leading-[28px] text-[#80899D] align-middle shrink-0 whitespace-nowrap">
              {{ formattedDate }}
            </span>
          }
        </div>
      </div>
    </a>
  `
})
export class BlogCardComponent {
    @Input({required: true}) blog !: any;

    get formattedDate(): string {
        const raw = this.blog?.publishedAt || this.blog?.date;
        if (!raw) return '';

        const date = new Date(raw);
        if (isNaN(date.getTime())) return String(raw);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    getCategoryColor(category?: string): string {
        if (!category || !category.trim()) return '#78D995';

        const cat = category.toLowerCase().trim();

        if (cat.includes('texnologiya') || cat.includes('technology')) {
            return '#78D995';
        }

        if (cat.includes('araşdırma') || cat.includes('arasdirma') || cat.includes('research')) {
            return '#82B4FF';
        }

        if (cat.includes('məhsul') || cat.includes('mehsul') || cat.includes('product')) {
            return '#FFC778';
        }

        const palette = [
            '#78D995',
            '#82B4FF',
            '#FFC778',
            '#D5ADFF',
            '#4FD1C5',
            '#FF9E78',
            '#F6AD55'
        ];

        let hash = 0;
        for (let i = 0; i < cat.length; i++) {
            hash = cat.charCodeAt(i) + ((hash << 5) - hash);
        }

        const index = Math.abs(hash) % palette.length;
        return palette[index];
    }
}
