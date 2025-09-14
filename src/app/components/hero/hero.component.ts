// hero.component.ts
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
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

    // Factor de velocidad MÁS INTENSO - valores más altos = más efecto
    const speed = 0.8; // Cambiado de 0.3 a 0.8 para efecto más notorio
    const yPos = scrolled * speed;

    // Solo la imagen se mueve, el contenido queda fijo
    parallaxElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
  }
}
