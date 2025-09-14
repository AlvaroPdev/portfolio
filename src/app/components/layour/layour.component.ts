import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-layour',
  imports: [SidebarComponent, HeroComponent],
  templateUrl: './layour.component.html',
  styleUrls: ['./layour.component.scss'],
})
export class LayourComponent {
 }
