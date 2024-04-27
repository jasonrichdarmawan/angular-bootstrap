import { Component, Input } from '@angular/core';

@Component({
  selector: 'acc-accounts',
  standalone: true,
  imports: [],
  templateUrl: './accounts.layout.html',
  styleUrl: './accounts.layout.scss',
})
export class AccountsLayout {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() showOverlay: boolean = false;
}