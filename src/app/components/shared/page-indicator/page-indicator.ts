import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-indicator.html',
  styleUrls: ['./page-indicator.scss']
})
export class PageIndicator {
  @Input() currentSection = 1;
  @Input() totalSections = 5;
  @Output() goTo = new EventEmitter<number>();

  sections = [1, 2, 3, 4, 5];

  onGoToSection(index: number) {
    this.goTo.emit(index);
  }
}
