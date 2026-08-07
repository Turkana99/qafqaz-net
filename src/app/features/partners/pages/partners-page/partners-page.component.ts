import {ChangeDetectionStrategy, Component, inject, signal, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PARTNERS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {TranslationService} from '../../../../core/services/translation.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of} from 'rxjs';

@Component({
    selector: 'app-partners-page',
    standalone: true,
    imports: [
        CommonModule, RevealDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- Hero Section -->
    <div class="bg-[#F7F9FC] pt-[180px] pb-16 md:pb-24 lg:pb-32 flex flex-col items-center justify-center">
      <div class="container-main w-full">
        <h1 
          appReveal revealDirection="up" [revealDelay]="0"
          class="font-bdo font-bold text-[40px] md:text-[50px] lg:text-[60px] leading-[1.2] lg:leading-[76px] tracking-normal text-center text-[#0A1642] m-0"
        >
          {{ t().ourPartners }}
        </h1>
      </div>
    </div>

    <!-- Partners Grid Section -->
    <section class="w-full bg-[#FFFFFF] py-16 md:py-24 lg:py-32">
      <div class="container-main">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1200px] mx-auto">
          @for (partner of partners(); track partner.id; let i = $index) {
            @if (partner.logoUrl || partner.logo || partner.imageUrl) {
              <div 
                appReveal revealDirection="up" [revealDelay]="i * 50"
                class="w-full min-h-[150px] rounded-[20px] bg-[#F7F9FC] p-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] flex items-center justify-center transition-all duration-300 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <img 
                  [src]="partner.logoUrl || partner.logo || partner.imageUrl" 
                  [alt]="partner.name"
                  class="w-auto h-auto max-w-[80%] max-h-[80px] object-contain"
                  loading="lazy"
                >
              </div>
            }
          }
        </div>
      </div>
    </section>
  `
})
export class PartnersPageComponent {
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly translationService = inject(TranslationService);
    private readonly destroyRef = inject(DestroyRef);

    readonly t = this.translationService.translations;

    readonly partners = signal<any[]>([...PARTNERS]);

    constructor() {
        this.languageService.locale$.pipe(
            switchMap(() => this.apiService.getPartners().pipe(
                catchError(() => of(null))
            )),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((res: any) => {
            const list = Array.isArray(res) ? res : (res && res.data ? res.data : []);
            if (list && list.length > 0) {
                this.partners.set(list);
            }
        });
    }
}
