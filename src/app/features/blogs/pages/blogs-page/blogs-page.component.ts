import {ChangeDetectionStrategy, Component, signal, computed} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ALL_BLOGS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {BlogCardComponent} from '../../../../shared/ui/blog-card/blog-card.component';

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
            @if (featuredBlog) {
              <a 
                [routerLink]="['/blogs', featuredBlog.slug]" 
                class="group block w-full lg:h-[456px] rounded-[24px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] focus-visible:ring-offset-2 hover:shadow-md transition-shadow duration-300 p-6 lg:pt-[21px] lg:pr-[21px] lg:pb-[21px] lg:pl-[48px] overflow-hidden"
              >
                <div class="flex flex-col-reverse lg:flex-row h-full gap-6 lg:gap-10">
                  
                  <!-- Text Content -->
                  <div class="flex flex-col justify-center flex-1 py-4 lg:py-8 min-w-0">
                    <h2 class="font-bdo font-bold text-[24px] leading-[32px] text-[#0A1642] mb-6 group-hover:text-[#4343FF] group-focus-visible:text-[#4343FF] transition-colors duration-300">
                      {{ featuredBlog.title }}
                    </h2>
                    <p class="font-bdo font-normal text-[16px] leading-[22px] text-[#80899D] mb-8 line-clamp-4 lg:line-clamp-none">
                      İyun ayında komandamızın dörd üzvü beynəlxalq səviyyəli İT sertifikatları qazanaraq texniki biliklərini və peşəkar səriştələrini daha da möhkəmləndirib.
                    </p>
                    
                    <div class="mt-auto flex flex-wrap items-center gap-3">
                      <div 
                        class="min-w-[124px] h-[36px] rounded-[8px] px-[16px] flex items-center justify-center font-bdo font-normal text-[16px] leading-[28px] text-white shrink-0"
                        [style.backgroundColor]="getCategoryColor(featuredBlog.category)"
                      >
                        {{ featuredBlog.category }}
                      </div>
                      <span class="font-bdo font-normal text-[16px] leading-[28px] text-[#80899D] shrink-0 whitespace-nowrap">
                        {{ featuredBlog.date }}
                      </span>
                    </div>
                  </div>

                  <!-- Image -->
                  <div class="w-full lg:max-w-[402px] h-[250px] lg:h-[414px] shrink-0 rounded-[12px] overflow-hidden flex-1 lg:flex-none">
                    <img 
                      [src]="featuredBlog.imageUrl" 
                      [alt]="featuredBlog.title" 
                      class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                    />
                  </div>
                  
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
              @for (news of newsBlogs; track news.slug; let i = $index) {
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
                      [style.backgroundColor]="getCategoryColor(news.category)"
                    >
                      {{ news.category }}
                    </div>
                    <span class="font-bdo font-normal text-[16px] leading-[28px] text-[#80899D] shrink-0 whitespace-nowrap">
                      {{ news.date }}
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
              @for (tab of categories; track tab) {
                <button 
                  type="button"
                  (click)="selectTab(tab)"
                  [attr.aria-selected]="selectedTab() === tab"
                  class="min-w-max px-4 py-2 font-bdo font-normal text-[16px] leading-[28px] rounded-[8px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1642]"
                  [class.bg-white]="selectedTab() === tab"
                  [class.text-[#0A1642]]="selectedTab() === tab"
                  [class.shadow-sm]="selectedTab() === tab"
                  [class.text-[#A0A9BD]]="selectedTab() !== tab"
                >
                  {{ tab }}
                </button>
              }
            </div>
          </div>
          
          <!-- Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            @for (blog of paginatedBlogs(); track blog.slug; let i = $index) {
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
    allBlogs = ALL_BLOGS;

    featuredBlog = this.allBlogs.find(b => b.slug === 'iyun-sertifikat');
    newsBlogs = this.allBlogs.filter(b => b.slug === 'tehlukesizlik-it' || b.slug === 'it-konsaltinq-merhele');

    listBlogs = this.allBlogs.filter(b => b.slug !== 'iyun-sertifikat' && b.slug !== 'tehlukesizlik-it' && b.slug !== 'it-konsaltinq-merhele');

    categories = [
        'Hamısı',
        'Texnologiya',
        'Elm',
        'İcmal',
        'Biznes'
    ];
    selectedTab = signal < string > ('Hamısı');
    currentPage = signal < number > (1);

    filteredBlogs = computed(() => {
        const tab = this.selectedTab();
        if (tab === 'Hamısı') 
            return this.listBlogs;
        


        return this.listBlogs.filter(b => b.category === tab);
    });

    totalPages = computed(() => Math.max(1, Math.ceil(this.filteredBlogs().length / 6)));

    paginatedBlogs = computed(() => {
        const page = this.currentPage();
        const start = (page - 1) * 6;
        return this.filteredBlogs().slice(start, start + 6);
    });

    selectTab(tab : string) {
        this.selectedTab.set(tab);
        this.currentPage.set(1);
    }

    nextPage() {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update(p => p + 1);
            this.scrollToTop();
        }
    }

    prevPage() {
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
            this.scrollToTop();
        }
    }

    private scrollToTop() {
        const el = document.getElementById('blog-list');
        if (el) {
            el.scrollIntoView({behavior: 'smooth'});
        }
    }

    getCategoryColor(category : string): string {
        if (category === 'İcmal' || category.toLowerCase().includes('icmal')) {
            return '#78D995';
        }
        if (category === 'Məhsul' || category.toLowerCase().includes('məhsul')) {
            return '#FFC778';
        }
        if (category === 'Texnologiya' || category.toLowerCase().includes('texnologiya')) {
            return '#82B4FF';
        }
        return '#E2E8F0';
    }
}
