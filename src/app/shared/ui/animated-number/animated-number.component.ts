import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Inject, Input, OnInit, PLATFORM_ID, signal, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-animated-number',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="tabular-nums" style="font-variant-numeric: tabular-nums;">
      {{ displayValue() }}
    </span>
  `
})
export class AnimatedNumberComponent implements OnInit {
  @Input({ required: true }) finalValue!: string;
  @Input() sequence?: readonly number[];

  displayValue = signal<string>('');
  
  private isBrowser: boolean;
  private observer: IntersectionObserver | null = null;
  private intervalId: any;

  constructor(
    private el: ElementRef,
    private destroyRef: DestroyRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.sequence || this.sequence.length === 0 || !this.isBrowser) {
      this.displayValue.set(this.finalValue);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.displayValue.set(this.finalValue);
      return;
    }

    // Initialize with first sequence item immediately to avoid flash of final value
    this.displayValue.set(this.sequence[0].toString());

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startAnimation();
            if (this.observer) {
              this.observer.disconnect();
            }
          }
        });
      }, {
        threshold: 0.15
      });

      this.observer.observe(this.el.nativeElement);
    });

    this.destroyRef.onDestroy(() => {
      if (this.observer) {
        this.observer.disconnect();
      }
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    });
  }

  private startAnimation() {
    let currentIndex = 1;
    
    this.intervalId = setInterval(() => {
      if (currentIndex < this.sequence!.length) {
        this.displayValue.set(this.sequence![currentIndex].toString());
        currentIndex++;
      } else {
        this.displayValue.set(this.finalValue);
        clearInterval(this.intervalId);
      }
    }, 80);
  }
}
