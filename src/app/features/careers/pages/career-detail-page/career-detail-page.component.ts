import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
    DestroyRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of, combineLatest} from 'rxjs';

interface VacancyDetail {
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    readonly type: string;
    readonly city: string;
    readonly workDays: string;
    readonly workHours: string;
    readonly deadline: string;
    readonly content: string;
}

@Component({
    selector: 'app-career-detail-page',
    standalone: true,
    imports: [
        CommonModule, RevealDirective, ReactiveFormsModule, RouterLink
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (vacancy(); as item) {
      <!-- Jumbotron -->
      <section class="w-full bg-[#F7F9FC] pt-[180px] pb-16 lg:pb-32">
        <div class="container-main">
          <div class="flex flex-col lg:flex-row justify-between lg:items-start gap-12 lg:gap-8">
            
            <!-- Left Content -->
            <div class="w-full lg:max-w-[650px] xl:max-w-[700px] flex flex-col items-start lg:pt-4">
              <h1 
                appReveal revealDirection="left" [revealDelay]="0"
                class="font-bdo font-bold text-[36px] md:text-[48px] lg:text-[60px] leading-[44px] md:leading-[58px] lg:leading-[70px] tracking-normal text-[#0A1642] mb-6"
              >
                {{ item.title }}
              </h1>
              
              <p 
                appReveal revealDirection="left" [revealDelay]="100"
                class="font-bdo font-normal text-[18px] leading-[2.5] lg:leading-[30px] text-[#80899D] mb-10 lg:mb-16"
              >
                {{ item.description }}
              </p>
              
              <button 
                appReveal revealDirection="up" [revealDelay]="200"
                (click)="scrollToForm()"
                class="group inline-flex items-center justify-center font-bdo font-medium text-[16px] text-white btn-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4343FF] active:scale-[0.98] btn-gradient w-[204px] h-[52px] md:w-[203px] md:h-[64px] rounded-[16px] px-6 gap-[6px] border-none"
              >
                <span>Müraciət et</span>
                <img src="assets/icons/right.svg" alt="Right Arrow" class="w-5 h-5 object-contain transition-transform duration-300 group-hover:translate-x-1 brightness-0 invert">
              </button>
            </div>

            <!-- Right Content: Info Card -->
            <div 
              appReveal revealDirection="right" [revealDelay]="100"
              class="w-full lg:w-[347px] shrink-0 lg:-mb-[160px] xl:-mb-[200px] relative z-10"
            >
              <div class="w-full lg:h-[388px] bg-[#FFFFFF] rounded-[24px] p-6 md:p-8 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] flex flex-col gap-[10px]">
                
                <!-- Card Title -->
                <h2 class="font-bdo font-bold text-[24px] leading-[40px] tracking-normal text-[#0A1642] mb-4">
                  Vakansiya haqqında
                </h2>
                
                <!-- Info Rows -->
                <div class="flex flex-col gap-6">
                  
                  <!-- 1. Növü -->
                  <div class="grid grid-cols-[1fr_auto] items-center gap-x-6">
                    <span class="font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642]">Vakansiya növü</span>
                    <span class="font-bdo font-medium text-[16px] leading-[24px] text-[#0A1642] text-right">{{ item.type }}</span>
                  </div>

                  <!-- 2. Yer -->
                  <div class="grid grid-cols-[1fr_auto] items-center gap-x-6">
                    <span class="font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642]">Yer</span>
                    <span class="font-bdo font-medium text-[16px] leading-[24px] text-[#0A1642] text-right">{{ item.city }}</span>
                  </div>

                  <!-- 3. İş günləri -->
                  <div class="grid grid-cols-[1fr_auto] items-center gap-x-6">
                    <span class="font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642]">İş günləri</span>
                    <span class="font-bdo font-medium text-[16px] leading-[24px] text-[#0A1642] text-right">{{ item.workDays }}</span>
                  </div>

                  <!-- 4. İş saatı -->
                  <div class="grid grid-cols-[1fr_auto] items-center gap-x-6">
                    <span class="font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642]">İş saatı</span>
                    <span class="font-bdo font-medium text-[16px] leading-[24px] text-[#0A1642] text-right">{{ item.workHours }}</span>
                  </div>

                  <!-- 5. Son müraciət tarixi -->
                  <div class="grid grid-cols-[1fr_auto] items-center gap-x-6">
                    <span class="font-bdo font-normal text-[16px] leading-[24px] text-[#0A1642]">Son müraciət</span>
                    <span class="font-bdo font-medium text-[16px] leading-[24px] text-[#0A1642] text-right">{{ item.deadline }}</span>
                  </div>

                </div>
                
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Details Section -->
      <section class="w-full bg-[#FFFFFF] pt-12 lg:pt-16 pb-16 lg:pb-32">
        <div class="container-main">
          <div 
            appReveal revealDirection="up" [revealDelay]="0"
            class="w-full lg:max-w-[750px] xl:max-w-[800px] rich-text-content"
            [innerHTML]="item.content || mockContent"
          ></div>
        </div>
      </section>

      <!-- Apply Form Section -->
      <section id="apply-form-section" class="w-full bg-[#FFFFFF] pb-16 lg:pb-32">
        <div class="container-main">
          <div class="max-w-[1200px] mx-auto bg-[#F7F9FC] rounded-[32px] p-6 sm:p-10 lg:p-16">
            
            <!-- Section Title -->
            <h2 
              appReveal revealDirection="up" [revealDelay]="0"
              class="font-bdo font-bold text-[28px] md:text-[36px] leading-[40px] tracking-normal text-[#0A1642] mb-8"
            >
              Uğurun bir hissəsi ol!
            </h2>

            <!-- Form -->
            <form [formGroup]="applyForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-6 max-w-[800px]">
              
              <!-- Success Alert -->
              @if (successMessage()) {
                <div class="p-4 rounded-[12px] bg-green-50 border border-green-200 text-green-800 font-bdo text-[15px] flex items-center gap-2">
                  <span>{{ successMessage() }}</span>
                </div>
              }

              <!-- Error Alert -->
              @if (errorMessage()) {
                <div class="p-4 rounded-[12px] bg-red-50 border border-red-200 text-red-800 font-bdo text-[15px] flex items-center gap-2">
                  <span>{{ errorMessage() }}</span>
                </div>
              }

              <!-- Full Name -->
              <div class="flex flex-col gap-2">
                <label class="font-bdo font-normal text-[16px] text-[#80899D]">
                  Ad və Soyad<span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  formControlName="fullName"
                  placeholder="Həsən Həsənov"
                  class="w-full h-[56px] rounded-[12px] bg-[#FFFFFF] border border-transparent px-6 font-bdo text-[16px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
                  [class.border-red-500]="applyForm.get('fullName')?.invalid && applyForm.get('fullName')?.touched"
                >
                @if (applyForm.get('fullName')?.invalid && applyForm.get('fullName')?.touched) {
                  <span class="text-red-500 font-bdo text-[13px]">Zəhmət olmasa ad və soyadınızı daxil edin</span>
                }
              </div>

              <!-- Email and Phone Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Email -->
                <div class="flex flex-col gap-2">
                  <label class="font-bdo font-normal text-[16px] text-[#80899D]">
                    E-poçt<span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    formControlName="email"
                    placeholder="example@mail.com"
                    class="w-full h-[56px] rounded-[12px] bg-[#FFFFFF] border border-transparent px-6 font-bdo text-[16px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
                    [class.border-red-500]="applyForm.get('email')?.invalid && applyForm.get('email')?.touched"
                  >
                  @if (applyForm.get('email')?.invalid && applyForm.get('email')?.touched) {
                    <span class="text-red-500 font-bdo text-[13px]">Düzgün e-poçt ünvanı daxil edin</span>
                  }
                </div>

                <!-- Phone -->
                <div class="flex flex-col gap-2">
                  <label class="font-bdo font-normal text-[16px] text-[#80899D]">
                    Əlaqə nömrəsi<span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    formControlName="phone"
                    placeholder="+994 (00) 000 00 00"
                    class="w-full h-[56px] rounded-[12px] bg-[#FFFFFF] border border-transparent px-6 font-bdo text-[16px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
                    [class.border-red-500]="applyForm.get('phone')?.invalid && applyForm.get('phone')?.touched"
                  >
                  @if (applyForm.get('phone')?.invalid && applyForm.get('phone')?.touched) {
                    <span class="text-red-500 font-bdo text-[13px]">Əlaqə nömrəsi tələb olunur</span>
                  }
                </div>
              </div>

              <!-- Note / Message -->
              <div class="flex flex-col gap-2">
                <label class="font-bdo font-normal text-[16px] text-[#80899D]">
                  Qeyd və ya mesajınız
                </label>
                <textarea 
                  formControlName="note"
                  placeholder="Vakansiya ilə bağlı qeydiniz (isteğe bağlı)"
                  class="w-full h-[100px] rounded-[12px] bg-[#FFFFFF] border border-transparent p-4 font-bdo text-[16px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all resize-none"
                ></textarea>
              </div>

              <!-- CV Upload -->
              <div class="flex flex-col gap-2">
                <label class="font-bdo font-normal text-[16px] text-[#80899D]">
                  CV faylını yüklə<span class="text-red-500">*</span>
                </label>
                
                <div 
                  class="relative w-full h-[112px] bg-[#FFFFFF] rounded-[8px] border-[1px] border-dashed border-[#80899D] p-6 shadow-[0_2px_2px_0_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-[8px] cursor-pointer transition-colors hover:bg-gray-50 focus-within:ring-2 focus-within:ring-[#4343FF] focus-within:border-transparent"
                  [class.border-red-500]="(applyForm.get('cv')?.invalid && applyForm.get('cv')?.touched) || fileError()"
                >
                  <input 
                    type="file" 
                    id="cvUpload"
                    (change)="onFileChange($event)"
                    accept=".pdf,.doc,.docx"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  >
                  <!-- Icon and text -->
                  <div class="flex items-center gap-2">
                    <img src="assets/icons/upload.svg" alt="Upload" class="w-5 h-5 object-contain">
                    <span class="font-bdo font-medium text-[16px] text-[#80899D]">
                      {{ selectedFileName() ? selectedFileName() : 'CV faylını seç' }}
                    </span>
                  </div>
                  
                  <span class="font-bdo font-normal text-[12px] text-[#80899D]">
                    Sadəcə PDF və ya DOCX fayl (maks. 4mb)
                  </span>
                </div>
                @if (fileError()) {
                  <span class="font-bdo font-normal text-[14px] text-red-500">{{ fileError() }}</span>
                }
              </div>

              <!-- Submit button -->
              <div 
                appReveal revealDirection="up" [revealDelay]="400"
                class="mt-2"
              >
                <button 
                  type="submit"
                  [disabled]="applyForm.invalid || isSubmitting()"
                  class="group inline-flex items-center justify-center font-bdo font-medium text-[16px] text-white btn-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4343FF] active:scale-[0.98] btn-gradient w-[204px] h-[52px] md:w-[203px] md:h-[64px] rounded-[16px] px-6 gap-[6px] disabled:opacity-50 disabled:cursor-not-allowed border-none"
                >
                  <span>@if (isSubmitting()) { Göndərilir... } @else { Müraciət et }</span>
                  <img src="assets/icons/right.svg" alt="Right Arrow" class="w-5 h-5 object-contain transition-transform duration-300 group-hover:translate-x-1 brightness-0 invert">
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      <!-- More Vacancies Section -->
      <section class="w-full bg-[#F7F9FC] py-16 lg:py-32">
        <div class="container-main">
          
          <!-- Top Row -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-16">
            <h2 
              appReveal revealDirection="left" [revealDelay]="0"
              class="font-bdo font-bold text-[36px] md:text-[48px] leading-[40px] tracking-normal text-[#0A1642] m-0"
            >
              Daha çox vakansiya
            </h2>
            
            <a 
              routerLink="/careers"
              appReveal revealDirection="right" [revealDelay]="100"
              class="group inline-flex items-center justify-center font-bdo font-medium text-[16px] text-[#4343FF] bg-[#FFFFFF] w-full md:w-[250px] h-[48px] rounded-[12px] px-6 gap-[6px] transition-all duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4343FF] active:scale-[0.98]"
            >
              <span>Bütün vəzifələrə baxın</span>
              <span
                aria-hidden="true"
                class="h-5 w-5 bg-[#4343FF] group-hover:translate-x-1 transition-transform duration-300"
                style="mask: url('/assets/icons/right.svg') no-repeat center / contain; -webkit-mask: url('/assets/icons/right.svg') no-repeat center / contain;"
              ></span>
            </a>
          </div>

          <!-- Vacancy Cards -->
          <div class="flex flex-col gap-4 md:gap-6">
            @for (otherVacancy of otherVacancies(); track otherVacancy.slug; let i = $index) {
              <a 
                [routerLink]="['/careers', otherVacancy.slug]"
                appReveal revealDirection="up" [revealDelay]="i * 100"
                class="group w-full max-w-[1200px] mx-auto min-h-[132px] rounded-[20px] bg-[#FFFFFF] p-6 md:p-8 flex flex-col lg:grid lg:grid-cols-4 lg:items-center gap-4 lg:gap-4 transition-colors duration-300 hover:bg-[#EBF0F7] shadow-[0_2px_12px_rgba(0,0,0,0.02)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FE]"
              >
                <!-- 1. Vəzifə -->
                <h3 class="font-bdo font-bold text-[16px] md:text-[20px] leading-[24px] tracking-normal text-[#0A1642] m-0 group-hover:text-[#0000FE] transition-colors duration-300">
                  {{ otherVacancy.title }}
                </h3>
                
                <!-- 2. Vakansiya növü -->
                <div class="flex items-center gap-2">
                  <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">Vakansiya növü:</span>
                  <div class="flex items-center gap-2">
                    <img src="assets/icons/clockIcon.svg" alt="Type" class="w-5 h-5 object-contain">
                    <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ otherVacancy.type }}</span>
                  </div>
                </div>

                <!-- 3. Yer -->
                <div class="flex items-center gap-2">
                  <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">Yer:</span>
                  <div class="flex items-center gap-2">
                    <img src="assets/icons/locationIcon.svg" alt="Location" class="w-5 h-5 object-contain">
                    <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ otherVacancy.city }}</span>
                  </div>
                </div>

                <!-- 4. Son müraciət tarixi -->
                <div class="flex items-center gap-2">
                  <span class="lg:hidden font-bdo font-normal text-[14px] text-[#80899D]">Son müraciət tarixi:</span>
                  <span class="font-bdo font-normal text-[16px] leading-[20px] text-[#80899D]">{{ otherVacancy.deadline }}</span>
                </div>
              </a>
            }
          </div>
          
        </div>
      </section>

    } @else {
      <!-- Not found fallback -->
      <div class="bg-[#F7F9FC] pt-[180px] pb-32 w-full min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="font-bdo font-bold text-[48px] text-[#0A1642] mb-4">Vakansiya tapılmadı</h1>
        </div>
      </div>
    }
  `,
    styles: [`
    :host ::ng-deep .rich-text-content h2,
    :host ::ng-deep .rich-text-content h3,
    :host ::ng-deep .rich-text-content h4,
    :host ::ng-deep .rich-text-content h5,
    :host ::ng-deep .rich-text-content h6 {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: bold;
      font-style: normal;
      font-size: 32px;
      line-height: 40px;
      letter-spacing: 0;
      color: #0A1642;
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 1024px) {
      :host ::ng-deep .rich-text-content h2,
      :host ::ng-deep .rich-text-content h3,
      :host ::ng-deep .rich-text-content h4 {
        font-size: 28px;
        line-height: 34px;
      }
    }

    :host ::ng-deep .rich-text-content p {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0;
      color: #0A1642;
      margin-bottom: 1.5rem;
    }

    :host ::ng-deep .rich-text-content ul {
      font-family: 'BDO Grotesk', Arial, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0;
      color: #0A1642;
      list-style-type: disc;
      padding-left: 24px;
      margin-bottom: 2rem;
    }

    :host ::ng-deep .rich-text-content li {
      margin-bottom: 0.5rem;
    }

    :host ::ng-deep .rich-text-content li::marker {
      color: #0A1642;
    }

    :host ::ng-deep .rich-text-content strong,
    :host ::ng-deep .rich-text-content b {
      font-weight: 500;
    }

    :host ::ng-deep .rich-text-content a {
      color: #0000FE;
      text-decoration: underline;
      transition: color 0.3s;
    }
    
    :host ::ng-deep .rich-text-content a:hover {
      color: #00F090;
    }
  `]
})
export class CareerDetailPageComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly fb = inject(FormBuilder);
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly destroyRef = inject(DestroyRef);

    readonly vacancy = signal<VacancyDetail | undefined>(undefined);
    readonly allVacanciesList = signal<VacancyDetail[]>([]);

    readonly isSubmitting = signal(false);
    readonly successMessage = signal<string | null>(null);
    readonly errorMessage = signal<string | null>(null);

    readonly mockContent = `
        <h2>Vəzifə öhdəlikləri:</h2>
        <ul>
          <li>LAN/WAN şəbəkəsi və İT infrastrukturunun dizaynı, qurulması və yaranan problemlərin aradan qaldırılması</li>
          <li>Şəbəkə avadanlıqlarının (Cisco router, switch, Firewall-ların və s.) funksionallığını maksimum səviyyədə artırmaq, təhlükəsizlik standartlarına uyğun olaraq konfiqurasiya edilməsi</li>
          <li>Palo Alto Firewall-la təcrübə mütləqdir</li>
          <li>VPN həlləri, Remote access (VPN), Site to site (VPN) bağlantılarının qurulması və idarə olunması ilə bağlı bilik və təcrübə</li>
          <li>Marşrutlama protokolları haqqında biliklər və təcrübə (OSPF, EIGRP)</li>
          <li>Şəbəkə infrastrukturunun monitorinqi (Zabbix/PRTG)</li>
          <li>Şəbəkə problemlərini müəyyən edib həll etmək (yüksək troubleshooting qabiliyyəti)</li>
          <li>Şəbəkə trafikinin optimallaşdırılması</li>
          <li>CCNA, PCNSA sertifikatı olanlara üstünlük verilir</li>
        </ul>
        <h2>Tələblər:</h2>
        <ul>
          <li>Ali təhsil;</li>
          <li>Sahə üzrə iş təcrübəsi ən azı 3 il;</li>
          <li>Azərbaycan, Rus və İngilis dilini bilməli</li>
          <li>Şəbəkə təhlükəsizliyi və nəzarət modelləri haqqında biliklər</li>
          <li>Komandada işləmək bacarığı;</li>
          <li>Verilmiş tapşırıqları vaxtında icra etmək, problemləri operativ həll etmək bacarığına, yüksək ünsiyyət və davranış keyfiyyətlərinə malik olmaq.</li>
        </ul>
        <h2>İş rejimi:</h2>
        <ul>
          <li>İş yeri – Bakı şəh, Çinar Park Biznes Mərkəzi.</li>
          <li>İş günləri – həftənin 5 günü</li>
          <li>İş qrafiki – 09:00 – 18:00</li>
        </ul>
        <p>Vakansiya ilə maraqlanan namizədlər CV-lərini mövzu hissəsində "Şəbəkə Administratoru" qeyd edərək elektron poçt ünvanına göndərə bilərlər.</p>
    `;

    readonly ALL_VACANCIES: readonly VacancyDetail[] = [
        {
            slug: 'sebeke-administratoru',
            title: 'Şəbəkə administratoru',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since.',
            type: 'Tam ştat',
            city: 'Bakı',
            workDays: 'Həftə içi 5 gün',
            workHours: '09:00-18:00',
            deadline: '30 noyabr 2025',
            content: this.mockContent
        }, {
            slug: 'biznesin-inkisafi-uzre-menecer',
            title: 'Biznesin İnkişafı üzrə Menecer',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since.',
            type: 'Tam ştat',
            city: 'Azərbaycan, Bakı',
            workDays: 'Həftə içi 5 gün',
            workHours: '09:00-18:00',
            deadline: '17 noyabr 2025',
            content: this.mockContent
        }, {
            slug: 'middle-product-owner',
            title: 'Middle Product Owner',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since.',
            type: 'Tam ştat',
            city: 'Azərbaycan, Bakı',
            workDays: 'Həftə içi 5 gün',
            workHours: '09:00-18:00',
            deadline: '17 noyabr 2025',
            content: this.mockContent
        }, {
            slug: 'periferiya-qurgulari-temiri',
            title: 'Periferiya qurğuları təmiri və dolumu üzrə usta',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since.',
            type: 'Tam ştat',
            city: 'Azərbaycan, Bakı',
            workDays: 'Həftə içi 5 gün',
            workHours: '09:00-18:00',
            deadline: '17 noyabr 2025',
            content: this.mockContent
        }
    ];

    readonly otherVacancies = computed(() => {
        const current = this.vacancy();
        const list = this.allVacanciesList().length > 0 ? this.allVacanciesList() : this.ALL_VACANCIES;
        return list.filter(v => v.slug !== current?.slug).slice(0, 3);
    });

    readonly applyForm = this.fb.group({
        fullName: [
            '',
            [Validators.required]
        ],
        email: [
            '',
            [
                Validators.required, Validators.email
            ]
        ],
        phone: [
            '',
            [Validators.required]
        ],
        note: [''],
        cv: [
            null as File | null,
            [Validators.required]
        ]
    });

    readonly selectedFileName = signal<string>('');
    readonly fileError = signal<string>('');

    constructor() {
        combineLatest([
            this.route.paramMap,
            this.languageService.locale$
        ]).pipe(
            switchMap(([params]) => {
                const slug = params.get('slug');
                if (!slug) return of(null);
                return this.apiService.getVacancyBySlug(slug).pipe(
                    catchError(() => {
                        const mock = this.ALL_VACANCIES.find(v => v.slug === slug);
                        return of(mock || null);
                    })
                );
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((vac: any) => {
            if (vac) {
                const mapped: VacancyDetail = {
                    slug: vac.slug || String(vac.id),
                    title: vac.title || '',
                    description: vac.description || vac.shortDescription || '',
                    type: vac.type || vac.workType || 'Tam ştat',
                    city: vac.city || vac.location || 'Bakı',
                    workDays: vac.workDays || 'Həftə içi 5 gün',
                    workHours: vac.workHours || '09:00-18:00',
                    deadline: vac.deadline || vac.endDate || '30 noyabr 2025',
                    content: vac.content || vac.body || this.mockContent
                };
                this.vacancy.set(mapped);
            } else {
                this.vacancy.set(undefined);
            }
        });

        // Also load all vacancies for the "Daha çox vakansiya" section
        this.apiService.getVacancies(1, 100).pipe(
            catchError(() => of(null)),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((res: any) => {
            if (res && res.data && res.data.length > 0) {
                const mapped = res.data.map((vac: any) => ({
                    slug: vac.slug || String(vac.id),
                    title: vac.title || '',
                    description: vac.description || vac.shortDescription || '',
                    type: vac.type || vac.workType || 'Tam ştat',
                    city: vac.city || vac.location || 'Bakı',
                    workDays: vac.workDays || 'Həftə içi 5 gün',
                    workHours: vac.workHours || '09:00-18:00',
                    deadline: vac.deadline || vac.endDate || '30 noyabr 2025',
                    content: vac.content || vac.body || this.mockContent
                }));
                this.allVacanciesList.set(mapped);
            }
        });
    }

    scrollToForm() {
        const el = document.getElementById('apply-form-section');
        if (el) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    onFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];

            // Validate type
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const validExtensions = ['.pdf', '.doc', '.docx'];
            const extension = '.' + file.name.split('.').pop()?.toLowerCase();

            if (!validTypes.includes(file.type) && !validExtensions.includes(extension)) {
                this.fileError.set('Yalnız PDF, DOC və ya DOCX faylları qəbul edilir');
                this.selectedFileName.set('');
                this.applyForm.patchValue({cv: null});
                this.applyForm.get('cv')?.markAsTouched();
                return;
            }

            // Validate size (4MB = 4 * 1024 * 1024)
            if (file.size > 4 * 1024 * 1024) {
                this.fileError.set('Faylın həcmi 4MB-dan çox olmamalıdır');
                this.selectedFileName.set('');
                this.applyForm.patchValue({cv: null});
                this.applyForm.get('cv')?.markAsTouched();
                return;
            }

            this.fileError.set('');
            this.selectedFileName.set(file.name);
            this.applyForm.patchValue({cv: file});
        }
    }

    onSubmit() {
        if (this.applyForm.invalid) {
            this.applyForm.markAllAsTouched();
            if (!this.applyForm.get('cv')?.value) {
                this.fileError.set('Zəhmət olmasa CV faylını yükləyin');
            }
            return;
        }

        this.isSubmitting.set(true);
        this.successMessage.set(null);
        this.errorMessage.set(null);

        const formVal = this.applyForm.value;
        const cvFile = formVal.cv as File;
        const payload = {
            fullName: formVal.fullName || '',
            email: formVal.email || '',
            phone: formVal.phone || '',
            position: this.vacancy()?.title || '',
            note: formVal.note || ''
        };

        this.apiService.sendJobApplication(payload, cvFile).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                this.successMessage.set('Müraciətiniz uğurla göndərildi. Təşəkkür edirik!');
                this.applyForm.reset();
                this.selectedFileName.set('');
            },
            error: () => {
                this.isSubmitting.set(false);
                this.errorMessage.set('Müraciət göndərilərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.');
            }
        });
    }
}
