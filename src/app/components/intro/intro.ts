import { Component } from '@angular/core';
import { Button } from '../shared/button/button';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-intro',
  imports: [Button],
  templateUrl: './intro.html',
  styleUrls: ['./intro.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('1200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Intro {
  name = 'Alvaro Paredes';
  nameLetters: string[] = [];

  constructor() {
    this.nameLetters = this.name.split('');
  }
}
