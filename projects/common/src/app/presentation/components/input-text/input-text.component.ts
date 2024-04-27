import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'com-input-text',
  standalone: true,
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  @Input() placeholder: string = '';

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  @Input() errorMessage: string = '';

  focus() {
    this.input!.nativeElement.focus();
  }
}
