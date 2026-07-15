import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PARTNERS } from '../../../../core/constants/mock-data';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [IconComponent, SectionHeaderComponent, ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 lg:py-32 bg-surface">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <app-section-header 
            title="Tərəfdaşlarımız"
            description="QafqazNet olaraq beynəlxalq və yerli şirkətlərlə sıx əməkdaşlıq edərək, müştərilərimizə ən keyfiyyətli xidməti təklif edirik."
            customClass="max-w-2xl">
          </app-section-header>
          <app-button variant="text" routerLink="/company" customClass="whitespace-nowrap shrink-0 !px-0 flex items-center gap-2">
            Bütün tərəfdaşlar <app-icon name="arrow-right" [size]="20"></app-icon>
          </app-button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          @for (partner of partners; track partner.id) {
            <div class="bg-white rounded-2xl h-24 flex items-center justify-center p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow cursor-pointer">
              <!-- Using icon as placeholder for partner logos -->
              <div class="flex items-center gap-2 text-primary-navy">
                 <app-icon name="hexagon" [size]="28" class="text-primary-blue"></app-icon>
                 <span class="font-bold tracking-tight text-lg">{{ partner.name }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class PartnersSectionComponent {
  partners = PARTNERS;
}
