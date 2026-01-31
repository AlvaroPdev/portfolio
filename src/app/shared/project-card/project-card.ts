import { Component, input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  title = input.required<string>();
  description = input.required<string>();
  githubUrl = input.required<string>();
  techTags = input.required<string[]>();
}
