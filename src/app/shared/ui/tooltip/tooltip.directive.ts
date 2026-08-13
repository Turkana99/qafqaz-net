import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText: string | null | undefined = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipEl: HTMLElement | null = null;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('mouseenter')
  @HostListener('focusin')
  onMouseEnter() {
    if (!this.isBrowser || !this.tooltipText || !this.tooltipText.trim()) return;
    this.show();
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  @HostListener('click')
  onMouseLeave() {
    this.hide();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.hide();
  }

  ngOnDestroy() {
    this.hide();
  }

  private show() {
    if (this.tooltipEl || !this.isBrowser) return;

    const host = this.el.nativeElement;
    
    this.tooltipEl = this.renderer.createElement('div');
    if (!this.tooltipEl) return;

    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');
    
    const styles: Record<string, string> = {
      'position': 'fixed',
      'z-index': '99999',
      'background-color': '#0A1642',
      'color': '#FFFFFF',
      'font-family': 'BDO Grotesk, sans-serif',
      'font-size': '13px',
      'font-weight': '500',
      'line-height': '18px',
      'padding': '8px 12px',
      'border-radius': '8px',
      'border': '1px solid rgba(255, 255, 255, 0.15)',
      'box-shadow': '0 10px 25px -5px rgba(10, 22, 66, 0.3)',
      'pointer-events': 'none',
      'white-space': 'normal',
      'max-width': '280px',
      'word-break': 'break-word',
      'opacity': '0',
      'transform': 'scale(0.95)',
      'transition': 'opacity 150ms ease-out, transform 150ms ease-out'
    };

    Object.keys(styles).forEach(key => {
      this.renderer.setStyle(this.tooltipEl, key, styles[key]);
    });

    this.tooltipEl.textContent = this.tooltipText || '';
    this.renderer.appendChild(this.document.body, this.tooltipEl);

    setTimeout(() => {
      if (!this.tooltipEl) return;

      const hostRect = host.getBoundingClientRect();
      const tooltipRect = this.tooltipEl.getBoundingClientRect();

      let top = 0;
      let left = 0;

      if (this.tooltipPosition === 'top') {
        top = hostRect.top - tooltipRect.height - 8;
        left = hostRect.left + (hostRect.width / 2) - (tooltipRect.width / 2);
      } else if (this.tooltipPosition === 'bottom') {
        top = hostRect.bottom + 8;
        left = hostRect.left + (hostRect.width / 2) - (tooltipRect.width / 2);
      } else if (this.tooltipPosition === 'left') {
        top = hostRect.top + (hostRect.height / 2) - (tooltipRect.height / 2);
        left = hostRect.left - tooltipRect.width - 8;
      } else if (this.tooltipPosition === 'right') {
        top = hostRect.top + (hostRect.height / 2) - (tooltipRect.height / 2);
        left = hostRect.right + 8;
      }

      const padding = 8;
      left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
      if (top < padding) {
        top = hostRect.bottom + 8;
      }

      this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
      this.renderer.setStyle(this.tooltipEl, 'opacity', '1');
      this.renderer.setStyle(this.tooltipEl, 'transform', 'scale(1)');
    }, 0);
  }

  private hide() {
    if (this.tooltipEl) {
      const el = this.tooltipEl;
      this.tooltipEl = null;
      this.renderer.setStyle(el, 'opacity', '0');
      this.renderer.setStyle(el, 'transform', 'scale(0.95)');
      setTimeout(() => {
        if (el.parentNode) {
          this.renderer.removeChild(this.document.body, el);
        }
      }, 150);
    }
  }
}
