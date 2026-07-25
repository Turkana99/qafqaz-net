import {
    ChangeDetectionStrategy,
    Component,
    inject,
    HostListener,
    signal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';

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
            Bizimlə əlaqə
        </h1>
    </div>

    <div
        class="w-full grid grid-cols-1 lg:grid-cols-[5fr_5fr] items-stretch lg:min-h-[650px]">

        <!-- Left Column -->
        <div class="w-full h-full bg-[#0A1642] p-8 md:p-12 lg:py-[64px] lg:pl-[max(3rem,calc(50vw-600px))] lg:pr-[48px] flex flex-col justify-between">

            <div class="w-full h-full bg-[#0A1642] p-8 md:p-12 lg:py-[64px]">
                <div class="mx-auto flex h-full w-full max-w-[500px] flex-col justify-between">
                    <div class="flex flex-col gap-4">
                        <h2 class="font-bdo font-bold text-[40px] lg:text-[55px] leading-[1.1] lg:leading-[60px] text-white">
                            Gəlin danışaq!
                        </h2>

                        <p class="font-bdo font-normal text-[18px] leading-[1.4] text-white">
                            Qısa məlumat buraxın, komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq.
                        </p>
                    </div>

                    <div class="flex flex-col gap-[16px]">
                        <a href="mailto:office@qafqaz.net" class="self-start font-bdo text-[24px] font-normal leading-[100%] text-white transition-colors hover:text-[#00F090] lg:text-[30px]">
                            office&#64;qafqaz.net
                        </a>

                        <div class="flex flex-col gap-[8px]">
                            <span class="font-bdo text-[16px] text-white lg:text-[18px]">
                                “ÇİNAR PARK BİZNES MƏRKƏZİ” 4 cü mərtəbə
                            </span>

                            <span class="font-bdo text-[16px] text-white lg:text-[18px]">
                                +994123100707, +994102346464
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Right Column -->
        <div class="flex h-full w-full items-center bg-white p-8 md:p-12 lg:py-[64px]">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="mx-auto flex w-full max-w-[596px] flex-col gap-[24px]">

                <input type="text" formcontrolname="fullName" placeholder="Ad və soyadınızı daxil edin" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all" [class.border-red-500]="contactForm.get('fullName')?.invalid && contactForm.get('fullName')?.touched">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-[18px] w-full">
                    <input type="email" formcontrolname="email" placeholder="Emailinizi daxil edin" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all" [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                    <input type="tel" formcontrolname="phone" placeholder="Telefon nömrəniz" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] font-bdo font-normal text-[16px] leading-[48px] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all" [class.border-red-500]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched">
                </div>

                <div class="relative w-full" (click)="$event.stopPropagation()">
                    <div tabindex="0" (click)="toggleDropdown($event)" (keydown)="onDropdownKeydown($event)" class="w-full h-[48px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] flex items-center justify-between font-bdo font-normal text-[16px] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all cursor-pointer" [class.text-[#0A1642]]="contactForm.get('service')?.value" [class.text-[#80899D]]="!contactForm.get('service')?.value" [class.border-red-500]="contactForm.get('service')?.invalid && contactForm.get('service')?.touched">
                        <span>{{ getSelectedServiceLabel() || 'Xidmət seçin' }}</span>
                        <img src="assets/icons/dropdownIcon.svg" alt="Dropdown" class="w-3 h-3 transition-transform" [class.rotate-180]="isDropdownOpen()">
                    </div>

                    <div *ngIf="isDropdownOpen()" class="absolute top-[calc(100%+4px)] left-0 w-full bg-[#FFFFFF] rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] py-2 z-50 overflow-hidden border border-[#EBF0F7]">
                        <div *ngFor="let option of serviceOptions; let i = index" (click)="selectOption(option.value)" class="px-[16px] py-[10px] font-bdo text-[16px] cursor-pointer transition-colors" [class.bg-[#4343FF]]="focusedOptionIndex() === i" [class.text-white]="focusedOptionIndex() === i" [class.text-[#0A1642]]="focusedOptionIndex() !== i" (mouseenter)="focusedOptionIndex.set(i)">
                            {{ option.label }}
                        </div>
                    </div>
                </div>

                <textarea formcontrolname="message" placeholder="Şirkətiniz haqqında qısa məlumat" class="w-full h-[102px] rounded-[10px] bg-[#F7F9FC] border border-transparent px-[16px] pt-[13px] pb-[13px] font-bdo font-normal text-[16px] leading-[140%] text-[#0A1642] placeholder:text-[#80899D] focus:outline-none focus:border-[#4343FF] focus:ring-1 focus:ring-[#4343FF] transition-all resize-none" [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"></textarea>

                <div class="mt-2 w-full" [class.opacity-50]="contactForm.invalid" [class.cursor-not-allowed]="contactForm.invalid">
                    <app-button type="submit" variant="gradient" size="nav" [fullWidth]="true" [disabled]="contactForm.invalid">
                        Göndər
                    </app-button>
                </div>

            </form>
        </div>

    </div>
</div>
  `
})
export class ContactPageComponent {
    private fb = inject(FormBuilder);

    isDropdownOpen = signal(false);
    serviceOptions = [
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
    focusedOptionIndex = signal(-1);

    contactForm = this.fb.group({
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
        message: [
            '',
            [Validators.required]
        ]
    });

    getSelectedServiceLabel(): string {
        const value = this.contactForm.get('service') ?. value;
        const option = this.serviceOptions.find(o => o.value === value);
        return option ? option.label : '';
    }

    toggleDropdown(event : Event) {
        event.stopPropagation();
        this.isDropdownOpen.update(v => !v);
        if (this.isDropdownOpen()) {
            const currentVal = this.contactForm.get('service') ?. value;
            const idx = this.serviceOptions.findIndex(o => o.value === currentVal);
            this.focusedOptionIndex.set(idx >= 0 ? idx : 0);
        }
    }

    selectOption(value : string) {
        this.contactForm.patchValue({service: value});
        this.contactForm.get('service') ?. markAsTouched();
        this.isDropdownOpen.set(false);
    }

    @HostListener('document:click', ['$event'])
    closeDropdown(event : Event) {
        this.isDropdownOpen.set(false);
    }

    onDropdownKeydown(event : KeyboardEvent) {
        if (!this.isDropdownOpen()) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault();
                this.isDropdownOpen.set(true);
                const currentVal = this.contactForm.get('service') ?. value;
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
        if (this.contactForm.valid) {
            console.log('Form submitted', this.contactForm.value);
            this.contactForm.reset();
        } else {
            this.contactForm.markAllAsTouched();
        }
    }
}
