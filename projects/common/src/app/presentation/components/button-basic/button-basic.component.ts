/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'button[com-basic], a[com-basic]',
  standalone: true,
  imports: [],
  templateUrl: './button-basic.component.html',
  styleUrl: './button-basic.component.scss',
})
export class ButtonBasicComponent {}
