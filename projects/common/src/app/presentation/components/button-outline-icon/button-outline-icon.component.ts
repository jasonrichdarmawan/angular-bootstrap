/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'button[com-outline-icon], a[com-outline-icon]',
  standalone: true,
  imports: [],
  templateUrl: './button-outline-icon.component.html',
  styleUrl: './button-outline-icon.component.scss',
})
export class ButtonOutlineIconComponent {
  @Input() label: string = '';
}
