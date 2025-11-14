import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { HeroSection } from '../sections/hero/hero';
import { SkillsSection } from '../sections/skills/skills';
import { ProjectsSection } from '../sections/projects/projects';
import { ExperienceSection } from '../sections/experience/experience';
import { ContactSection } from '../sections/contact/contact';
import { NavigationButtons } from '../shared/navigation-buttons/navigation-buttons';
import { PageIndicator } from '../shared/page-indicator/page-indicator';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    HeroSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    ContactSection,
    NavigationButtons,
    PageIndicator
  ],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Main implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  currentSection = 1; // Empezamos en 1 porque 0 es el clone
  totalSections = 5;
  scrollProgress = 0;
  isScrolling = false;

  ngAfterViewInit() {
    // Posicionar en el hero real (index 1)
    const container = this.scrollContainer.nativeElement;
    container.scrollLeft = window.innerWidth;
    this.updateScrollProgress();
  }

  nextSection() {
    if (this.isScrolling) return;
    this.isScrolling = true;

    const container = this.scrollContainer.nativeElement;
    container.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth'
    });

    setTimeout(() => {
      this.checkLoopPosition();
      this.isScrolling = false;
    }, 500);
  }

  prevSection() {
    if (this.isScrolling) return;
    this.isScrolling = true;

    const container = this.scrollContainer.nativeElement;
    container.scrollBy({
      left: -window.innerWidth,
      behavior: 'smooth'
    });

    setTimeout(() => {
      this.checkLoopPosition();
      this.isScrolling = false;
    }, 500);
  }

  onScroll() {
    this.updateScrollProgress();
  }

  checkLoopPosition() {
    const container = this.scrollContainer.nativeElement;
    const scrollPosition = Math.round(container.scrollLeft / window.innerWidth);

    // Si estamos en el clone del final (index 6), saltar al hero real (index 1)
    if (scrollPosition === 6) {
      setTimeout(() => {
        container.scrollLeft = window.innerWidth;
        this.currentSection = 1;
      }, 100);
    }
    // Si estamos en el clone del inicio (index 0), saltar al contact real (index 5)
    else if (scrollPosition === 0) {
      setTimeout(() => {
        container.scrollLeft = 5 * window.innerWidth;
        this.currentSection = 5;
      }, 100);
    }
    else {
      this.currentSection = scrollPosition;
    }
  }

  updateScrollProgress() {
    const container = this.scrollContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const scrollPosition = Math.round(scrollLeft / window.innerWidth);

    // Actualizar currentSection basado en la posición real
    if (scrollPosition >= 1 && scrollPosition <= 5) {
      this.currentSection = scrollPosition;
    }

    const maxScroll = container.scrollWidth - container.clientWidth;
    this.scrollProgress = (scrollLeft / maxScroll) * 100;
  }

  goToSection(index: number) {
    if (this.isScrolling) return;
    this.isScrolling = true;

    const container = this.scrollContainer.nativeElement;
    container.scrollTo({
      left: index * window.innerWidth,
      behavior: 'smooth'
    });

    this.currentSection = index;

    setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }
}
