import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../../core/constants/mock-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a 
      [routerLink]="['/blogs', blog.slug]" 
      class="group block w-full h-full bg-white p-2 rounded-[24px] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] focus-visible:ring-offset-2 flex flex-col"
    >
      <!-- Image -->
      <div class="w-full aspect-[368/296] relative overflow-hidden rounded-[16px] shrink-0">
        <img 
          [src]="blog.imageUrl || '/assets/images/placeholder.png'" 
          [alt]="blog.title" 
          class="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105" 
        />
      </div>
      
      <!-- Content -->
      <div class="px-2 pt-4 sm:pt-6 pb-3 sm:pb-4 flex flex-col flex-grow">
        <h3 class="font-bdo font-bold text-[18px] sm:text-[24px] leading-[1.3] md:leading-[32px] text-[#0A1642] mb-4 sm:mb-6 line-clamp-3 group-hover:text-[#4343FF] group-focus-visible:text-[#4343FF] transition-colors duration-300">
          {{ blog.title }}
        </h3>
        
        <!-- Bottom row: Badge and Date -->
        <div class="mt-auto flex flex-wrap items-center gap-3">
          <div 
            class="min-w-max h-[32px] sm:h-[36px] px-3 sm:px-4 rounded-[8px] flex items-center justify-center font-bdo text-[13px] sm:text-[14px] font-medium text-white shrink-0"
            [style.backgroundColor]="getCategoryColor(blog.category)"
          >
            {{ blog.category }}
          </div>
          
          <span class="font-bdo font-normal text-[14px] sm:text-[16px] leading-[24px] sm:leading-[28px] text-[#80899D] align-middle shrink-0 whitespace-nowrap">
            {{ blog.date }}
          </span>
        </div>
      </div>
    </a>
  `
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: BlogPost;

  getCategoryColor(category: string): string {
    if (!category) return '#E2E8F0';
    
    const cat = category.toLowerCase();
    if (cat.includes('icmal')) return '#78D995';
    if (cat.includes('məhsul')) return '#FFC778';
    if (cat.includes('texnologiya')) return '#82B4FF';
    if (cat.includes('araşdırma')) return '#D5ADFF';
    if (cat.includes('elm')) return '#48BB78'; 
    if (cat.includes('biznes')) return '#63B3ED';
    
    return '#E2E8F0';
  }
}
