import { Component } from '@angular/core';
import { AccountsLayout } from 'projects/accounts/src/app/presentation/layouts/accounts/accounts.layout';

@Component({
  selector: 'acc-challenge-pwd',
  standalone: true,
  imports: [AccountsLayout],
  templateUrl: './challenge-pwd.page.html',
  styleUrl: './challenge-pwd.page.scss',
})
export class ChallengePwdPage {}
