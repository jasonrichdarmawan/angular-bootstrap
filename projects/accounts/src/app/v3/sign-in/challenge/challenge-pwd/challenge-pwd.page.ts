import { Location, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountsLayout } from 'projects/accounts/src/app/presentation/layouts/accounts/accounts.layout';
import { MatIcon } from '@angular/material/icon';
import { InputComponent } from '@common/presentation/components/input/input.component';
import { ButtonOutlineIconComponent } from '@common/presentation/components/button-outline-icon/button-outline-icon.component';
import { CheckboxComponent } from '@common/presentation/components/checkbox/checkbox.component';
import { ErrorComponent } from '@common/presentation/components/error/error.component';

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
    InputComponent,
    ErrorComponent,
    CheckboxComponent,
    RouterLink,
  ],
  templateUrl: './challenge-pwd.page.html',
  styleUrl: './challenge-pwd.page.scss',
})
export class ChallengePwdPage {
  readonly email: string = '';

  errorMessage: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
  ) {
    const email = this.router.getCurrentNavigation()?.extras?.state?.['email'];
    if (email) {
      this.email = email;
    }
  }

  async onEmail() {
    this.location.back();
  }

  async onNext() {}
}
