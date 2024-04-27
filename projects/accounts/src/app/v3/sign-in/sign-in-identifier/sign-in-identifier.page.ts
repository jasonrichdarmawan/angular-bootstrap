import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IsEmailExistsMock } from '@common/data/datasources/is-email-exists-mock/is-email-exists.mock';
import { IsEmailExistsRepository } from '@common/domain/repositories/is-email-exists/is-email-exists.repository';
import { IsEmailExistsUseCase } from '@common/domain/usecases/is-email-exists/is-email-exists.use-case';
import { ButtonBasicComponent } from '@common/presentation/components/button-basic/button-basic.component';
import { ButtonFlatComponent } from '@common/presentation/components/button-flat/button-flat.component';
import { InputTextComponent } from '@common/presentation/components/input-text/input-text.component';
import { lastValueFrom } from 'rxjs';
import { AccountsLayout } from '../../../presentation/layouts/accounts/accounts.layout';

@Component({
  selector: 'acc-sign-in-identifier',
  standalone: true,
  imports: [
    AccountsLayout,
    InputTextComponent,
    ButtonBasicComponent,
    ButtonFlatComponent,
  ],
  providers: [
    {
      provide: IsEmailExistsRepository,
      // @todo replace mock
      useClass: IsEmailExistsMock,
    },
    IsEmailExistsUseCase,
  ],
  templateUrl: './sign-in-identifier.page.html',
  styleUrl: './sign-in-identifier.page.scss',
})
export class SignInIdentifierPage implements AfterViewInit {
  email: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  @ViewChild('inputEmail') inputEmail!: InputTextComponent;

  constructor(public isEmailExists: IsEmailExistsUseCase) {}

  ngAfterViewInit(): void {
    this.inputEmail.focus();
  }

  async onCreateAccount() {
    this.isLoading = true;
    // @todo navigation
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    this.isLoading = false;
  }

  async onNext() {
    this.errorMessage = '';

    if (!this.email) {
      this.errorMessage = 'Enter an email';
      this.inputEmail.focus();
      return;
    }

    this.isLoading = true;
    const response = await lastValueFrom(
      this.isEmailExists.execute(this.email),
    );
    this.isLoading = false;

    if (!response.ok) {
      switch (response.errorCode) {
        case 'email-not-found':
          this.errorMessage = "Couldn't find your Google Account";
          break;
        default:
          this.errorMessage = 'Unexpected error';
          break;
      }
      this.inputEmail.focus();
      return;
    }

    // @todo navigation if email exists
  }
}