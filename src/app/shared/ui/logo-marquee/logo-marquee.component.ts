import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MarqueeLogo {
  readonly id: string;
  readonly name: string;
  readonly logoUrl: string;
}

@Component({
  selector: 'app-logo-marquee',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="logo-marquee"
      [class.logo-marquee--masked]="showFadeMask()"
    >
      <div
        class="logo-marquee__track"
        [style.animationDuration]="duration()"
      >
        <div
          class="logo-marquee__group"
          [style.gap.px]="gap()"
          [style.paddingRight.px]="gap()"
        >
          @for (logo of logos(); track logo.id) {
            <div class="logo-marquee__item">
              <img
                [src]="logo.logoUrl"
                [alt]="logo.name + ' logo'"
                class="logo-marquee__logo"
                [style.height.px]="logoHeight()"
              />
            </div>
          }
        </div>

        <div
          class="logo-marquee__group"
          [style.gap.px]="gap()"
          [style.paddingRight.px]="gap()"
          aria-hidden="true"
        >
          @for (logo of logos(); track logo.id) {
            <div class="logo-marquee__item">
              <img
                [src]="logo.logoUrl"
                alt=""
                class="logo-marquee__logo"
                [style.height.px]="logoHeight()"
              />
            </div>
          }
        </div>
      </div>
    </div>
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

    :host {
      display: block;
      width: 100%;
    }

    .logo-marquee {
      width: 100%;
      overflow: hidden;
      min-width: 0;
      display: flex;
    }

    .logo-marquee--masked {
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
    }

    .logo-marquee__item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .logo-marquee__logo {
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
  `]
})
export class LogoMarqueeComponent {
  logos = input.required<ReadonlyArray<MarqueeLogo>>();
  duration = input<string>('18s');
  logoHeight = input<number>(40);
  gap = input<number>(56);
  showFadeMask = input<boolean>(true);
}
