import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isExternal()) {
      <img
        [src]="name()"
        [class]="svgClass()"
        [style.width.px]="size()"
        [style.height.px]="size()"
        aria-hidden="true"
        alt=""
      />
    } @else {
      <svg
        [class]="svgClass()"
        [attr.width]="size()"
        [attr.height]="size()"
        [attr.aria-hidden]="true"
        [style.color]="color()"
        class="inline-block shrink-0 stroke-current text-current"
      >
        <use [attr.href]="'assets/icons/sprite.svg#' + name()"></use>
      </svg>
    }
  `,
  host: {
    class: 'inline-flex items-center justify-center',
  },
})
export class IconComponent {
  name = input.required<string>();
  size = input<number>(24);
  svgClass = input<string>('');
  color = input<string>('currentColor');

  isExternal = computed(() => {
    const n = this.name();
    return n.endsWith('.svg') || n.includes('/');
  });
}
