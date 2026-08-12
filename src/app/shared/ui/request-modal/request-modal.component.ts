import { ChangeDetectionStrategy, Component, inject, HostListener, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { RequestModalService } from '../../services/request-modal.service';
import { TranslationService } from '../../../core/services/translation.service';
import { PublicApiService } from '../../../core/services/public-api.service';
import { LanguageService } from '../../../core/services/language.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';
import { ContactMessageRequest } from '../../../core/models/api.model';

export interface ServiceOption {
  value: string;
  label: string;
}

function phoneFormatValidator(control: AbstractControl): ValidationErrors | null {
  const val = control.value;
  if (!val || typeof val !== 'string' || val.trim() === '') {
    return null;
  }
  const clean = val.trim();
  const isValid = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]{5,15}$/.test(clean) || /^[0-9+()\s-]{7,20}$/.test(clean);
  return isValid ? null : { phoneFormat: true };
}

@Component({
  selector: 'app-request-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      *ngIf="modalService.isOpen()" 
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A1642]/40 backdrop-blur-sm px-4 lg:px-0 py-8 lg:py-0 overflow-y-auto"
      (click)="onBackgroundClick($event)"
    >
      <div 
        class="bg-white rounded-[24px] p-6 lg:p-12 w-full max-w-[1020px] shadow-[0_24px_48px_rgba(0,0,0,0.1)] relative my-auto mx-auto modal-content"
        (click)="$event.stopPropagation()"
      >
        <!-- Top Row -->
        <div class="flex items-center justify-between mb-8 lg:mb-[48px]">
          <h2 class="font-bdo font-semibold text-[32px] lg:text-[48px] leading-[1.2] lg:leading-[60px] text-[#0A1642]">
            {{ t().sendRequest }}
          </h2>
          <button 
            (click)="close()"
            class="w-[48px] h-[48px] rounded-full bg-[#F7F9FC] flex items-center justify-center hover:bg-[#EBF0F7] transition-colors flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="#80899D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Success Alert -->
        @if (successMessage()) {
          <div class="p-4 rounded-[12px] bg-green-50 border border-green-200 text-green-800 font-bdo text-[15px] flex items-center gap-2 mb-6">
            <svg class="w-5 h-5 shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>{{ successMessage() }}</span>
          </div>
        }

        <!-- Error Alert -->
        @if (errorMessage()) {
          <div class="p-4 rounded-[12px] bg-red-50 border border-red-200 text-red-800 font-bdo text-[15px] flex items-center gap-2 mb-6">
            <svg class="w-5 h-5 shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage() }}</span>
          </div>
        }

        <!-- Form -->
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-[24px] w-full max-w-[920px] mx-auto">
          
          <!-- Full Name -->
          <div>
            <input 
              type="text" 
              formControlName="fullName"
              [placeholder]="t().careers.applyForm.namePlaceholder"
              class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
              [class.border-red-500]="contactForm.get('fullName')?.invalid && contactForm.get('fullName')?.touched"
            >
            @if (contactForm.get('fullName')?.invalid && contactForm.get('fullName')?.touched) {
              <span class="text-red-500 font-bdo text-[13px] mt-1 block">{{ t().validation.fullNameRequired }}</span>
            }
          </div>
          
          <!-- Email and Phone Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[18px] w-full">
            <div>
              <input 
                type="email" 
                formControlName="email"
                [placeholder]="t().careers.applyForm.emailPlaceholder"
                class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
                [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
              >
              @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                <span class="text-red-500 font-bdo text-[13px] mt-1 block">
                  @if (contactForm.get('email')?.errors?.['required']) {
                    {{ t().validation.emailRequired }}
                  } @else {
                    {{ t().validation.emailFormat }}
                  }
                </span>
              }
            </div>

            <div>
              <input 
                type="tel" 
                formControlName="phone"
                [placeholder]="t().careers.applyForm.phonePlaceholder"
                class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
                [class.border-red-500]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched"
              >
              @if (contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched) {
                <span class="text-red-500 font-bdo text-[13px] mt-1 block">{{ t().validation.phoneFormat }}</span>
              }
            </div>
          </div>

          <!-- Company -->
          <div>
            <input 
              type="text" 
              formControlName="company"
              [placeholder]="t().careers.applyForm.companyPlaceholder"
              class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
            >
          </div>

          <!-- Service Selection Dropdown -->
          <div>
            <div class="relative w-full" (click)="$event.stopPropagation()">
              <div 
                tabindex="0"
                (click)="toggleDropdown($event)"
                (keydown)="onDropdownKeydown($event)"
                class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] flex items-center justify-between font-bdo font-normal text-[16px] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all cursor-pointer"
                [class.text-[#0A1642]]="contactForm.get('service')?.value"
                [class.text-[#80899D]]="!contactForm.get('service')?.value"
                [class.border-red-500]="contactForm.get('service')?.invalid && contactForm.get('service')?.touched"
              >
                <span>{{ getSelectedServiceLabel() || t().selectService }}</span>
                <img src="assets/icons/dropdownIcon.svg" alt="Dropdown" class="w-3 h-3 transition-transform" [class.rotate-180]="isDropdownOpen()">
              </div>

              <div *ngIf="isDropdownOpen()" class="absolute top-[calc(100%+4px)] left-0 w-full bg-[#FFFFFF] rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] py-2 z-50 max-h-[220px] overflow-y-auto border border-[#EBF0F7]">
                <div 
                  *ngFor="let option of serviceOptions(); let i = index"
                  (click)="selectOption(option.value)"
                  class="px-[16px] py-[10px] font-bdo text-[16px] cursor-pointer transition-colors"
                  [class.bg-[#4343FF]]="focusedOptionIndex() === i"
                  [class.text-white]="focusedOptionIndex() === i"
                  [class.text-[#0A1642]]="focusedOptionIndex() !== i"
                  (mouseenter)="focusedOptionIndex.set(i)"
                >
                  {{ option.label }}
                </div>
              </div>
            </div>
            @if (contactForm.get('service')?.invalid && contactForm.get('service')?.touched) {
              <span class="text-red-500 font-bdo text-[13px] mt-1 block">{{ t().validation.serviceRequired }}</span>
            }
          </div>

          <!-- Message -->
          <div>
            <textarea 
              formControlName="message"
              [placeholder]="t().companyInfo"
              class="w-full h-[150px] lg:h-[219px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] py-[13px] font-bdo font-normal text-[16px] leading-[140%] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all resize-none"
              [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
            ></textarea>
            @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
              <span class="text-red-500 font-bdo text-[13px] mt-1 block">{{ t().validation.messageRequired }}</span>
            }
          </div>

          <!-- Submit Button -->
          <div class="mt-4 w-full" [class.opacity-50]="contactForm.invalid || isSubmitting()" [class.cursor-not-allowed]="contactForm.invalid || isSubmitting()">
            <app-button 
              type="submit" 
              variant="gradient" 
              size="nav" 
              [fullWidth]="true"
              [disabled]="contactForm.invalid || isSubmitting()"
            >
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
  `,
})
export class RequestModalComponent {
  readonly modalService = inject(RequestModalService);
  private readonly fb = inject(FormBuilder);
  private readonly translationService = inject(TranslationService);
  private readonly apiService = inject(PublicApiService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly t = this.translationService.translations;

  readonly isDropdownOpen = signal(false);
  readonly serviceOptions = signal<ServiceOption[]>([]);
  readonly focusedOptionIndex = signal(-1);

  readonly isSubmitting = signal(false);
  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly contactForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [phoneFormatValidator]],
    service: ['', [Validators.required]],
    company: [''],
    message: ['', [Validators.required]]
  });

  constructor() {
    this.languageService.locale$.pipe(
      switchMap(locale => this.apiService.getServicesLookup(locale).pipe(catchError(() => of([])))),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(res => {
      if (Array.isArray(res)) {
        const opts = res.map((s: any) => ({
          value: String(s.id),
          label: s.name || s.title || ''
        }));
        this.serviceOptions.set(opts);
      }
    });
  }

  getSelectedServiceLabel(): string {
    const value = this.contactForm.get('service')?.value;
    const option = this.serviceOptions().find(o => o.value === value);
    return option ? option.label : '';
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update(v => !v);
    if (this.isDropdownOpen()) {
       const currentVal = this.contactForm.get('service')?.value;
       const idx = this.serviceOptions().findIndex(o => o.value === currentVal);
       this.focusedOptionIndex.set(idx >= 0 ? idx : 0);
    }
  }

  selectOption(value: string) {
    this.contactForm.patchValue({ service: value });
    this.contactForm.get('service')?.markAsTouched();
    this.isDropdownOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.modalService.isOpen()) {
        this.close();
    }
  }

  onBackgroundClick(event: Event) {
    if (!(event.target as HTMLElement).closest('.modal-content')) {
        this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isDropdownOpen.set(false);
  }

  onDropdownKeydown(event: KeyboardEvent) {
    if (!this.isDropdownOpen()) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault();
            this.isDropdownOpen.set(true);
            const currentVal = this.contactForm.get('service')?.value;
            const idx = this.serviceOptions().findIndex(o => String(o.value) === String(currentVal));
            this.focusedOptionIndex.set(idx >= 0 ? idx : 0);
        }
        return;
    }

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            this.focusedOptionIndex.update(i => i < this.serviceOptions().length - 1 ? i + 1 : i);
            break;
        case 'ArrowUp':
            event.preventDefault();
            this.focusedOptionIndex.update(i => i > 0 ? i - 1 : i);
            break;
        case 'Enter':
        case ' ':
            event.preventDefault();
            const idx = this.focusedOptionIndex();
            if (idx >= 0 && idx < this.serviceOptions().length) {
                this.selectOption(this.serviceOptions()[idx].value);
            }
            break;
        case 'Escape':
            event.preventDefault();
            this.isDropdownOpen.set(false);
            event.stopPropagation();
            break;
    }
  }

  close() {
    this.contactForm.reset();
    this.successMessage.set(null);
    this.errorMessage.set(null);
    this.isSubmitting.set(false);
    this.modalService.close();
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
    const payload: ContactMessageRequest = {
      fullName: formVal.fullName || '',
      email: formVal.email || '',
      phone: formVal.phone ? String(formVal.phone).trim() : null,
      company: formVal.company ? String(formVal.company).trim() : null,
      serviceId: formVal.service || null,
      message: formVal.message || ''
    };

    this.apiService.sendContactMessage(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.successMessage.set('Sorğunuz uğurla göndərildi!');
        this.contactForm.reset();
        setTimeout(() => {
          this.successMessage.set(null);
          this.close();
        }, 2000);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err?.error?.message || 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
      }
    });
  }
}
