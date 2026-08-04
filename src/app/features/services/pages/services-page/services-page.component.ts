import { ChangeDetectionStrategy, Component, inject, signal, DestroyRef } from '@angular/core';
import { CallToActionSectionComponent } from '../../../home/components/call-to-action-section/call-to-action-section.component';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal.directive';
import { ServiceCardComponent } from '../../../../shared/ui/service-card/service-card.component';
import { ServiceAudienceSectionComponent } from '../../components/service-audience-section/service-audience-section.component';
import { PublicApiService } from '../../../../core/services/public-api.service';
import { LanguageService } from '../../../../core/services/language.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    CallToActionSectionComponent,
    RevealDirective,
    ServiceCardComponent,
    ServiceAudienceSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- 1. Services Page Jumbotron Section (600px Desktop Target Height) -->
    <section
      class="bg-[#F7F9FC] pt-28 md:pt-36 lg:pt-24 pb-16 lg:pb-0 lg:h-[600px] flex flex-col items-center justify-center"
    >
      <div class="container-main flex flex-col items-center text-center w-full">
        <div class="max-w-[950px] w-full flex flex-col items-center text-center">
          <!-- Page Title -->
          <h1
            appReveal
            revealDirection="up"
            [revealDelay]="0"
            class="font-bdo font-bold text-[36px] leading-[44px] md:text-[48px] md:leading-[58px] lg:text-[60px] lg:leading-[76px] text-[#0A1642] tracking-normal text-center m-0"
          >
            {{ heroTitle() }}
          </h1>

          <!-- Page Description -->
          <p
            appReveal
            revealDirection="up"
            [revealDelay]="150"
            class="font-bdo font-normal text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#80899D] tracking-normal text-center max-w-[780px] mt-6 md:mt-8 m-0"
          >
            {{ heroDescription() }}
          </p>

          @if (heroImageUrl()) {
            <div
              appReveal
              revealDirection="up"
              [revealDelay]="200"
              class="w-full mt-8 flex justify-center"
            >
              <img
                [src]="heroImageUrl()"
                [alt]="heroTitle()"
                class="max-w-full h-auto rounded-[20px] object-cover"
              />
            </div>
          }
        </div>
      </div>
    </section>

    <!-- 2. Services Grid Section (Reusing Shared ServiceCardComponent) -->
    <section class="py-12 sm:py-20 lg:py-32 bg-white">
      <div class="container-main">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          @for (service of services(); track service.slug || service.id; let i = $index) {
            <app-service-card [service]="service" [revealDelay]="i * 80"></app-service-card>
          }
        </div>
      </div>
    </section>

    <!-- 3. "Kimlər faydalana bilər?" Section -->
    <app-service-audience-section
      [title]="whoCanBenefitTitle()"
      [items]="whoCanBenefitItems()"
    ></app-service-audience-section>

    <!-- 4. Shared Call To Action Section (Dark Variant) -->
    <app-call-to-action-section
      variant="dark"
      [title]="ctaTitle()"
      [description]="ctaBody()"
    ></app-call-to-action-section>
  `,
})
export class ServicesPageComponent {
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly services = signal<any[]>([]);
  readonly heroTitle = signal<string>('');
  readonly heroDescription = signal<string>('');
  readonly heroImageUrl = signal<string | null>(null);

  readonly ctaTitle = signal<string>('');
  readonly ctaBody = signal<string>('');

  readonly whoCanBenefitTitle = signal<string>('');
  readonly whoCanBenefitItems = signal<string[]>([]);

  constructor() {
    this.languageService.locale$.pipe(
      switchMap(() => forkJoin({
        services: this.apiService.getServices().pipe(catchError(() => of([]))),
        pageContent: this.apiService.getPageContents('services').pipe(catchError(() => of(null)))
      })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(({ services, pageContent }) => {
      if (Array.isArray(services)) {
        this.services.set(services);
      }
      if (pageContent?.sections) {
        const sections = pageContent.sections;
        if (sections.hero) {
          if (sections.hero.title) {
            this.heroTitle.set(sections.hero.title);
          }
          if (sections.hero.body) {
            this.heroDescription.set(sections.hero.body);
          }
          this.heroImageUrl.set(sections.hero.imageUrl || null);
        }
        if (sections.cta) {
          if (sections.cta.title) {
            this.ctaTitle.set(sections.cta.title);
          }
          if (sections.cta.body) {
            this.ctaBody.set(sections.cta.body);
          }
        }
        if (sections.who_can_benefit) {
          if (sections.who_can_benefit.title) {
            this.whoCanBenefitTitle.set(sections.who_can_benefit.title);
          }
          if (sections.who_can_benefit.body) {
            try {
              let parsed = sections.who_can_benefit.body;
              if (typeof parsed === 'string') {
                parsed = JSON.parse(parsed);
              }
              if (Array.isArray(parsed)) {
                this.whoCanBenefitItems.set(parsed);
              }
            } catch (e) {
              console.error('Error parsing who_can_benefit body JSON', e);
            }
          }
        }
      }
    });
  }
}
