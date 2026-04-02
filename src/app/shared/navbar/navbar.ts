import { Component, HostListener, inject, ElementRef, AfterViewInit } from '@angular/core';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit {
  protected readonly themeService = inject(ThemeService);
  private readonly el = inject(ElementRef);

  isMenuOpen = false;
  isMobile = false;
  navbarTranslate = 0;

  private lastScrollY = 0;
  private navHeight = 64;
  private isProgrammaticScroll = false;
  private scrollEndTimer = 0;

  constructor() {
    this.checkScreenSize();
  }

  ngAfterViewInit() {
    const nav = this.el.nativeElement.querySelector('.navbar');
    if (nav) this.navHeight = nav.offsetHeight;
    this.lastScrollY = window.scrollY;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.isMobile) return;
    const currentY = window.scrollY;

    if (this.isProgrammaticScroll) {
      this.navbarTranslate = 0;
      this.lastScrollY = currentY;
      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = window.setTimeout(() => {
        this.isProgrammaticScroll = false;
        this.lastScrollY = window.scrollY;
      }, 150);
      return;
    }

    if (currentY <= 0) {
      this.navbarTranslate = 0;
      this.lastScrollY = 0;
      return;
    }

    if (currentY < 300) {
      this.navbarTranslate = 0;
      this.lastScrollY = currentY;
      return;
    }

    const delta = currentY - this.lastScrollY;
    this.navbarTranslate = Math.max(-this.navHeight, Math.min(0, this.navbarTranslate - delta));
    this.lastScrollY = currentY;
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.isProgrammaticScroll = true;
      this.navbarTranslate = 0;

      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });

      // Close menu after navigation on mobile
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
