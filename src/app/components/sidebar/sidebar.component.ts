import { Component } from '@angular/core';

interface NavItem {
  route: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isExpanded = false;

  navItems: NavItem[] = [
    { route: '#home', icon: 'home', label: 'Inicio' },
    { route: '#about', icon: 'person', label: 'Sobre Mí' },
    { route: '#skills', icon: 'cognition_2', label: 'Habilidades' },
    { route: '#projects', icon: 'code', label: 'Proyectos' },
    { route: '#contact', icon: 'mail', label: 'Contacto' }
  ];
}
