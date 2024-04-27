import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'com-button-basic',
  standalone: true,
  imports: [],
  templateUrl: './button-basic.component.html',
  styleUrl: './button-basic.component.scss',
})
export class ButtonBasicComponent {
  @Input() disabled: boolean = false;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter();
}
