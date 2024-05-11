/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'input[com-input]',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ElementRef<HTMLInputElement> {
  nativeElement: HTMLInputElement;

  @HostBinding('class.error') @Input() isError: boolean = false;

  constructor(elementRef: ElementRef) {
    this.nativeElement = elementRef.nativeElement;
  }
}
