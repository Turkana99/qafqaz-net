import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDirection: 'left' | 'right' | 'up' | 'down' | 'none' = 'up';
  @Input() revealDelay = 0;
  @Input() revealDuration = 600;
  @Input() revealDistance = 40;
  @Input() revealOnce = true;

  private observer: IntersectionObserver | null = null;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || this.revealDirection === 'none') {
      return;
    }

    this.setHiddenState();

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.reveal();
            if (this.revealOnce && this.observer) {
              this.observer.disconnect();
            }
          } else if (!this.revealOnce) {
            this.setHiddenState();
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      this.observer.observe(this.el.nativeElement);
    });
  }

  private setHiddenState() {
    let transformValue = '';
    switch (this.revealDirection) {
      case 'left':
        transformValue = `translateX(-${this.revealDistance}px)`;
        break;
      case 'right':
        transformValue = `translateX(${this.revealDistance}px)`;
        break;
      case 'up':
        transformValue = `translateY(${this.revealDistance}px)`;
        break;
      case 'down':
        transformValue = `translateY(-${this.revealDistance}px)`;
        break;
    }

    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', transformValue);
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'opacity, transform');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
  }

  private reveal() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', `opacity ${this.revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${this.revealDelay}ms, transform ${this.revealDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${this.revealDelay}ms`);
    
    requestAnimationFrame(() => {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate(0, 0)');
      
      setTimeout(() => {
        this.renderer.removeStyle(this.el.nativeElement, 'will-change');
      }, this.revealDuration + this.revealDelay);
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
