import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsLayout } from 'projects/accounts/src/app/presentation/layouts/accounts/accounts.layout';
import { MatIcon } from '@angular/material/icon';
import { InputTextComponent } from '@common/presentation/components/input-text/input-text.component';
import { ButtonOutlineIconComponent } from '@common/presentation/components/button-outline-icon/button-outline-icon.component';

/**
 * @todo show error if email is empty
 */
@Component({
  selector: 'acc-challenge-pwd',
  standalone: true,
  imports: [
    AccountsLayout,
    ButtonOutlineIconComponent,
    NgTemplateOutlet,
    MatIcon,
    InputTextComponent,
  ],
  templateUrl: './challenge-pwd.page.html',
  styleUrl: './challenge-pwd.page.scss',
})
export class ChallengePwdPage {
  readonly email: string = '';

  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {
    const email = this.router.getCurrentNavigation()?.extras?.state?.['email'];
    if (email) {
      this.email = email;
    }
  }

  async onNext() {}
}
