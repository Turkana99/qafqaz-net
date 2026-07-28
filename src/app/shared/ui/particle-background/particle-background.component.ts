import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    AfterViewInit,
    ViewChild,
    inject,
    PLATFORM_ID
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

@Component({
    selector: 'app-particle-background',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <canvas
      #canvas
      class="absolute inset-0 w-full h-full pointer-events-none"
      style="z-index: 0;"
    ></canvas>
  `,
    styles: [`
      :host {
        display: block;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }
    `,]
})
export class ParticleBackgroundComponent implements AfterViewInit,
OnDestroy {
    @ViewChild('canvas', {static: true})
    private canvasRef !: ElementRef < HTMLCanvasElement >;

    private readonly ngZone = inject(NgZone);
    private readonly platformId = inject(PLATFORM_ID);

    private ctx : CanvasRenderingContext2D | null = null;
    private particles : Particle[] = [];
    private animationFrameId : number | null = null;
    private resizeObserver : ResizeObserver | null = null;
    private width = 0;
    private height = 0;

    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d');
        if (!this.ctx) {
            return;
        }

        this.ngZone.runOutsideAngular(() => {
            this.initResizeObserver(canvas);
        });
    }

    private initResizeObserver(canvas : HTMLCanvasElement): void {
        this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const rect = entry.contentRect;
                this.resizeCanvas(rect.width, rect.height);
            }
        });

        this.resizeObserver.observe(canvas);
    }

    private resizeCanvas(newWidth : number, newHeight : number): void {
        if (newWidth === 0 || newHeight === 0) {
            return;
        }

        const canvas = this.canvasRef.nativeElement;
        const dpr = window.devicePixelRatio || 1;

        this.width = newWidth;
        this.height = newHeight;

        canvas.width = this.width * dpr;
        canvas.height = this.height * dpr;

        if (this.ctx) {
            this.ctx.scale(dpr, dpr);
        }

        this.initParticles();
        this.startAnimation();
    }

    private initParticles(): void {
        const isMobile = this.width < 768;
        const count = isMobile ? 25 : 65;

        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 1.5
            });
        }
    }

    private startAnimation(): void {
        this.stopAnimation();

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            this.drawFrame();
            return;
        }

        const animate = () => {
            this.updateParticles();
            this.drawFrame();
            this.animationFrameId = requestAnimationFrame(animate);
        };

        this.animationFrameId = requestAnimationFrame(animate);
    }

    private updateParticles(): void {
        for (const p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.width) {
                p.vx *= -1;
            }
            if (p.y < 0 || p.y > this.height) {
                p.vy *= -1;
            }
        }
    }

    private drawFrame(): void {
        if (!this.ctx) {
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        const maxDist = this.width < 768 ? 250 : 330;

        // Draw connecting lines
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.22;
                    this.ctx.strokeStyle = `rgba(128, 137, 157, ${alpha})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw particles
        for (const p of this.particles) {
            this.ctx.fillStyle = 'rgba(128, 137, 157, 0.45)';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    private stopAnimation(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    ngOnDestroy(): void {
        this.stopAnimation();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }
}
