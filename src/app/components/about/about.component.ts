import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { TiltDirective } from '../../directives/tilt.directive';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TiltDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  imgProfile = '../../../assets/images/profile2.JPG';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('.about-section');
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(section, 'visible');
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(section);
    }
  }
}
