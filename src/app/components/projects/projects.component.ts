import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('.projects-section');
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
  projects: Project[] = [
    {
      title: '',
      description:
        'Aplicación web para gestión y promoción de servicios de marketing, con frontend en Angular y backend en Node.js.',
      image: '/assets/images/projects/SantiagoBlues.png',
      link: 'https://github.com/AlvaroPdev/SantiagoBlues',
      tags: ['Angular', 'CSS', 'Node.js', 'TypeScript'],
    },
    {
      title: '',
      description:
        'Proximamente...',
      image: '/assets/images/projects/Minnails.png',
      link: 'https://github.com/AlvaroPdev',
      tags: [],
    },
  ];

  get projectColumns(): Project[][] {
    if (!this.projects.length) return [];

    const columns: Project[][] = [[], [], [], []];
    this.projects.forEach((project, index) => {
      columns[index % 4].push(project);
    });

    return columns.filter((column) => column.length > 0);
  }
}
