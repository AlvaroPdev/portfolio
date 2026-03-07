import { Component, HostListener } from '@angular/core';
import { CvDownloadButton } from '../../shared/cv-download-button/cv-download-button';

@Component({
  selector: 'app-hero',
  imports: [CvDownloadButton],
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
