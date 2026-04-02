import { Component, AfterViewInit, OnDestroy, viewChild, ElementRef, inject, effect } from '@angular/core';
import { ThemeService } from '../../../shared/theme/theme.service';

class Dot {
    x: number;
    y: number;
    radius: number;
    angle: number;
    speed: number;
    range: number;
    baseX: number;
    baseY: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 100 + 120;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.005 + Math.random() * 0.01;
        this.range = 100 + Math.random() * 150;
        this.baseX = this.x;
        this.baseY = this.y;
    }

    update() {
        this.angle += this.speed;
        this.x = this.baseX + Math.cos(this.angle) * this.range;
        this.y = this.baseY + Math.sin(this.angle) * this.range;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

@Component({
    selector: 'app-metaballs-bg',
    templateUrl: './metaballs-bg.html',
    styleUrl: './metaballs-bg.css',
})
export class MetaballsBg implements AfterViewInit, OnDestroy {
    private readonly themeService = inject(ThemeService);
    private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    private dots: Dot[] = [];
    private animationId = 0;
    private readonly dotCount = 15;
    private resizeHandler = () => this.resize();
    private prefersReducedMotion = window.matchMedia('(prefers-color-scheme: reduce').matches
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    private isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    floodColor = '#ffffff';
    floodOpacity = '0.08';

    constructor() {
        effect(() => {
            const theme = this.themeService.theme();
            this.floodColor = theme === 'dark' ? '#ffffff' : '#000000';
            this.floodOpacity = theme === 'dark' ? '0.08' : '0.06';
        });
    }

    ngAfterViewInit() {
        if (this.prefersReducedMotion || this.isSafari) return;

        const canvas = this.canvasRef().nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        this.resize();
        for (let i = 0; i < this.dotCount; i++) {
            this.dots.push(new Dot(canvas.width, canvas.height));
        }

        window.addEventListener('resize', this.resizeHandler);
        this.animate(ctx);
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.resizeHandler);
    }

    private resize() {
        const canvas = this.canvasRef().nativeElement;
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
    }

    private animate(ctx: CanvasRenderingContext2D) {
        const canvas = ctx.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        for (const dot of this.dots) {
            dot.update();
            dot.draw(ctx);
        }
        this.animationId = requestAnimationFrame(() => this.animate(ctx));
    }
}
