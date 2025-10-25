import { Component, Output, EventEmitter } from '@angular/core';
import { Button } from '../shared/button/button';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-intro',
  imports: [Button],
  templateUrl: './intro.html',
  styleUrls: ['./intro.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(30px)' })),
      transition('void => in', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('1200ms ease-out')
      ]),
      transition('in => out', [
        animate('600ms ease-in')
      ])
    ])
  ]
})
export class Intro {
  @Output() introComplete = new EventEmitter<void>();

  name = 'Alvaro Paredes';
  nameLetters: string[] = [];
  animationState: 'in' | 'out' = 'in';

  constructor() {
    this.nameLetters = this.name.split('');
  }

  navigateToMain() {
    this.animationState = 'out';

    // Esperar a que termine la animación antes de emitir el evento
    setTimeout(() => {
      this.introComplete.emit();
    }, 600);
  }
}
