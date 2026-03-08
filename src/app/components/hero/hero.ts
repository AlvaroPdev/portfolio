import { Component, HostListener } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [ScrollRevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  parallaxOffset = 0;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.parallaxOffset = window.scrollY * 0.5;
  }
}
