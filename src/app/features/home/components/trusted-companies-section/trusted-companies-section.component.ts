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
        
        <div class="trusted-companies__logos">
          @for (partner of partners; track partner.id) {
            <img [src]="partner.logoUrl" [alt]="partner.name" class="trusted-companies__logo" />
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .trusted-companies {
      background-color: #ffffff;
      border-bottom: 1px solid var(--color-border);
      padding-block: 48px;
    }
    .trusted-companies__inner {
      display: grid;
      grid-template-columns: minmax(220px, 1.2fr) minmax(0, 3fr);
      align-items: center;
      gap: 32px;
    }
    .trusted-companies__title {
      font-family: "BDO Grotesk", sans-serif;
      font-weight: 600;
      font-style: normal;
      font-size: 24px;
      line-height: 100%;
      letter-spacing: 0;
      color: var(--color-black, #0a1642);
      margin: 0;
    }
    .trusted-companies__logos {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      align-items: center;
      justify-items: center;
      gap: 24px;
    }
    .trusted-companies__logo {
      width: auto;
      max-width: 150px;
      height: 32px;
      object-fit: contain;
      opacity: 0.85;
      transition: opacity 250ms ease;
    }
    .trusted-companies__logo:hover {
      opacity: 1;
    }

    @media (max-width: 900px) {
      .trusted-companies__inner {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 24px;
      }
      .trusted-companies__logos {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .trusted-companies__title {
        font-size: 20px;
      }
    }
    @media (max-width: 480px) {
      .trusted-companies__logos {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `]
})
export class TrustedCompaniesSectionComponent {
  partners = PARTNERS;
}
