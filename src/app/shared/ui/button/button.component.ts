import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
type ButtonVariant = 'primary' | 'secondary' | 'gradient' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg' | 'nav' | 'hero';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgClass, NgTemplateOutlet, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (routerLink()) {
      <a
        [routerLink]="routerLink()"
        [ngClass]="computedClasses()"
        [attr.aria-label]="ariaLabel()"
      >
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </a>
    } @else {
      <button
        [type]="type()"
        [ngClass]="computedClasses()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
      >
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </button>
    }

    <ng-template #content>
      @if (leadingIcon()) {
        <app-icon [name]="leadingIcon()!" [size]="20" class="mr-2"></app-icon>
      }
      <ng-content></ng-content>
      @if (trailingIcon()) {
        <app-icon [name]="trailingIcon()!" [size]="20" class="ml-2"></app-icon>
      }
    </ng-template>
  `,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  routerLink = input<string | any[] | null>(null);
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  ariaLabel = input<string | null>(null);
  customClass = input<string>('');
  leadingIcon = input<string | null>(null);
  trailingIcon = input<string | null>(null);
  fullWidth = input<boolean>(false);

  computedClasses = computed(() => {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue';
    
    let variantClass = '';
    switch (this.variant()) {
      case 'primary':
        variantClass = 'bg-primary-blue text-white hover:bg-blue-700';
        break;
      case 'gradient':
        variantClass = 'btn-gradient text-white shadow-[0px_6px_15px_0px_#FFFFFF99_inset]';
        break;
      case 'secondary':
        variantClass = 'bg-surface-light text-text-main hover:bg-gray-200';
        break;
      case 'outline':
        variantClass = 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white';
        break;
      case 'text':
        variantClass = 'text-primary-blue hover:text-blue-700 hover:underline';
        break;
    }

    let sizeClass = '';
    switch (this.size()) {
      case 'sm':
        sizeClass = 'px-4 py-2 text-sm rounded-full';
        break;
      case 'md':
        sizeClass = 'px-6 py-3 text-sm sm:text-base rounded-full';
        break;
      case 'lg':
        sizeClass = 'px-8 py-4 text-base sm:text-lg rounded-full';
        break;
      case 'nav':
        sizeClass = 'w-[184px] h-[54px] rounded-xl px-6 gap-3';
        break;
      case 'hero':
        sizeClass = 'w-[203px] h-[64px] rounded-xl px-6 gap-3';
        break;
    }

    const disabledClass = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';
    const fullWidthClass = this.fullWidth() ? 'w-full' : '';

    return `${base} ${variantClass} ${sizeClass} ${disabledClass} ${fullWidthClass} ${this.customClass()}`.trim();
  });
}
