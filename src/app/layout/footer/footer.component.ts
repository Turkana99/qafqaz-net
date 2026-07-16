import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_ITEMS } from '../../core/constants/navigation';
import { IconComponent } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-surface-card pt-16 pb-8 border-t border-border mt-20">
      <div class="container-main">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <!-- Brand -->
          <div class="lg:col-span-1">
             <a routerLink="/" class="flex items-center gap-2 mb-6" aria-label="QafqazNet Home">
                <span class="text-2xl font-bold text-primary-navy tracking-tight">
                  <span class="text-accent-cyan">Q</span>afqazNet
                </span>
             </a>
             <p class="text-text-secondary text-sm leading-relaxed max-w-sm">
               Biz texnologiyanı sadəcə bir vasitə kimi deyil, biznes uğurunuzun əsas açarı kimi görürük.
             </p>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-bold text-text-main mb-6">Keçidlər</h3>
            <ul class="flex flex-col gap-4">
              @for (item of navItems; track item.route) {
                <li>
                  <a [routerLink]="item.route" class="text-text-secondary hover:text-primary-blue transition-colors">
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div class="lg:col-span-2">
            <h3 class="text-lg font-bold text-text-main mb-6">Əlaqə</h3>
            <ul class="flex flex-col gap-4">
               <li class="flex items-start gap-3 text-text-secondary">
                 <app-icon name="map-pin" class="text-primary-blue mt-1 shrink-0" [size]="20"></app-icon>
                 <span>Bakı şəhəri, Nizami küçəsi 124, AF Business House</span>
               </li>
               <li class="flex items-center gap-3 text-text-secondary">
                 <app-icon name="phone" class="text-primary-blue shrink-0" [size]="20"></app-icon>
                 <span>+994 (12) 123-45-67</span>
               </li>
               <li class="flex items-center gap-3 text-text-secondary">
                 <app-icon name="mail" class="text-primary-blue shrink-0" [size]="20"></app-icon>
                 <span>info&#64;qafqaznet.az</span>
               </li>
            </ul>
          </div>
        </div>
        
        <!-- Bottom -->
        <div class="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-text-secondary text-sm">
            &copy; 2026 QafqazNet. Bütün hüquqlar qorunur.
          </p>
          <div class="flex items-center gap-6 text-text-secondary">
             <a href="#" class="hover:text-primary-blue transition-colors" aria-label="LinkedIn"><app-icon name="linkedin" [size]="24"></app-icon></a>
             <a href="#" class="hover:text-primary-blue transition-colors" aria-label="Facebook"><app-icon name="facebook" [size]="24"></app-icon></a>
             <a href="#" class="hover:text-primary-blue transition-colors" aria-label="Instagram"><app-icon name="instagram" [size]="24"></app-icon></a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  navItems = NAV_ITEMS;
}
