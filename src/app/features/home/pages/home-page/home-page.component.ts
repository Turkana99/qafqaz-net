import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { TrustedCompaniesSectionComponent } from '../../components/trusted-companies-section/trusted-companies-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { CallToActionSectionComponent } from '../../components/call-to-action-section/call-to-action-section.component';
import { PartnersSectionComponent } from '../../components/partners-section/partners-section.component';
import { LatestBlogsSectionComponent } from '../../components/latest-blogs-section/latest-blogs-section.component';
import { PublicApiService } from '../../../../core/services/public-api.service';
import { LanguageService } from '../../../../core/services/language.service';
import { HomeInfo } from '../../../../core/models/api.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    TrustedCompaniesSectionComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
    CallToActionSectionComponent,
    PartnersSectionComponent,
    LatestBlogsSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col">
      <app-hero-section [content]="getContentByKey('hero')"></app-hero-section>
      <app-trusted-companies-section [items]="homeInfo()?.partners"></app-trusted-companies-section>
      <app-about-section [content]="getContentByKey('about')"></app-about-section>
      <app-services-section [items]="homeInfo()?.featuredServices"></app-services-section>
      <app-call-to-action-section></app-call-to-action-section>
      <app-partners-section [items]="homeInfo()?.partners"></app-partners-section>
      <app-latest-blogs-section [items]="homeInfo()?.latestNews"></app-latest-blogs-section>
    </div>
  `
})
export class HomePageComponent {
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly homeInfo = signal<HomeInfo | null>(null);

  constructor() {
    this.languageService.locale$.pipe(
      switchMap(() => this.apiService.getHomeInfo().pipe(
        catchError(() => of(null))
      )),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      this.homeInfo.set(data);
    });
  }

  getContentByKey(key: string): any {
    const contents = this.homeInfo()?.pageContents;
    if (!contents) return undefined;
    if (Array.isArray(contents)) {
      return contents.find(item => item.key === key || item['sectionKey'] === key || item['section_key'] === key);
    }
    return (contents as Record<string, any>)[key];
  }
}