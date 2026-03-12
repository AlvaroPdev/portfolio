import { Component } from '@angular/core';
import { ProjectCard } from '../../shared/project-card/project-card';
import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';

interface Project {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  previewTitle?: string;
  techTags: string[];
}

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, ScrollRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects: Project[] = [
    {
      previewTitle: 'Santiago<strong>Blues</strong>',
      title: 'Santiago Blues',
      description:
        'Aplicación web responsiva para la gestión integral y promoción de servicios de marketing digital. Construida usando una arquitectura de componentes escalables en Angular 19+ y TypeScript, consumiendo una API RESTful desarrollada con Node.js y MongoDB.',
      githubUrl: 'https://github.com/AlvaroPdev/SantiagoBlues',
      techTags: ['Angular', 'Node.js', 'TypeScript', 'MongoDB'],
    },
    {
      title: 'Portfolio',
      description:
        'Portafolio personal de Frontend Developer construido con Angular 19+, TypeScript y Tailwind CSS. Implementa semántica HTML5, SSR y mejores prácticas SEO, junto con efectos visuales avanzados de UI como parallax y glassmorphism.',
      githubUrl: 'https://github.com/AlvaroPdev/portfolio',
      liveUrl: 'https://alvaroparedes.vercel.app',
      techTags: ['Angular', 'TypeScript', 'TailwindCSS'],
    },
  ];
}
