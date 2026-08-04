import {ChangeDetectionStrategy, Component, signal, computed, inject, DestroyRef} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ALL_BLOGS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {BlogCardComponent} from '../../../../shared/ui/blog-card/blog-card.component';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
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
          Bloqlar
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
                      {{ fb.shortDescription || fb.description || '' }}
                    </p>
                    
                    <div class="mt-auto flex flex-wrap items-center gap-3">
                      <div 
                        class="min-w-[124px] h-[36px] rounded-[8px] px-[16px] flex items-center justify-center font-bdo font-normal text-[16px] leading-[28px] text-white shrink-0"
                        [style.backgroundColor]="getCategoryColor(fb.categoryName || fb.category || '')"
                      >
                        {{ fb.categoryName || fb.category || 'İcmal' }}
                      </div>
                      <span class="font-bdo font-normal text-[16px] leading-[28px] text-[#80899D] shrink-0 whitespace-nowrap">
                        {{ fb.publishedAt || fb.date }}
                      </span>
                    </div>
                  </div>

                  <!-- Image -->
                  @if (fb.coverImage || fb.coverImageUrl || fb.imageUrl) {
                    <div class="w-full lg:max-w-[402px] h-[250px] lg:h-[414px] shrink-0 rounded-[12px] overflow-hidden flex-1 lg:flex-none">
                      <img 
                        [src]="fb.coverImage || fb.coverImageUrl || fb.imageUrl" 
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
                Yeniliklər
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
                      {{ news.publishedAt || news.date }}
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
              Ən son məqalələr
            </h2>
            
            <div appReveal revealDirection="right" [revealDelay]="100" class="flex items-center gap-1 bg-[#F7F9FC] p-[10px] rounded-[12px] overflow-x-auto mx-auto md:mx-0 w-full md:w-auto max-w-full no-scrollbar">
              @for (tab of categories(); track tab.id) {
                <button 
                  type="button"
                  (click)="selectTab(tab.id)"
                  [attr.aria-selected]="selectedTab() === tab.id"
                  class="min-w-max px-4 py-2 font-bdo font-normal text-[16px] leading-[28px] rounded-[8px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642]"
                  [class.bg-white]="selectedTab() === tab.id"
                  [class.text-[#0A1642]]="selectedTab() === tab.id"
                  [class.shadow-sm]="selectedTab() === tab.id"
                  [class.text-[#A0A9BD]]="selectedTab() !== tab.id"
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
          
          <!-- Pagination -->
          @if (totalPages() > 1) {
            <div appReveal revealDirection="up" [revealDelay]="200" class="flex items-center justify-center relative h-[48px]">
              @if (currentPage() > 1) {
                <button 
                  type="button"
                  (click)="prevPage()"
                  class="absolute left-0 w-[48px] h-[48px] bg-[#F7F9FC] hover:bg-[#E2E8F0] text-[#0A1642] rounded-[12px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642]"
                  aria-label="Previous page"
                >
                  <span
                    aria-hidden="true"
                    class="h-5 w-5 bg-current rotate-180 transition-transform"
                    style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
                  ></span>
                </button>
              }
              
              <span class="font-bdo font-medium text-[16px] text-[#0A1642]">
                {{ currentPage() }}/{{ totalPages() }}
              </span>
              
              <button 
                type="button"
                (click)="nextPage()"
                [disabled]="currentPage() >= totalPages()"
                class="absolute right-0 w-[48px] h-[48px] bg-[#F7F9FC] hover:bg-[#E2E8F0] text-[#0A1642] rounded-[12px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <span
                  aria-hidden="true"
                  class="h-5 w-5 bg-current"
                  style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
                ></span>
              </button>
            </div>
          }
        </div>
      </section>
    </div>
  `
})
export class BlogsPageComponent {
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly destroyRef = inject(DestroyRef);

    allBlogsMock = ALL_BLOGS;

    readonly featuredBlog = signal<any>(this.allBlogsMock.find(b => b.slug === 'iyun-sertifikat') || this.allBlogsMock[0]);
    readonly newsBlogs = signal<any[]>(this.allBlogsMock.filter(b => b.slug === 'tehlukesizlik-it' || b.slug === 'it-konsaltinq-merhele'));

    readonly categories = signal<{ id: string | number; name: string }[]>([
      { id: 'all', name: 'Hamısı' },
      { id: 'Texnologiya', name: 'Texnologiya' },
      { id: 'Elm', name: 'Elm' },
      { id: 'İcmal', name: 'İcmal' },
      { id: 'Biznes', name: 'Biznes' }
    ]);
    readonly selectedTab = signal<string | number>('all');
    readonly currentPage = signal<number>(1);

    readonly paginatedBlogs = signal<any[]>(this.allBlogsMock.slice(0, 6));
    readonly totalPages = signal<number>(1);

    constructor() {
      // Reload on locale change
      this.languageService.locale$.pipe(
        switchMap(() => forkJoin({
          cats: this.apiService.getBlogCategories().pipe(catchError(() => of([]))),
          topPosts: this.apiService.getBlogs(1, 10).pipe(catchError(() => of(null))),
        })),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(({ cats, topPosts }) => {
        if (cats && cats.length > 0) {
          this.categories.set([
            { id: 'all', name: 'Hamısı' },
            ...cats
          ]);
        }
        if (topPosts && topPosts.data && topPosts.data.length > 0) {
          const list = topPosts.data;
          this.featuredBlog.set(list[0]);
          this.newsBlogs.set(list.slice(1, 3));
        }
        this.loadBlogs();
      });
    }

    loadBlogs() {
      const catId = this.selectedTab() === 'all' ? undefined : this.selectedTab();
      this.apiService.getBlogs(this.currentPage(), 6, catId).pipe(
        catchError(() => of(null))
      ).subscribe((res) => {
        if (res && res.data) {
          this.paginatedBlogs.set(res.data);
          this.totalPages.set(res.meta?.total_pages || 1);
        }
      });
    }

    selectTab(tab: string | number) {
      this.selectedTab.set(tab);
      this.currentPage.set(1);
      this.loadBlogs();
    }

    nextPage() {
      if (this.currentPage() < this.totalPages()) {
        this.currentPage.update(p => p + 1);
        this.scrollToTop();
        this.loadBlogs();
      }
    }

    prevPage() {
      if (this.currentPage() > 1) {
        this.currentPage.update(p => p - 1);
        this.scrollToTop();
        this.loadBlogs();
      }
    }

    private scrollToTop() {
      const el = document.getElementById('blog-list');
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    }

    getCategoryColor(category: string): string {
      if (!category) return '#78D995';
      const cat = category.toLowerCase();
      if (cat.includes('icmal')) return '#78D995';
      if (cat.includes('məhsul')) return '#FFC778';
      if (cat.includes('texnologiya')) return '#82B4FF';
      if (cat.includes('araşdırma')) return '#D5ADFF';
      if (cat.includes('elm')) return '#48BB78';
      if (cat.includes('biznes')) return '#63B3ED';
      return '#78D995';
    }
}
