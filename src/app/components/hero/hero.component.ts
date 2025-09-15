// hero.component.ts - SOLUCIÓN SIMPLIFICADA
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  HostListener,
} from '@angular/core';

// ✅ IMPORTACIÓN SIMPLE - Solo el módulo base
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule], // ✅ Sin .pick(), sin iconos específicos
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('parallaxImage', { static: false })
  parallaxImage!: ElementRef<HTMLImageElement>;

  backgroundImage: string = 'assets/images/background.png';
  private animationId?: number;

  ngAfterViewInit(): void {
    this.updateParallax();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.animationId = requestAnimationFrame(() => {
      this.updateParallax();
    });
  }

  private updateParallax(): void {
    if (!this.parallaxImage?.nativeElement) return;

    const scrolled = window.pageYOffset;
    const parallaxElement = this.parallaxImage.nativeElement;

    const speed = 0.8;
    const yPos = scrolled * speed;

    parallaxElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
  }
}
