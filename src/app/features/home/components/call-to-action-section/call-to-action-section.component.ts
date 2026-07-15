import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-call-to-action-section',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-24 relative overflow-hidden flex items-center justify-center">
      <!-- Network Background Placeholder -->
      <div class="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-blue via-transparent to-transparent"></div>
      
      <div class="container-custom relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h2 class="text-3xl md:text-5xl font-bold text-primary-navy mb-6 leading-tight">
          Rəqəmsal həllərinizə buradan bizimlə başlayın
        </h2>
        
        <p class="text-text-secondary text-lg mb-10 max-w-2xl">
          Yüksək texnologiya ilə vaxtınıza qənaət edərək rəqabətdə 1 addım öndə olun.
        </p>
        
        <div class="flex flex-wrap items-center justify-center gap-4">
          <app-button variant="gradient" size="lg" routerLink="/contact">Layihəyə başla</app-button>
          <app-button variant="primary" size="lg" routerLink="/services" customClass="bg-primary-navy hover:bg-primary-navy/90">
             Məlumat al
          </app-button>
        </div>
      </div>
    </section>
  `
})
export class CallToActionSectionComponent {}
