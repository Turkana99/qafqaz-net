import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    HostListener,
    signal,
    DestroyRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {PublicApiService} from '../../../../core/services/public-api.service';
import {LanguageService} from '../../../../core/services/language.service';
import {TranslationService} from '../../../../core/services/translation.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, catchError, of} from 'rxjs';

@Component({
    selector: 'app-contact-page',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, ButtonComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <div class="w-full bg-[#F7F9FC] min-h-screen pt-[180px] pb-0 lg:pb-0 flex flex-col items-center">

    <div class="container-main w-full flex flex-col items-center mb-10 lg:mb-16">
        <h1 class="font-bdo font-bold text-[40px] md:text-[50px] lg:text-[60px] leading-[1.2] lg:leading-[76px] text-center text-[#0A1642]">
            {{ heroTitle() || t().contactUs }}
        </h1>
        @if (heroBody()) {
          <p class="font-bdo font-normal text-[18px] leading-[28px] text-[#80899D] text-center max-w-[700px] mt-4">
            {{ heroBody() }}
          </p>
        }
    </div>

    <div
        class="w-full grid grid-cols-1 lg:grid-cols-[5fr_5fr] items-stretch lg:min-h-[650px]">

        <!-- Left Column -->
        <div class="w-full h-full bg-[#0A1642] p-8 md:p-12 lg:py-[64px] lg:pl-[max(3rem,calc(50vw-600px))] lg:pr-[48px] flex flex-col justify-between">

            <div class="w-full h-full bg-[#0A1642] p-8 md:p-12 lg:py-[64px]">
                <div class="mx-auto flex h-full w-full max-w-[500px] flex-col justify-between">
                    <div class="flex flex-col gap-4">
                        <h2 class="font-bdo font-bold text-[40px] lg:text-[55px] leading-[1.1] lg:leading-[60px] text-white">
                            {{ talkBoxTitle() || 'Gəlin danışaq!' }}
                        </h2>

                        <p class="font-bdo font-normal text-[18px] leading-[1.4] text-white">
                            {{ talkBoxBody() || 'Qısa məlumat buraxın, komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq.' }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-[16px]">
                        @if (emailItems().length > 0) {
                          @for (emailItem of emailItems(); track emailItem.title) {
                            <a [href]="'mailto:' + emailItem.title" class="self-start font-bdo text-[24px] font-normal leading-[100%] text-white transition-colors hover:text-[#00F090] lg:text-[30px]">
                                {{ emailItem.title }}
                            </a>
                          }
                        } @else {
                          <a href="mailto:office@qafqaz.net" class="self-start font-bdo text-[24px] font-normal leading-[100%] text-white transition-colors hover:text-[#00F090] lg:text-[30px]">
                              office&#64;qafqaz.net
                          </a>
                        }

                        <div class="flex flex-col gap-[8px]">
                            @if (locationItems().length > 0) {
                              @for (loc of locationItems(); track loc.title) {
                                <span class="font-bdo text-[16px] text-white lg:text-[18px]">
                                    {{ loc.title }}
                                </span>
                              }
                            } @else {
                              <span class="font-bdo text-[16px] text-white lg:text-[18px]">
                                  “ÇİNAR PARK BİZNES MƏRKƏZİ” 4 cü mərtəbə
                              </span>
                            }

                            @if (phoneItems().length > 0) {
                              <span class="font-bdo text-[16px] text-white lg:text-[18px]">
                                  {{ getPhoneTitlesJoined() }}
                              </span>
                            } @else {
                              <span class="font-bdo text-[16px] text-white lg:text-[18px]">
                                  +994123100707, +994102346464
                              </span>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Right Column -->
        <div class="flex h-full w-full items-center bg-white p-8 md:p-12 lg:py-[64px]">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="mx-auto flex w-full max-w-[596px] flex-col gap-[24px]">

                @if (formLabelsTitle()) {
                  <h3 class="font-bdo font-bold text-[24px] md:text-[28px] text-[#0A1642] mb-2">
                    {{ formLabelsTitle() }}
                  </h3>
                }

                <!-- Success Alert -->
                @if (successMessage()) {
                  <div class="p-4 rounded-[12px] bg-green-50 border border-green-200 text-green-800 font-bdo text-[15px] flex items-center gap-2">
                    <svg class="w-5 h-5 shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ successMessage() }}</span>
                  </div>
                }

                <!-- Error Alert -->
                @if (errorMessage()) {
                  <div class="p-4 rounded-[12px] bg-red-50 border border-red-200 text-red-800 font-bdo text-[15px] flex items-center gap-2">
                    <svg class="w-5 h-5 shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ errorMessage() }}</span>
                  </div>
                }

                <div class="flex flex-col gap-1">
                  <input type="text" formControlName="fullName" [placeholder]="t().careers.applyForm.namePlaceholder" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all" [class.border-red-500]="contactForm.get('fullName')?.invalid && contactForm.get('fullName')?.touched">
                  @if (contactForm.get('fullName')?.invalid && contactForm.get('fullName')?.touched) {
                    <span class="text-red-500 font-bdo text-[13px]">Zəhmət olmasa ad və soyadınızı daxil edin</span>
                  }
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-[18px] w-full">
                  <div class="flex flex-col gap-1">
                    <input type="email" formControlName="email" [placeholder]="t().careers.applyForm.emailPlaceholder" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all" [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                    @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                      <span class="text-red-500 font-bdo text-[13px]">Düzgün email ünvanı daxil edin</span>
                    }
                  </div>
                  <div class="flex flex-col gap-1">
                    <input type="tel" formControlName="phone" [placeholder]="t().careers.applyForm.phonePlaceholder" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all" [class.border-red-500]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched">
                    @if (contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched) {
                      <span class="text-red-500 font-bdo text-[13px]">Telefon nömrəsi tələb olunur</span>
                    }
                  </div>
                </div>

                <div class="flex flex-col gap-1">
                  <div class="relative w-full" (click)="$event.stopPropagation()">
                    <div tabindex="0" (click)="toggleDropdown($event)" (keydown)="onDropdownKeydown($event)" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] flex items-center justify-between font-bdo font-normal text-[16px] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all cursor-pointer" [class.text-[#0A1642]]="contactForm.get('service')?.value" [class.text-[#80899D]]="!contactForm.get('service')?.value" [class.border-red-500]="contactForm.get('service')?.invalid && contactForm.get('service')?.touched">
                        <span>{{ getSelectedServiceLabel() || t().selectService }}</span>
                        <img src="assets/icons/dropdownIcon.svg" alt="Dropdown" class="w-3 h-3 transition-transform" [class.rotate-180]="isDropdownOpen()">
                    </div>

                    <div *ngIf="isDropdownOpen()" class="absolute top-[calc(100%+4px)] left-0 w-full bg-[#FFFFFF] rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] py-2 z-50 overflow-hidden border border-[#EBF0F7]">
                        <div *ngFor="let option of serviceOptions; let i = index" (click)="selectOption(option.value)" class="px-[16px] py-[10px] font-bdo text-[16px] cursor-pointer transition-colors" [class.bg-[#4343FF]]="focusedOptionIndex() === i" [class.text-white]="focusedOptionIndex() === i" [class.text-[#0A1642]]="focusedOptionIndex() !== i" (mouseenter)="focusedOptionIndex.set(i)">
                            {{ option.label }}
                        </div>
                    </div>
                  </div>
                  @if (contactForm.get('service')?.invalid && contactForm.get('service')?.touched) {
                    <span class="text-red-500 font-bdo text-[13px]">Zəhmət olmasa xidmət seçin</span>
                  }
                </div>

                <div class="flex flex-col gap-1">
                  <input type="text" formControlName="subject" [placeholder]="t().subject" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all">
                </div>

                <div class="flex flex-col gap-1">
                  <textarea formControlName="message" [placeholder]="t().companyInfo" class="w-full h-[102px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] pt-[13px] pb-[13px] font-bdo font-normal text-[16px] leading-[140%] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all resize-none" [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"></textarea>
                  @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                    <span class="text-red-500 font-bdo text-[13px]">Zəhmət olmasa mesajınızı daxil edin</span>
                  }
                </div>

                <div class="mt-2 w-full" [class.opacity-50]="contactForm.invalid || isSubmitting()" [class.cursor-not-allowed]="contactForm.invalid || isSubmitting()">
                    <app-button type="submit" variant="gradient" size="nav" [fullWidth]="true" [disabled]="contactForm.invalid || isSubmitting()">
                        @if (isSubmitting()) {
                          {{ t().common.loading }}
                        } @else {
                          {{ t().common.send }}
                        }
                    </app-button>
                </div>

            </form>
        </div>

    </div>
</div>
  `
})
export class ContactPageComponent {
    private readonly fb = inject(FormBuilder);
    private readonly apiService = inject(PublicApiService);
    private readonly languageService = inject(LanguageService);
    private readonly translationService = inject(TranslationService);
    private readonly destroyRef = inject(DestroyRef);

    readonly t = this.translationService.translations;

    readonly heroTitle = signal<string | undefined>(undefined);
    readonly heroBody = signal<string | undefined>(undefined);
    readonly formLabelsTitle = signal<string | undefined>(undefined);
    readonly talkBoxTitle = signal<string | undefined>(undefined);
    readonly talkBoxBody = signal<string | undefined>(undefined);
    readonly talkBoxItems = signal<any[]>([]);

    readonly phoneItems = computed(() => {
      const items = this.talkBoxItems();
      return items.filter(i => i.icon === 'phone' || i.description?.toLowerCase().includes('telefon'));
    });

    readonly emailItems = computed(() => {
      const items = this.talkBoxItems();
      return items.filter(i => i.icon === 'email' || i.title?.includes('@'));
    });

    readonly locationItems = computed(() => {
      const items = this.talkBoxItems();
      return items.filter(i => i.icon === 'location' || i.description?.toLowerCase().includes('ünvan'));
    });

    constructor() {
      this.languageService.locale$.pipe(
        switchMap(locale => this.apiService.getPageContents('contact', locale).pipe(catchError(() => of(null)))),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(res => {
        if (res?.sections) {
          const secs = res.sections;
          if (secs.hero) {
            if (secs.hero.title) this.heroTitle.set(secs.hero.title);
            if (secs.hero.body) this.heroBody.set(secs.hero.body);
          }
          if (secs.form_labels?.title) {
            this.formLabelsTitle.set(secs.form_labels.title);
          }
          if (secs.talk_box) {
            if (secs.talk_box.title) this.talkBoxTitle.set(secs.talk_box.title);
            if (secs.talk_box.body) this.talkBoxBody.set(secs.talk_box.body);
            if (Array.isArray(secs.talk_box.items)) {
              const sorted = [...secs.talk_box.items].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
              this.talkBoxItems.set(sorted);
            }
          }
        }
      });
    }

    getPhoneTitlesJoined(): string {
      return this.phoneItems().map(p => p.title).join(', ');
    }

    readonly isDropdownOpen = signal(false);
    readonly serviceOptions = [
        {
            value: 'it-consulting',
            label: 'İT Konsaltinq'
        }, {
            value: 'infrastructure',
            label: 'İnfrastruktur və Şəbəkə'
        }, {
            value: 'cloud',
            label: 'Bulud Texnologiyaları'
        }, {
            value: 'cyber-security',
            label: 'Kiber Təhlükəsizlik'
        }
    ];
    readonly focusedOptionIndex = signal(-1);

    readonly isSubmitting = signal(false);
    readonly successMessage = signal<string | null>(null);
    readonly errorMessage = signal<string | null>(null);

    readonly contactForm = this.fb.group({
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
        service: [
            '',
            [Validators.required]
        ],
        subject: [''],
        message: [
            '',
            [Validators.required]
        ]
    });

    getSelectedServiceLabel(): string {
        const value = this.contactForm.get('service')?.value;
        const option = this.serviceOptions.find(o => o.value === value);
        return option ? option.label : '';
    }

    toggleDropdown(event: Event) {
        event.stopPropagation();
        this.isDropdownOpen.update(v => !v);
        if (this.isDropdownOpen()) {
            const currentVal = this.contactForm.get('service')?.value;
            const idx = this.serviceOptions.findIndex(o => o.value === currentVal);
            this.focusedOptionIndex.set(idx >= 0 ? idx : 0);
        }
    }

    selectOption(value: string) {
        this.contactForm.patchValue({service: value});
        this.contactForm.get('service')?.markAsTouched();
        this.isDropdownOpen.set(false);
    }

    @HostListener('document:click', ['$event'])
    closeDropdown(event: Event) {
        this.isDropdownOpen.set(false);
    }

    onDropdownKeydown(event: KeyboardEvent) {
        if (!this.isDropdownOpen()) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault();
                this.isDropdownOpen.set(true);
                const currentVal = this.contactForm.get('service')?.value;
                const idx = this.serviceOptions.findIndex(o => o.value === currentVal);
                this.focusedOptionIndex.set(idx >= 0 ? idx : 0);
            }
            return;
        }

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.focusedOptionIndex.update(i => i < this.serviceOptions.length - 1 ? i + 1 : i);
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.focusedOptionIndex.update(i => i > 0 ? i - 1 : i);
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                const idx = this.focusedOptionIndex();
                if (idx >= 0 && idx < this.serviceOptions.length) {
                    this.selectOption(this.serviceOptions[idx].value);
                }
                break;
            case 'Escape':
                event.preventDefault();
                this.isDropdownOpen.set(false);
                break;
        }
    }

    onSubmit() {
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }

        this.isSubmitting.set(true);
        this.successMessage.set(null);
        this.errorMessage.set(null);

        const formVal = this.contactForm.value;
        const payload = {
          fullName: formVal.fullName || '',
          email: formVal.email || '',
          phone: formVal.phone || '',
          service: formVal.service || '',
          subject: formVal.subject || this.getSelectedServiceLabel() || 'Saytdan mesaj',
          message: formVal.message || ''
        };

        this.apiService.sendContactMessage(payload).subscribe({
          next: () => {
            this.isSubmitting.set(false);
            this.successMessage.set('Mesajınız uğurla göndərildi. Təşəkkür edirik!');
            this.contactForm.reset();
          },
          error: () => {
            this.isSubmitting.set(false);
            this.errorMessage.set('Mesaj göndərilərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.');
          }
        });
    }
}
