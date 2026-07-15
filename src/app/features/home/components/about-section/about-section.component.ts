import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STATS } from '../../../../core/constants/mock-data';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [SectionHeaderComponent, IconComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 lg:py-32 bg-surface">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Text and Stats -->
          <div class="flex flex-col gap-10">
            <app-section-header 
              eyebrow="Haqqımızda qısa məlumat"
              title="QAFQAZNET 2015-ci ildən etibarən bizneslərin inkişafına dəstək olan etibarlı İT tərəfdaşıdır."
              description="Biz texnologiyanı sadəcə bir vasitə kimi deyil, biznes uğurunuzun əsas açarı kimi görürük.">
            </app-section-header>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              @for (stat of stats; track stat.label) {
                <app-card customClass="!p-6 flex flex-col justify-center items-start gap-3">
                  <div class="flex items-center gap-3">
                    <span class="text-4xl md:text-5xl font-bold text-text-main">{{ stat.value }}</span>
                    <app-icon [name]="stat.icon" class="text-accent-green" [size]="28"></app-icon>
                  </div>
                  <span class="text-sm font-bold text-text-secondary uppercase tracking-wider">{{ stat.label }}</span>
                </app-card>
              }
            </div>
          </div>

          <!-- Image -->
          <div class="relative h-[400px] sm:h-[500px] lg:h-[700px] rounded-[40px] overflow-hidden shadow-2xl">
            <!-- Using a placeholder block with a gradient as actual image is not provided -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary-navy to-primary-blue flex items-center justify-center">
               <span class="text-white/80 font-medium text-2xl uppercase tracking-widest">Ofisimiz</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutSectionComponent {
  stats = STATS;
}
