import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../../../core/constants/mock-data';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [SectionHeaderComponent, CardComponent, IconComponent, ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 lg:py-32 bg-white">
      <div class="container-main">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <app-section-header 
            eyebrow="Xidmətlərimiz"
            title="Aşağıdakı xidmətlər üzrə ixtisaslaşmışıq"
            customClass="max-w-2xl">
          </app-section-header>
          <app-button variant="outline" routerLink="/services" customClass="whitespace-nowrap shrink-0 border-gray-200 text-text-main hover:bg-gray-50 hover:text-text-main hover:border-gray-300">
            Bütün xidmətlər
          </app-button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (service of services; track service.slug) {
            <app-card customClass="group hover:-translate-y-2 transition-transform duration-300 !p-8 bg-surface-light border border-transparent hover:border-border cursor-pointer" [routerLink]="['/services', service.slug]">
              <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                <app-icon [name]="service.icon" [size]="28"></app-icon>
              </div>
              <h3 class="text-xl font-bold text-text-main mb-4 group-hover:text-primary-blue transition-colors">{{ service.title }}</h3>
              <p class="text-text-secondary leading-relaxed mb-8 flex-grow">{{ service.description }}</p>
              
              <div class="flex items-center gap-2 text-primary-blue font-semibold mt-auto">
                 <span>Ətraflı</span>
                 <app-icon name="arrow-right" [size]="20" class="group-hover:translate-x-1 transition-transform"></app-icon>
              </div>
            </app-card>
          }
        </div>
      </div>
    </section>
  `
})
export class ServicesSectionComponent {
  services = SERVICES;
}
