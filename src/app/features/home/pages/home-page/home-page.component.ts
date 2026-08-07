import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of, forkJoin } from 'rxjs';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { TrustedCompaniesSectionComponent } from '../../components/trusted-companies-section/trusted-companies-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { CallToActionSectionComponent } from '../../components/call-to-action-section/call-to-action-section.component';
import { PartnersSectionComponent } from '../../components/partners-section/partners-section.component';
import { LatestBlogsSectionComponent } from '../../components/latest-blogs-section/latest-blogs-section.component';
import { PublicApiService } from '../../../../core/services/public-api.service';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { HomeInfo } from '../../../../core/models/api.model';
import { ABOUT_STATS, AboutStatistic } from '../../../../core/constants/mock-data';

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
      <app-hero-section
        [title]="heroTitle()"
        [description]="heroDescription()"
        [heroFeatures]="heroFeatures()"
        [content]="getContentByKey('hero')"
      ></app-hero-section>
      <app-trusted-companies-section [items]="partnersList()"></app-trusted-companies-section>
      <app-about-section
        [title]="aboutTitle()"
        [subtitle]="aboutSubtitle()"
        [body]="aboutBody()"
        [content]="getContentByKey('about')"
        [stats]="aboutStats()"
        [keyFactsTitle]="keyFactsTitle()"
        [companyFacts]="companyFacts()"
        [imageUrl]="heroImageUrl()"
      ></app-about-section>
      <app-services-section
        [title]="servicesTitle()"
        [subtitle]="servicesSubtitle()"
        [body]="servicesBody()"
        [items]="serviceCards()"
      ></app-services-section>
      <app-call-to-action-section></app-call-to-action-section>
      <app-partners-section
        [title]="partnersTitle()"
        [body]="partnersBody()"
        [buttonText]="partnersButtonText()"
        [items]="partnersList()"
      ></app-partners-section>
      <app-latest-blogs-section
        [title]="blogTitle()"
        [body]="blogBody()"
        [items]="featuredBlogs()"
      ></app-latest-blogs-section>
    </div>
  `
})
export class HomePageComponent {
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly translationService = inject(TranslationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly homeInfo = signal<HomeInfo | null>(null);
  readonly heroTitle = signal<string>('');
  readonly heroDescription = signal<string>('');
  readonly heroFeatures = signal<{ icon: string; text: string }[] | undefined>(undefined);
  readonly serviceCards = signal<any[] | undefined>(undefined);

  readonly aboutTitle = signal<string | undefined>(undefined);
  readonly aboutSubtitle = signal<string | undefined>(undefined);
  readonly aboutBody = signal<string | undefined>(undefined);

  readonly servicesTitle = signal<string | undefined>(undefined);
  readonly servicesSubtitle = signal<string | undefined>(undefined);
  readonly servicesBody = signal<string | undefined>(undefined);

  readonly partnersTitle = signal<string | undefined>(undefined);
  readonly partnersBody = signal<string | undefined>(undefined);
  readonly partnersButtonText = signal<string | undefined>(undefined);

  readonly blogTitle = signal<string | undefined>(undefined);
  readonly blogBody = signal<string | undefined>(undefined);

  readonly partnersList = signal<any[] | undefined>(undefined);
  readonly featuredBlogs = signal<any[] | undefined>(undefined);
  readonly aboutStats = signal<AboutStatistic[] | undefined>(undefined);
  readonly keyFactsTitle = signal<string | undefined>(undefined);
  readonly companyFacts = signal<{ title: string; description: string }[]>([]);
  readonly heroImageUrl = signal<string | undefined>(undefined);

  constructor() {
    this.languageService.locale$.pipe(
      switchMap((locale) => forkJoin({
        pageContent: this.apiService.getPageContents('home', locale).pipe(catchError(() => of(null))),
        aboutContent: this.apiService.getPageContents('about', locale).pipe(catchError(() => of(null))),
        servicesRes: this.apiService.getServices(1, 10, locale).pipe(catchError(() => of(null))),
        featuredRes: this.apiService.getFeaturedBlogs(locale).pipe(catchError(() => of(null))),
        partnersRes: this.apiService.getPartners().pipe(catchError(() => of(null)))
      })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(({ pageContent, aboutContent, servicesRes, featuredRes, partnersRes }) => {
      if (Array.isArray(partnersRes) && partnersRes.length > 0) {
        this.partnersList.set(partnersRes);
      }

      if (Array.isArray(featuredRes) && featuredRes.length > 0) {
        this.featuredBlogs.set(featuredRes);
      }

      if (servicesRes) {
        const list = Array.isArray(servicesRes.data) ? servicesRes.data : (Array.isArray(servicesRes) ? servicesRes : []);
        if (list.length > 0) {
          this.serviceCards.set(list);
        }
      }

      if (pageContent?.sections) {
        const secs = pageContent.sections;

        // 1. Hero
        if (secs.hero) {
          if (secs.hero.title) this.heroTitle.set(secs.hero.title);
          if (secs.hero.body) this.heroDescription.set(secs.hero.body);
        }

        // 2. Hero features
        if (Array.isArray(secs.hero_features?.items) && secs.hero_features.items.length > 0) {
          const sorted = [...secs.hero_features.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          const staticIcons = [
            'assets/icons/hugeicons_security-lock.svg',
            'assets/icons/lucide_chart-area.svg',
            'assets/icons/lucide_clock-fading.svg',
            'assets/icons/lucide_users-round.svg'
          ];
          const mapped = sorted.map((item: any, idx: number) => ({
            text: item.title || '',
            icon: staticIcons[idx % staticIcons.length]
          }));
          this.heroFeatures.set(mapped);
        }

        // 3. About snippet
        if (secs.about_snippet) {
          if (secs.about_snippet.title) this.aboutTitle.set(secs.about_snippet.title);
          if (secs.about_snippet.subtitle) this.aboutSubtitle.set(secs.about_snippet.subtitle);
          if (secs.about_snippet.body) this.aboutBody.set(secs.about_snippet.body);
        }

        // 4. Services intro
        if (secs.services_intro) {
          if (secs.services_intro.title) this.servicesTitle.set(secs.services_intro.title);
          if (secs.services_intro.subtitle) this.servicesSubtitle.set(secs.services_intro.subtitle);
          if (secs.services_intro.body) this.servicesBody.set(secs.services_intro.body);
        }

        // 5. Stats
        const rawStats = Array.isArray(secs.stats?.items) && secs.stats.items.length > 0
          ? [...secs.stats.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          : (Array.isArray(aboutContent?.sections?.stats?.items) && aboutContent.sections.stats.items.length > 0
            ? [...aboutContent.sections.stats.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            : null);

        if (Array.isArray(rawStats) && rawStats.length > 0) {
          try {
            const defaultStats = ABOUT_STATS;
            const updatedStats: AboutStatistic[] = rawStats.map((item: any, idx: number) => {
              const defaultStat = defaultStats[idx] || defaultStats[0];
              const rawVal = item.numericValue != null && item.numericValue !== ''
                ? String(item.numericValue)
                : (item.value != null ? String(item.value) : String(defaultStat.value));

              const numMatch = rawVal.match(/\d+/);
              const num = numMatch ? parseInt(numMatch[0], 10) : 0;
              const seq = num > 0
                ? [num, Math.round(num * 0.8), Math.round(num * 0.6), Math.round(num * 0.4), Math.round(num * 0.2), 1]
                : defaultStat.animationSequence;

              return {
                ...defaultStat,
                value: rawVal,
                showPlus: false,
                suffix: '',
                animationSequence: seq,
                label: item.title || item.label || defaultStat.label || '',
                description: item.description !== undefined ? item.description : defaultStat.description
              };
            });
            this.aboutStats.set(updatedStats);
          } catch (e) {}
        }

        // 6. Partners
        if (secs.partners) {
          if (secs.partners.title) this.partnersTitle.set(secs.partners.title);
          if (secs.partners.body) this.partnersBody.set(secs.partners.body);
          if (secs.partners.buttonText) this.partnersButtonText.set(secs.partners.buttonText);
        }

        // 7. Blog section
        if (secs.blog_section) {
          if (secs.blog_section.title) this.blogTitle.set(secs.blog_section.title);
          if (secs.blog_section.body) this.blogBody.set(secs.blog_section.body);
        }
      }

      if (aboutContent?.sections) {
        const sections = aboutContent.sections;
        if (sections.hero?.imageUrl) {
          this.heroImageUrl.set(sections.hero.imageUrl);
        }
        if (sections.key_facts) {
          if (sections.key_facts.title) {
            this.keyFactsTitle.set(sections.key_facts.title);
          }
          let newFacts: { title: string; description: string }[] = [];
          if (Array.isArray(sections.key_facts.items) && sections.key_facts.items.length > 0) {
            const sorted = [...sections.key_facts.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            newFacts = sorted.map((item: any) => ({
              title: item.title || '',
              description: item.description || ''
            }));
          } else if (sections.key_facts.body) {
            try {
              const rawFacts = typeof sections.key_facts.body === 'string'
                ? JSON.parse(sections.key_facts.body)
                : sections.key_facts.body;
              if (Array.isArray(rawFacts)) {
                rawFacts.forEach((item: any) => {
                  if (item.title) newFacts.push({ title: item.title, description: item.description || '' });
                });
              } else if (rawFacts && typeof rawFacts === 'object') {
                if (rawFacts.mission) newFacts.push({ title: rawFacts.mission.title || 'Missiyamız', description: rawFacts.mission.description || '' });
                if (rawFacts.vision) newFacts.push({ title: rawFacts.vision.title || 'Vizyonumuz', description: rawFacts.vision.description || '' });
                if (rawFacts.goal) newFacts.push({ title: rawFacts.goal.title || 'Hədəfimiz', description: rawFacts.goal.description || '' });
              }
            } catch (e) {}
          }
          if (newFacts.length > 0) this.companyFacts.set(newFacts);
        }
      }
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