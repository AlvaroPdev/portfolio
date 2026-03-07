import { Component } from '@angular/core';
import { ProjectCard } from '../../shared/project-card/project-card';

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
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects: Project[] = [
    {
      previewTitle: 'Santiago<strong>Blues</strong>',
      title: 'Santiago Blues',
      description:
        'Plataforma web para la gestión y promoción de servicios de marketing. Arquitectura frontend moderno con Angular y API RESTful con Node.js.',
      githubUrl: 'https://github.com/AlvaroPdev/SantiagoBlues',
      techTags: ['Angular', 'Node.js', 'TypeScript', 'MongoDB'],
    },
    {
      title: 'Portfolio',
      description:
        'Portfolio personal construido con Angular 19+, TailwindCSS y efectos visuales como parallax y glassmorphism.',
      githubUrl: 'https://github.com/AlvaroPdev/portfolio',
      liveUrl: 'https://alvaroparedes.vercel.app',
      techTags: ['Angular', 'TypeScript', 'TailwindCSS'],
    },
  ];
}
