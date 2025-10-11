import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements AfterViewInit {
  experiences = [
    {
      company: 'IBM',
      period: 'May 2025 - Nov 2025',
      role: 'Student Frontend Developer',
      description: 'Auditoría y desarrollo de componentes reutilizables en Angular. Mantenimiento de microfrontends y tareas de frontend.'
    },
    {
      company: 'IBM',
      period: 'Nov 2025 - Presente',
      role: 'Frontend Developer Jr',
      description: 'Desarrollo de componentes reutilizables en Angular. Mantenimiento de microfrontends y tareas de frontend.'
    },

    // Puedes agregar más experiencias aquí
    // {
    //   company: 'Empresa X',
    //   period: '2022 - 2023',
    //   role: 'Desarrollador Junior',
    //   description: 'Descripción breve de la experiencia.'
    // }
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('.timeline-section');
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
