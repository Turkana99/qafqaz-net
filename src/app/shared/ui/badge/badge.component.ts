import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type BadgeVariant = 'success' | 'info' | 'warning' | 'default' | 'primary' | 'cyan';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
          [class]="colorClass()">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');

  colorClass = computed(() => {
    switch (this.variant()) {
      case 'success': return 'bg-success/10 text-success';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'primary': return 'bg-primary-blue/10 text-primary-blue';
      case 'cyan': return 'bg-accent-cyan/10 text-accent-cyan';
      default: return 'bg-surface-light text-text-secondary';
    }
  });
}
