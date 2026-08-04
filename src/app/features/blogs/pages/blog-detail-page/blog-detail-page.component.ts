import {ChangeDetectionStrategy, Component, computed, inject, signal, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {ALL_BLOGS} from '../../../../core/constants/mock-data';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {BlogCardComponent} from '../../../../shared/ui/blog-card/blog-card.component';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of, combineLatest} from 'rxjs';

@Component({
    selector: 'app-blog-detail-page',
    standalone: true,
    imports: [
        CommonModule, RouterLink, RevealDirective, BlogCardComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (blog(); as item) {
      <!-- Top Section with Blur -->
      <div class="bg-[#F7F9FC] backdrop-blur-[50px] pt-[180px]  w-full">
        <div class="container-main flex flex-col items-center">
          
          <!-- Category & Date Row -->
          <div 
            appReveal revealDirection="up" [revealDelay]="0"
            class="flex flex-wrap justify-center items-center gap-3 mb-8"
          >
            <div 
              class="min-w-[124px] h-[36px] rounded-[8px] px-[16px] flex items-center justify-center font-bdo font-normal text-[16px] leading-[28px] text-white shrink-0"
              [style.backgroundColor]="getCategoryColor(item.categoryName || item.category || '')"
            >
              {{ item.categoryName || item.category || 'İcmal' }}
            </div>
            <span class="font-bdo font-normal text-[16px] leading-[28px] text-[#80899D] shrink-0 whitespace-nowrap">
              {{ item.publishedAt || item.date }}
            </span>
          </div>

          <!-- Blog Title -->
          <h1 
            appReveal revealDirection="up" [revealDelay]="100"
            class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[58px] lg:leading-[70px] tracking-normal text-center text-[#0A1642] max-w-[1000px] m-0 mb-12"
          >
            {{ item.title }}
          </h1>

          <!-- Main Image -->
          @if (item.coverImage || item.coverImageUrl || item.imageUrl) {
            <div 
              appReveal revealDirection="up" [revealDelay]="200"
              class="w-full max-w-[1200px] h-[300px] md:h-[450px] lg:h-[600px] rounded-tl-[24px] rounded-tr-[24px] overflow-hidden"
            >
              <img 
                [src]="item.coverImage || item.coverImageUrl || item.imageUrl" 
                [alt]="item.title" 
                class="w-full h-full object-cover"
              />
            </div>
          }
        </div>
      </div>

      <!-- Article Content Section -->
      <section class="w-full bg-[#FFFFFF] py-16 md:py-24">
        <div 
          appReveal revealDirection="up" [revealDelay]="0"
          class="w-full max-w-[800px] mx-auto px-6 md:px-0"
        >
          <!-- Rich text body rendering -->
          <div 
            class="font-bdo text-[16px] leading-[1.6] text-[#0A1642] prose prose-lg max-w-none prose-headings:text-[#0A1642] prose-headings:font-bdo prose-headings:font-bold prose-a:text-[#4343FF]"
            [innerHTML]="item.content || item.body || defaultContent"
          ></div>
        </div>
      </section>

      <!-- Related Posts Section -->
      <section class="w-full bg-[#F7F9FC] py-16 md:py-24 lg:py-32">
        <div class="container-main flex flex-col gap-10 md:gap-16">
          
          <!-- Top Row -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 
              appReveal revealDirection="left" [revealDelay]="0"
              class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[56px] lg:leading-[70px] tracking-normal text-[#0A1642] m-0 text-center md:text-left"
            >
              Əlaqəli yazılar
            </h2>
            
            <a 
              appReveal revealDirection="right" [revealDelay]="100"
              routerLink="/blogs"
              class="group flex items-center justify-center gap-[6px] w-full md:w-[204px] h-[48px] rounded-[12px] px-[24px] bg-[#FFFFFF] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4343FF] focus-visible:ring-offset-2 mx-auto md:mx-0"
            >
              <span class="font-bdo font-medium text-[16px] leading-[100%] text-[#4343FF]">Daha çox göstər</span>
              <img src="assets/icons/serviceRightIcon.svg" alt="Right Arrow" class="w-5 h-5 object-contain transition-transform duration-300 group-hover:translate-x-1">
            </a>
          </div>

          <!-- Related Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            @for (relatedBlog of relatedBlogs(); track relatedBlog.slug || relatedBlog.id; let i = $index) {
              <div appReveal revealDirection="up" [revealDelay]="i * 100">
                <app-blog-card [blog]="relatedBlog"></app-blog-card>
              </div>
            }
          </div>
          
        </div>
      </section>
    } @else {
      <!-- Not found fallback -->
      <div class="bg-[#F7F9FC] pt-[180px] pb-32 w-full min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="font-bdo font-bold text-[48px] text-[#0A1642] mb-4">Məqalə tapılmadı</h1>
          <a routerLink="/blogs" class="text-[#4343FF] hover:underline font-bdo text-[18px]">Bloqlara qayıt</a>
        </div>
      </div>
    }
  `
})
export class BlogDetailPageComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly titleService = inject(Title);
    private readonly metaService = inject(Meta);
    private readonly destroyRef = inject(DestroyRef);

    readonly blog = signal<any | null>(null);
    readonly relatedBlogs = signal<any[]>(ALL_BLOGS.slice(0, 2));

    constructor() {
      combineLatest([
        this.route.paramMap,
        this.languageService.locale$
      ]).pipe(
        switchMap(([params]) => {
          const slug = params.get('slug');
          if (!slug) return of(null);
          return this.apiService.getBlogBySlug(slug).pipe(
            catchError(() => {
              const mock = ALL_BLOGS.find(b => b.slug === slug);
              return of(mock || null);
            })
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((post: any) => {
        this.blog.set(post);
        if (post) {
          const pageTitle = post.metaTitle || post.title || 'QafqazNet Blog';
          this.titleService.setTitle(pageTitle);

          const desc = post.metaDescription || post.shortDescription || post.description || '';
          if (desc) {
            this.metaService.updateTag({ name: 'description', content: desc });
          }

          // Fetch related posts
          this.apiService.getBlogs(1, 4, post.categoryId).pipe(
            catchError(() => of(null))
          ).subscribe((res) => {
            if (res && res.data) {
              const filtered = res.data.filter(b => b.slug !== post.slug).slice(0, 2);
              if (filtered.length > 0) {
                this.relatedBlogs.set(filtered);
              }
            }
          });
        }
      });
    }

    readonly defaultContent = `
    <p>Müasir biznes mühitində rəqəmsal transformasiya şirkətlərin davamlı inkişafı və rəqabət üstünlüyü qazanması üçün əsas amil kimi qəbul edilir. Lakin bir çox təşkilatlar bu prosesə haradan başlayacaqlarını və hansı texnologiyaların onların xüsusi ehtiyaclarına uyğun olduğunu müəyyən etməkdə çətinlik çəkirlər. İT konsaltinq məhz bu nöqtədə dövriyə girərək bizneslərə strateji və texniki bələdçilik edir.</p>
    
    <h2>İT konsaltinq prosesi bir neçə əsas mərhələdən ibarətdir və hər biri biznesinizin rəqəmsal infrastrukturu üçün vacib rol oynayır:</h2>
    
    <p><strong>1. Mövcud İnfrastrukturun Analizi (Assessment)</strong><br>
    Hər bir uğurlu İT strategiyası mövcud vəziyyətin dərindən təhlili ilə başlayır. İT mütəxəssisləri şirkətinizin hazırkı texnoloji infrastrukturunu, proqram təminatlarını və şəbəkə təhlükəsizliyini yoxlayırlar. Bu mərhələnin məqsədi sistemdəki zəif nöqtələri (vulnerability), səmərəsiz prosesləri və təkmilləşdirilməyə ehtiyac olan sahələri müəyyən etməkdir.</p>
    
    <p><strong>2. Strategiya və Planlaşdırma</strong><br>
    Təhlil mərhələsindən sonra əldə edilən məlumatlar əsasında biznes hədəflərinizə uyğun fərdi İT strategiyası hazırlanır. Bu strategiya, hansı yeni texnologiyaların tətbiq ediləcəyini, miqrasiya proseslərini (məsələn, bulud sistemlərinə keçid) və büdcə planlamasını əhatə edir. Düzgün strategiya həm vaxt, həm də resurslara qənaət etməyə imkan verir.</p>
    
    <p><strong>3. Tətbiq və İnteqrasiya</strong><br>
    Bu mərhələdə hazırlanan plan praktiki olaraq həyata keçirilir. Yeni proqram təminatları qurulur, şəbəkə yenilənir və zəruri sistemlər inteqrasiya olunur. Peşəkar İT konsaltinq xidməti bu keçidin biznes proseslərində fasilə (downtime) yaratmadan həyata keçirilməsini təmin edir.</p>
    
    <p>İT konsaltinq, biznesinizin yalnız bu gününü deyil, sabahını da təminata alan strateji bir investisiyadır. Rəqəmsal dünyada geri qalmamaq və biznes proseslərinizi optimallaşdırmaq üçün peşəkar dəstəkdən yararlanmaq şərtdir.</p>
  `;

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
