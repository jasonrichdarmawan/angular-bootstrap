import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'com-button-flat',
  standalone: true,
  imports: [],
  templateUrl: './button-flat.component.html',
  styleUrl: './button-flat.component.scss',
})
export class ButtonFlatComponent {
  @Input() disabled: boolean = false;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter();
}
