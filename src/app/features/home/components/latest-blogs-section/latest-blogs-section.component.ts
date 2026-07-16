import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LATEST_BLOGS } from '../../../../core/constants/mock-data';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-latest-blogs-section',
  standalone: true,
  imports: [SectionHeaderComponent, CardComponent, BadgeComponent, ButtonComponent, IconComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 lg:py-32 bg-white">
      <div class="container-main">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <app-section-header 
            title="Blog yazıları">
          </app-section-header>
          <app-button variant="outline" routerLink="/blogs" customClass="whitespace-nowrap shrink-0 border-gray-200 text-text-main hover:bg-gray-50 hover:text-text-main hover:border-gray-300">
            Bütün yazılar
          </app-button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (blog of blogs; track blog.slug) {
            <app-card customClass="!p-0 group cursor-pointer" [routerLink]="['/blogs', blog.slug]">
              <!-- Image Placeholder -->
              <div class="w-full h-56 bg-primary-navy relative overflow-hidden flex items-center justify-center">
                 <div class="absolute inset-0 bg-gradient-to-tr from-primary-blue/80 to-transparent mix-blend-overlay"></div>
                 <app-icon name="image" class="text-white/30 z-10" [size]="48"></app-icon>
                 <!-- Actual image tag would go here -->
              </div>
              
              <div class="p-6 flex flex-col flex-grow">
                <div class="mb-4">
                  <app-badge variant="cyan" class="mb-3">{{ blog.category }}</app-badge>
                </div>
                <h3 class="text-xl font-bold text-text-main mb-4 group-hover:text-primary-blue transition-colors line-clamp-2">{{ blog.title }}</h3>
                <div class="mt-auto flex items-center gap-2 text-text-muted text-sm font-medium">
                  <app-icon name="calendar" [size]="16"></app-icon>
                  <span>{{ blog.date }}</span>
                </div>
              </div>
            </app-card>
          }
        </div>
      </div>
    </section>
  `
})
export class LatestBlogsSectionComponent {
  blogs = LATEST_BLOGS;
}
