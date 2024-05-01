import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IsEmailExistsMock } from '@common/data/datasources/is-email-exists-mock/is-email-exists.mock';
import { IsEmailExistsRepository } from '@common/domain/repositories/is-email-exists/is-email-exists.repository';
import { IsEmailExistsUseCase } from '@common/domain/usecases/is-email-exists/is-email-exists.use-case';
import { ButtonBasicComponent } from '@common/presentation/components/button-basic/button-basic.component';
import { ButtonFlatComponent } from '@common/presentation/components/button-flat/button-flat.component';
import { InputComponent } from '@common/presentation/components/input/input.component';
import { lastValueFrom } from 'rxjs';
import { AccountsLayout } from '../../../presentation/layouts/accounts/accounts.layout';
import { AsyncPipe } from '@angular/common';
import { IsFeatureEnabledUseCase } from '@common/domain/usecases/is-feature-enabled/is-feature-enabled.use-case';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorComponent } from '@common/presentation/components/error/error.component';

/**
 * @todo translation
 */
@Component({
  selector: 'acc-sign-in-identifier',
  standalone: true,
  imports: [
    AccountsLayout,
    InputComponent,
    ErrorComponent,
    ButtonBasicComponent,
    ButtonFlatComponent,
    AsyncPipe,
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
export class SignInIdentifierPage implements OnInit, AfterViewInit {
  isChallengePwdEnabled: boolean = false;
  isCreateAccountEnabled: boolean = false;

  email: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  @ViewChild('inputEmail') inputEmail!: InputComponent;

  constructor(
    private isFeatureEnabled: IsFeatureEnabledUseCase,
    private isEmailExists: IsEmailExistsUseCase,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isFeatureEnabled
      .execute('/lifecycle/steps/signup/name')
      .then((response) => {
        this.isCreateAccountEnabled = response;
      });
    this.isFeatureEnabled
      .execute('/v3/signin/challenge/pwd')
      .then((response) => {
        this.isChallengePwdEnabled = response;
      });
  }

  ngAfterViewInit(): void {
    this.inputEmail.nativeElement.focus();
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
      this.inputEmail.nativeElement.focus();
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
          console.warn(
            `${SignInIdentifierPage.name} error code: ${response.errorCode}`,
          );
          this.errorMessage = 'Unexpected error';
          break;
      }
      this.inputEmail.nativeElement.focus();
      return;
    }

    this.router.navigate(['../challenge/pwd'], {
      relativeTo: this.route,
      state: { email: this.email },
    });
  }
}
