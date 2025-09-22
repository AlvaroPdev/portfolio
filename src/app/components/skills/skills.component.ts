import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  imports: [ ],
})
export class SkillsComponent implements AfterViewInit {
  skills = [
    {
      name: 'Angular',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/angular.svg',
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg',
    },
    {
      name: 'HTML',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg',
    },
    {
      name: 'CSS',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg',
    },
    {
      name: 'SCSS',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/sass.svg',
    },
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg',
    },
  ];

  learningSkills = [
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.simpleicons.org/nodedotjs/white',
    },
    {
      name: 'Nest.js',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nestjs.svg',
    }
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('.skills-section');
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

  getSvgIconStyle() {
    return {
      filter: 'invert(1)',
    };
  }
}
