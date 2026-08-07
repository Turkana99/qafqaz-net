import { ChangeDetectionStrategy, Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { RequestModalService } from '../../services/request-modal.service';
import { TranslationService } from '../../../core/services/translation.service';

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

        <!-- Form -->
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-[24px] w-full max-w-[920px] mx-auto">
          
          <input 
            type="text" 
            formControlName="fullName"
            [placeholder]="t().careers.applyForm.namePlaceholder"
            class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
            [class.border-red-500]="contactForm.get('fullName')?.invalid && contactForm.get('fullName')?.touched"
          >
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[18px] w-full">
            <input 
              type="email" 
              formControlName="email"
              [placeholder]="t().careers.applyForm.emailPlaceholder"
              class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
              [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
            >
            <input 
              type="tel" 
              formControlName="phone"
              [placeholder]="t().careers.applyForm.phonePlaceholder"
              class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all"
              [class.border-red-500]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched"
            >
          </div>

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

            <div *ngIf="isDropdownOpen()" class="absolute top-[calc(100%+4px)] left-0 w-full bg-[#FFFFFF] rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] py-2 z-50 overflow-hidden border border-[#EBF0F7]">
              <div 
                *ngFor="let option of serviceOptions; let i = index"
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

          <textarea 
            formControlName="message"
            [placeholder]="t().companyInfo"
            class="w-full h-[150px] lg:h-[219px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] py-[13px] font-bdo font-normal text-[16px] leading-[140%] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all resize-none"
            [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
          ></textarea>

          <div class="mt-4 w-full" [class.opacity-50]="contactForm.invalid" [class.cursor-not-allowed]="contactForm.invalid">
            <app-button 
              type="submit" 
              variant="gradient" 
              size="nav" 
              [fullWidth]="true"
              [disabled]="contactForm.invalid"
            >
              {{ t().common.send }}
            </app-button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class RequestModalComponent {
  modalService = inject(RequestModalService);
  private fb = inject(FormBuilder);
  private translationService = inject(TranslationService);

  readonly t = this.translationService.translations;

  isDropdownOpen = signal(false);
  serviceOptions = [
    { value: 'it-consulting', label: 'İT Konsaltinq' },
    { value: 'infrastructure', label: 'İnfrastruktur və Şəbəkə' },
    { value: 'cloud', label: 'Bulud Texnologiyaları' },
    { value: 'cyber-security', label: 'Kiber Təhlükəsizlik' }
  ];
  focusedOptionIndex = signal(-1);

  contactForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    service: ['', [Validators.required]],
    message: ['', [Validators.required]]
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
    // If the click is on the backdrop wrapper (not the modal content itself)
    if (!(event.target as HTMLElement).closest('.modal-content')) {
        this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close dropdown on outside click
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
            // We handled escape for the dropdown, don't let it close the modal yet
            event.stopPropagation();
            break;
    }
  }

  close() {
    this.modalService.close();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted', this.contactForm.value);
      this.contactForm.reset();
      this.close();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
