import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';

export interface ServiceAudience {
  readonly id: string;
  readonly label: string;
}

export const SERVICE_AUDIENCES: ReadonlyArray<ServiceAudience> = [
  { id: '1', label: 'Korporativ Bizneslər və Holdinqlər' },
  { id: '2', label: 'Banklar və Maliyyə Qurumları' },
  { id: '3', label: 'Sənaye və İstehsalat Şirkətləri' },
  { id: '4', label: 'Hökumət və Dövlət Qurumları' },
  { id: '5', label: 'Tibbi və Səhiyyə Müəssisələri' },
  { id: '6', label: 'Təhsil və Akademik İnstitutlar' },
  { id: '7', label: 'Pərakəndə Satış və Elektron Ticarət' },
  { id: '8', label: 'Qeyri-Kommersiya və Beynəlxalq Təşkilatlar' },
  { id: '9', label: 'Startaplar və Kiçik-Orta Müəssisələr (KOB)' },
];

@Component({
  selector: 'app-service-audience-section',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-16 sm:py-24 lg:py-28 bg-[#F7F9FC]">
      <div class="container-main">
        <!-- Section Title -->
        <h2
          appReveal
          revealDirection="up"
          [revealDelay]="0"
          class="font-bdo font-bold text-[32px] sm:text-[48px] lg:text-[60px] leading-[1.15] lg:leading-[60px] text-[#0A1642] tracking-normal mb-8 sm:mb-12 text-left"
        >
          Kimlər faydalana bilər?
        </h2>

        <!-- Text-Only Audience Boxes -->
        <div class="flex flex-wrap items-stretch gap-3 sm:gap-4">
          @for (item of audiences; track item.id; let i = $index) {
            <div
              appReveal
              revealDirection="up"
              [revealDelay]="i * 40"
              class="w-full sm:w-auto bg-white rounded-[12px] px-6 py-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] flex items-center justify-start min-h-[54px]"
            >
              <span
                class="font-bdo font-normal text-[15px] sm:text-[16px] leading-[1.3] text-[#0A1642] text-left"
              >
                {{ item.label }}
              </span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServiceAudienceSectionComponent {
  readonly audiences = SERVICE_AUDIENCES;
}
