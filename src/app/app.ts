import { Component, signal } from '@angular/core';
import { Navbar } from './shared/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { CvDownloadButton } from './shared/cv-download-button/cv-download-button';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, About, Skills, Projects, Footer, CvDownloadButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor() {
    history.scrollRestoration = 'manual';
  }
}
