import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'com-checkbox',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  @Input() isChecked: boolean = false;
  @Output() isCheckedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() label: string = '';
}
