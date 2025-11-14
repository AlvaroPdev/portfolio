import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-buttons',
  standalone: true,
  templateUrl: './navigation-buttons.html',
  styleUrls: ['./navigation-buttons.scss']
})
export class NavigationButtons {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  onNext() {
    this.next.emit();
  }

  onPrev() {
    this.prev.emit();
  }
}
