import {ChangeDetectionStrategy, Component, signal, computed, inject, DestroyRef} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ALL_BLOGS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {BlogCardComponent} from '../../../../shared/ui/blog-card/blog-card.component';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {TranslationService} from '../../../../core/services/translation.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of, forkJoin} from 'rxjs';

@Component({
    selector: 'app-blogs-page',
    standalone: true,
    imports: [
        CommonModule, RouterLink, RevealDirective, BlogCardComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="bg-[#F7F9FC] pt-[180px]">
      <div class="container-main pb-24 md:pb-32">
        
        <!-- Page Title -->
        <h1 
          appReveal revealDirection="up" [revealDelay]="0"
          class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[1.2] lg:leading-[40px] tracking-normal text-center text-[#0A1642] mb-16 md:mb-24"
        >
          {{ heroTitle() || t().nav.blog }}
        </h1>

        <!-- Main Layout -->
        <div class="grid grid-cols-1 items-start gap-8
           lg:grid-cols-[minmax(0,1fr)_360px]
           xl:grid-cols-[792px_384px] xl:gap-6">
          
          <!-- Left: Featured Card -->
          <div appReveal revealDirection="left" [revealDelay]="100" class="w-full min-w-0">
            @if (featuredBlog(); as fb) {
              <a 
                [routerLink]="['/blogs', fb.slug]" 
                class="group block w-full lg:h-[456px] rounded-[24px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] focus-visible:ring-offset-2 hover:shadow-md transition-shadow duration-300 p-6 lg:pt-[21px] lg:pr-[21px] lg:pb-[21px] lg:pl-[48px] overflow-hidden"
              >
                <div class="flex flex-col-reverse lg:flex-row h-full gap-6 lg:gap-10">
                  
                  <!-- Text Content -->
                  <div class="flex flex-col justify-center flex-1 py-4 lg:py-8 min-w-0">
                    <h2 class="font-bdo font-bold text-[24px] leading-[32px] text-[#0A1642] mb-6 group-hover:text-[#4343FF] group-focus-visible:text-[#4343FF] transition-colors duration-300">
                      {{ fb.title }}
                    </h2>
                    <p class="font-bdo font-normal text-[16px] leading-[22px] text-[#80899D] mb-8 line-clamp-4 lg:line-clamp-none">
                      {{ fb.excerpt || fb.shortDescription || fb.description || '' }}
                    </p>
                    
                    <div class="mt-auto flex flex-wrap items-center gap-3">
                      <div 
                        class="min-w-[124px] h-[36px] rounded-[8px] px-[16px] flex items-center justify-center font-bdo font-normal text-[16px] leading-[28px] text-white shrink-0"
                        [style.backgroundColor]="getCategoryColor(fb.categoryName || fb.category || '')"
                      >
                        {{ fb.categoryName || fb.category || 'İcmal' }}
                      </div>
                      <span class="font-bdo font-normal text-[16px] leading-[28px] text-[#80899D] shrink-0 whitespace-nowrap">
                        {{ formatDate(fb.publishedAt || fb.date) }}
                      </span>
                    </div>
                  </div>

                  <!-- Image -->
                  @if (fb.coverImageUrl || fb.coverImage || fb.imageUrl) {
                    <div class="w-full lg:max-w-[402px] h-[250px] lg:h-[414px] shrink-0 rounded-[12px] overflow-hidden flex-1 lg:flex-none">
                      <img 
                        [src]="fb.coverImageUrl || fb.coverImage || fb.imageUrl" 
                        [alt]="fb.title" 
                        class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                      />
                    </div>
                  }
                  
                </div>
              </a>
            }
          </div>

          <!-- Right: News Section -->
          <div class="flex flex-col gap-6 w-full max-w-full lg:max-w-[384px] mx-auto lg:mx-0 mt-8 lg:mt-0 min-w-0">
            
            <!-- Section Title with Divider -->
            <div appReveal revealDirection="right" [revealDelay]="150" class="flex items-center gap-4 mb-2">
              <h2 class="font-bdo font-bold text-[24px] leading-[28px] text-[#0A1642] whitespace-nowrap m-0">
                {{ latestNewsTitle() || 'Yeniliklər' }}
              </h2>
              <div class="flex-grow h-[1px] bg-[#E2E8F0]"></div>
            </div>
            
            <!-- News Cards -->
            <div class="flex flex-col gap-6">
              @for (news of newsBlogs(); track news.slug; let i = $index) {
                <a 
                  appReveal revealDirection="up" [revealDelay]="250 + (i * 100)"
                  [routerLink]="['/blogs', news.slug]" 
                  class="group block w-full min-h-[184px] rounded-[24px] bg-white p-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] focus-visible:ring-offset-2 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <h3 class="font-bdo font-normal text-[18px] leading-[24px] text-[#0A1642] mb-6 group-hover:text-[#4343FF] group-focus-visible:text-[#4343FF] transition-colors duration-300 line-clamp-3">
                    {{ news.title }}
                  </h3>
                  
                  <div class="flex flex-wrap items-center gap-3 mt-auto">
                    <div 
                      class="min-w-max h-[36px] rounded-[8px] px-[16px] flex items-center justify-center font-bdo font-normal text-[16px] leading-[28px] text-white shrink-0"
                      [style.backgroundColor]="getCategoryColor(news.categoryName || news.category || '')"
                    >
                      {{ news.categoryName || news.category || 'İcmal' }}
                    </div>
                    <span class="font-bdo font-normal text-[16px] leading-[28px] text-[#80899D] shrink-0 whitespace-nowrap">
                      {{ formatDate(news.publishedAt || news.date) }}
                    </span>
                  </div>
                </a>
              }
            </div>

          </div>

        </div>
      </div>

      <!-- List Section -->
      <section id="blog-list" class="w-full bg-white py-20 md:py-24 lg:py-32">
        <div class="container-main">
          
          <!-- Title & Tabs -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-16">
            <h2 appReveal revealDirection="left" class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[70px] text-[#0A1642] m-0 text-center md:text-left">
              {{ recentArticlesTitle() || t().latestArticles }}
            </h2>
            
            <div appReveal revealDirection="right" [revealDelay]="100" class="flex items-center gap-1 bg-[#F7F9FC] p-[10px] rounded-[12px] overflow-x-auto mx-auto md:mx-0 w-full md:w-auto max-w-full no-scrollbar">
              @for (tab of displayCategories(); track tab.slug) {
                <button 
                  type="button"
                  (click)="selectTab(tab.slug)"
                  [attr.aria-selected]="selectedTab() === tab.slug"
                  class="min-w-max px-4 py-2 font-bdo font-normal text-[16px] leading-[28px] rounded-[8px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642]"
                  [class.bg-white]="selectedTab() === tab.slug"
                  [class.text-[#0A1642]]="selectedTab() === tab.slug"
                  [class.shadow-sm]="selectedTab() === tab.slug"
                  [class.text-[#A0A9BD]]="selectedTab() !== tab.slug"
                >
                  {{ tab.name }}
                </button>
              }
            </div>
          </div>
          
          <!-- Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            @for (blog of paginatedBlogs(); track blog.slug || blog.id; let i = $index) {
              <div appReveal revealDirection="up" [revealDelay]="i * 100">
                <app-blog-card [blog]="blog"></app-blog-card>
              </div>
            }
          </div>
          
          <!-- Pagination UI (matching Services Page) -->
          <div
            appReveal revealDirection="up"
            class="flex items-center justify-between mt-12 w-full max-w-[1200px] mx-auto"
          >
            <!-- Prev Page Button -->
            <div class="w-11 h-11">
              @if (hasPrev()) {
                <button
                  type="button"
                  (click)="prevPage()"
                  aria-label="Previous page"
                  class="w-11 h-11 rounded-[14px] bg-[#F7F9FC] hover:bg-[#EBF0F7] text-[#0000FE] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                >
                  <svg class="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              }
            </div>

            <!-- Page Indicator -->
            <span class="font-bdo font-normal text-[14px] md:text-[16px] text-[#80899D]">
              {{ currentPage() }}/{{ totalPages() }}
            </span>

            <!-- Next Page Button -->
            <div class="w-11 h-11">
              @if (hasNext()) {
                <button
                  type="button"
                  (click)="nextPage()"
                  aria-label="Next page"
                  class="w-11 h-11 rounded-[14px] bg-[#F7F9FC] hover:bg-[#EBF0F7] text-[#0000FE] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class BlogsPageComponent {
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly translationService = inject(TranslationService);
    private readonly destroyRef = inject(DestroyRef);

    readonly t = this.translationService.translations;

    allBlogsMock = ALL_BLOGS;

    readonly heroTitle = signal<string | undefined>(undefined);
    readonly latestNewsTitle = signal<string | undefined>(undefined);
    readonly recentArticlesTitle = signal<string | undefined>(undefined);

    readonly featuredBlog = signal<any>(null);
    readonly newsBlogs = signal<any[]>([]);

    readonly apiCategories = signal<{ id: string | number; slug: string; name: string }[]>([]);
    readonly displayCategories = computed(() => {
      const cats = this.apiCategories();
      return [{ id: 'all', slug: 'all', name: this.t().blog.filterAll }, ...cats];
    });

    readonly selectedTab = signal<string>('all');
    readonly selectedCategorySlug = signal<string | null>(null);
    readonly currentPage = signal<number>(1);
    readonly itemsPerPage = 6;
    readonly totalPages = signal<number>(1);
    readonly hasPrev = signal<boolean>(false);
    readonly hasNext = signal<boolean>(false);

    readonly paginatedBlogs = signal<any[]>([]);

    constructor() {
      // Reload on locale change
      this.languageService.locale$.pipe(
        switchMap((locale) => forkJoin({
          featuredRes: this.apiService.getFeaturedBlogs(locale).pipe(catchError(() => of([]))),
          cats: this.apiService.getBlogCategories(locale).pipe(catchError(() => of([]))),
          pageContent: this.apiService.getPageContents('blog', locale).pipe(catchError(() => of(null)))
        })),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(({ featuredRes, cats, pageContent }) => {
        if (Array.isArray(cats) && cats.length > 0) {
          const mappedCats = cats.map((c: any) => ({
            id: c.id,
            slug: String(c.slug || ''),
            name: c.name || c.title || ''
          }));
          this.apiCategories.set(mappedCats);
        }
        if (Array.isArray(featuredRes) && featuredRes.length > 0) {
          this.featuredBlog.set(featuredRes[0]);
          this.newsBlogs.set(featuredRes.slice(1, 3));
        } else {
          this.featuredBlog.set(this.allBlogsMock[0]);
          this.newsBlogs.set(this.allBlogsMock.slice(1, 3));
        }

        if (pageContent?.sections) {
          const secs = pageContent.sections;
          if (secs.hero?.title) {
            this.heroTitle.set(secs.hero.title);
          }
          if (secs.latest_news?.title) {
            this.latestNewsTitle.set(secs.latest_news.title);
          }
          if (secs.recent_articles?.title) {
            this.recentArticlesTitle.set(secs.recent_articles.title);
          }
        }

        this.loadBlogs();
      });
    }

    handleBlogsResponse(res: any) {
      if (res && res.data) {
        const list = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
        this.paginatedBlogs.set(list);
        if (res.meta) {
          const meta = res.meta;
          const currPage = meta.current_page ?? meta.currentPage ?? meta.page ?? this.currentPage();
          const totPages = meta.total_pages ?? meta.totalPages ?? Math.ceil((meta.total ?? list.length) / this.itemsPerPage) ?? 1;
          this.currentPage.set(currPage);
          this.totalPages.set(totPages);
          this.hasPrev.set(meta.has_prev ?? meta.hasPrev ?? (currPage > 1));
          this.hasNext.set(meta.has_next ?? meta.hasNext ?? (currPage < totPages));
        } else {
          this.totalPages.set(1);
          this.hasPrev.set(false);
          this.hasNext.set(false);
        }
      }
    }

    loadBlogs(locale?: string) {
      const slug = this.selectedCategorySlug();
      const currentLocale = locale || this.languageService.currentLocale();
      this.apiService.getBlogs(this.currentPage(), this.itemsPerPage, slug || undefined, currentLocale).pipe(
        catchError(() => of(null))
      ).subscribe((res) => {
        this.handleBlogsResponse(res);
      });
    }

    loadPage(page: number): void {
      this.currentPage.set(page);
      this.scrollToTop();
      this.loadBlogs();
    }

    selectTab(tab: any) {
      const slug = typeof tab === 'object' && tab !== null ? tab.slug : String(tab);
      if (!slug || slug === 'all') {
        this.selectedTab.set('all');
        this.selectedCategorySlug.set(null);
      } else {
        this.selectedTab.set(slug);
        this.selectedCategorySlug.set(slug);
      }
      this.currentPage.set(1);
      this.loadBlogs();
    }

    nextPage() {
      if (this.hasNext()) {
        this.loadPage(this.currentPage() + 1);
      }
    }

    prevPage() {
      if (this.hasPrev()) {
        this.loadPage(this.currentPage() - 1);
      }
    }

    private scrollToTop() {
      if (typeof document === 'undefined') return;
      const el = document.getElementById('blog-list');
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    }

    formatDate(dateStr?: string | null): string {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return String(dateStr);

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`;
    }

    getCategoryColor(category?: string | null): string {
      if (!category || !category.trim()) return '#78D995';

      const cat = category.toLowerCase().trim();

      if (cat.includes('texnologiya') || cat.includes('technology')) {
        return '#78D995';
      }

      if (cat.includes('araşdırma') || cat.includes('arasdirma') || cat.includes('research')) {
        return '#82B4FF';
      }

      if (cat.includes('məhsul') || cat.includes('mehsul') || cat.includes('product')) {
        return '#FFC778';
      }

      const palette = [
        '#78D995',
        '#82B4FF',
        '#FFC778',
        '#D5ADFF',
        '#4FD1C5',
        '#FF9E78',
        '#F6AD55'
      ];

      let hash = 0;
      for (let i = 0; i < cat.length; i++) {
        hash = cat.charCodeAt(i) + ((hash << 5) - hash);
      }

      const index = Math.abs(hash) % palette.length;
      return palette[index];
    }
}
