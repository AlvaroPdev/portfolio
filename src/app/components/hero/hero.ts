import { Component, HostListener } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { CvDownloadButton } from '../../shared/cv-download-button/cv-download-button';
import { MetaballsBg } from './metaballs-bg/metaballs-bg';

@Component({
  selector: 'app-hero',
  imports: [ScrollRevealDirective, CvDownloadButton, MetaballsBg],
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
