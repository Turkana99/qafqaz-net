import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PARTNERS } from '../../../../core/constants/mock-data';

@Component({
  selector: 'app-trusted-companies-section',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="trusted-companies">
      <div class="container-main trusted-companies__inner">
        <p class="trusted-companies__title">
          100+ şirkət güvənlə bizi seçir
        </p>
        
        <div class="logo-marquee">
          <div class="logo-marquee__track">
            <div class="logo-marquee__group">
              @for (partner of partners; track partner.id) {
                <div class="logo-marquee__item">
                  <img [src]="partner.logoUrl" [alt]="partner.name + ' logo'" class="trusted-companies__logo" />
                </div>
              }
            </div>

            <div class="logo-marquee__group" aria-hidden="true">
              @for (partner of partners; track partner.id) {
                <div class="logo-marquee__item">
                  <img [src]="partner.logoUrl" alt="" class="trusted-companies__logo" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes logo-marquee {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }

    .trusted-companies {
      background-color: #ffffff;
      border-bottom: 1px solid var(--color-border);
      padding-block: 48px;
    }
    
    .trusted-companies__inner {
      display: flex;
      align-items: center;
      gap: 32px;
    }
    
    .trusted-companies__title {
      flex-shrink: 0;
      font-family: "BDO Grotesk", sans-serif;
      font-weight: 600;
      font-size: 24px;
      line-height: 100%;
      color: var(--color-black, #0a1642);
      margin: 0;
    }
    
    .logo-marquee {
      flex-grow: 1;
      overflow: hidden;
      min-width: 0;
      display: flex;
      mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    }
    
    .logo-marquee__track {
      display: flex;
      width: max-content;
      align-items: center;
      flex-wrap: nowrap;
      white-space: nowrap;
      animation: logo-marquee 18s linear infinite;
      will-change: transform;
    }
    
    .logo-marquee__group {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      gap: 56px;
      padding-right: 56px;
    }

    .logo-marquee__item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .trusted-companies__logo {
      height: 40px;
      width: auto;
      max-width: 180px;
      object-fit: contain;
      flex-shrink: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .logo-marquee__track {
        animation: none;
        transform: none;
      }
      .logo-marquee {
        overflow-x: auto;
        mask-image: none;
        -webkit-mask-image: none;
      }
    }

    @media (max-width: 1024px) {
      .logo-marquee__group {
        gap: 40px;
        padding-right: 40px;
      }
    }

    @media (max-width: 900px) {
      .trusted-companies__inner {
        flex-direction: column;
        text-align: center;
        gap: 24px;
      }
      
      .logo-marquee {
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      .logo-marquee__track {
        animation-duration: 15s;
      }
      .logo-marquee__group {
        gap: 32px;
        padding-right: 32px;
      }
    }
  `]
})
export class TrustedCompaniesSectionComponent {
  partners = PARTNERS;
}
