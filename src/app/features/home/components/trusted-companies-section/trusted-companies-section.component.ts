import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PARTNERS } from '../../../../core/constants/mock-data';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-trusted-companies-section',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-white py-6 border-b border-border">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-sm font-bold text-text-main whitespace-nowrap hidden md:block">
            100+ şirkət güvənclə istifadə edir
          </div>
          
          <div class="flex items-center gap-8 md:gap-12 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth">
            @for (partner of partners; track partner.id) {
              <div class="flex items-center gap-2 text-text-secondary hover:text-text-main transition-colors min-w-max cursor-pointer">
                <app-icon name="hexagon" [size]="24" class="text-primary-blue/80"></app-icon>
                <span class="font-bold text-lg tracking-tight">{{ partner.name }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class TrustedCompaniesSectionComponent {
  partners = PARTNERS;
}
