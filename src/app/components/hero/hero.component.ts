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

  backgroundImage: string = 'assets/images/dump2.jpg';
  private animationId?: number;

  typewriterText: string = '';
  fullText: string = 'Desarrollador Frontend Junior';
  typewriterIndex: number = 0;
  typewriterInterval?: any;

  ngAfterViewInit(): void {
    this.updateParallax();
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
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
    if (this.parallaxImage?.nativeElement) {
      const scrolled = window.scrollY;
      const parallaxElement = this.parallaxImage.nativeElement;
      const speed = 0.5; // Velocidad del parallax

      // El efecto parallax básico: la imagen se mueve más lento que el scroll
      const yPos = scrolled * speed;

      // Aplica la transformación con una transición suave
      parallaxElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }

  startTypewriter(): void {
    this.typewriterText = '';
    this.typewriterIndex = 0;
    this.typewriterInterval = setInterval(() => {
      if (this.typewriterIndex < this.fullText.length) {
        this.typewriterText += this.fullText.charAt(this.typewriterIndex);
        this.typewriterIndex++;
      } else {
        clearInterval(this.typewriterInterval);
      }
    }, 80);
  }
}
