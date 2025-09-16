import { Component } from '@angular/core';
import { TiltDirective } from '../../directives/tilt.directive';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TiltDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent { }
