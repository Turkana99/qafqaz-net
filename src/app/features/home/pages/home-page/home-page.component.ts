import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { TrustedCompaniesSectionComponent } from '../../components/trusted-companies-section/trusted-companies-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { CallToActionSectionComponent } from '../../components/call-to-action-section/call-to-action-section.component';
import { PartnersSectionComponent } from '../../components/partners-section/partners-section.component';
import { LatestBlogsSectionComponent } from '../../components/latest-blogs-section/latest-blogs-section.component';

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
      <app-hero-section></app-hero-section>
      <app-trusted-companies-section></app-trusted-companies-section>
      <app-about-section></app-about-section>
      <app-services-section></app-services-section>
      <app-call-to-action-section></app-call-to-action-section>
      <app-partners-section></app-partners-section>
      <app-latest-blogs-section></app-latest-blogs-section>
    </div>
  `
})
export class HomePageComponent {}