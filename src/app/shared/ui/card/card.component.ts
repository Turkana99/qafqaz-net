import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'bg-surface-card rounded-3xl shadow-card overflow-hidden h-full flex flex-col p-6 sm:p-8 ' + customClass()">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  customClass = input<string>('');
}
