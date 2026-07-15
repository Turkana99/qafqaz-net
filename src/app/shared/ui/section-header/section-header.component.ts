import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'flex flex-col gap-4 ' + customClass()">
      @if (eyebrow()) {
        <span class="text-sm font-bold text-accent-cyan tracking-wider flex items-center gap-2">
          <span class="w-6 h-px bg-accent-cyan"></span>
          {{ eyebrow() }}
        </span>
      }
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main leading-tight">
        {{ title() }}
      </h2>
      @if (description()) {
        <p class="text-text-secondary text-lg max-w-2xl">
          {{ description() }}
        </p>
      }
    </div>
  `
})
export class SectionHeaderComponent {
  title = input.required<string>();
  description = input<string>();
  eyebrow = input<string>();
  customClass = input<string>('');
}
