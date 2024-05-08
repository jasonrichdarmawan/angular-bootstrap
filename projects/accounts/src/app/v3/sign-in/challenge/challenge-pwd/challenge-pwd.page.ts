import { Location, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountsLayout } from 'projects/accounts/src/app/presentation/layouts/accounts/accounts.layout';
import { MatIcon } from '@angular/material/icon';
import { InputComponent } from '@common/presentation/components/input/input.component';
import { ButtonOutlineIconComponent } from '@common/presentation/components/button-outline-icon/button-outline-icon.component';
import { CheckboxComponent } from '@common/presentation/components/checkbox/checkbox.component';
import { ErrorComponent } from '@common/presentation/components/error/error.component';
import { IsFeatureEnabledUseCase } from '@common/domain/usecases/is-feature-enabled/is-feature-enabled.use-case';
import { ButtonFlatComponent } from '@common/presentation/components/button-flat/button-flat.component';
import { ButtonBasicComponent } from '@common/presentation/components/button-basic/button-basic.component';
import { SignInWithEmailAndPasswordUseCase } from '@common/domain/usecases/sign-in-with-email-and-password/sign-in-with-email-and-password.use-case';
import { SignInWithEmailAndPasswordMock } from '@common/data/datasources/sign-in-with-email-and-password-mock/sign-in-with-email-and-password.mock';
import { first, lastValueFrom } from 'rxjs';

/**
 * @todo show error if email is empty
 */
@Component({
  selector: 'acc-challenge-pwd',
  standalone: true,
  imports: [
    AccountsLayout,
    ButtonBasicComponent,
    ButtonFlatComponent,
    ButtonOutlineIconComponent,
    CheckboxComponent,
    ErrorComponent,
    InputComponent,
    MatIcon,
    NgTemplateOutlet,
    RouterLink,
  ],
  providers: [
    {
      provide: SignInWithEmailAndPasswordUseCase,
      useClass: SignInWithEmailAndPasswordMock,
    },
  ],
  templateUrl: './challenge-pwd.page.html',
  styleUrl: './challenge-pwd.page.scss',
})
export class ChallengePwdPage implements OnInit, AfterViewInit {
  email: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  isOnNextEnabled: boolean = false;
  isOnTryAnotherWayEnabled: boolean = false;
  password: string = '';
  showPassword: boolean = false;

  @ViewChild('inputPassword') inputPassword!: InputComponent;

  constructor(
    private isFeatureEnabled: IsFeatureEnabledUseCase,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private signIn: SignInWithEmailAndPasswordUseCase,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe((queryParamMap) => {
      const email = queryParamMap.get('email');
      if (!email) {
        this.location.back();
        return;
      }
      this.email = email;
    });
    this.isFeatureEnabled
      .execute('/v3/signin/challenge/pwd#onTryAnotherWay')
      .then((response) => {
        if (!response.ok) {
          this.isOnTryAnotherWayEnabled = false;
          return;
        }
        this.isOnTryAnotherWayEnabled = response.data.isEnabled;
      });
    this.isFeatureEnabled
      .execute('/v3/signin/challenge/pwd#onNext')
      .then((response) => {
        if (!response.ok) {
          this.isOnNextEnabled = false;
          return;
        }
        this.isOnNextEnabled = response.data.isEnabled;
      });
  }

  ngAfterViewInit(): void {
    this.inputPassword.nativeElement.focus();
  }

  async onEmail() {
    this.router.navigate(['/v3/signin/identifier'], {
      queryParams: { email: undefined },
      queryParamsHandling: 'merge',
    });
  }

  async onNext() {
    this.errorMessage = '';

    if (!this.password) {
      this.errorMessage = 'Enter a password';
      this.password = '';
      this.inputPassword.nativeElement.focus();
      return;
    }

    this.isLoading = true;
    const response = await lastValueFrom(
      this.signIn.execute(this.email, this.password),
    );
    this.isLoading = false;
    if (!response.ok) {
      switch (response.errorCode) {
        case 'email-not-found':
          console.warn(
            `${ChallengePwdPage.name} was not expected to be activated without email`,
          );
          this.errorMessage = 'Unexpected error';
          this.password = '';
          break;
        case 'wrong-password':
          this.errorMessage = 'Wrong Password. Try again';
          this.password = '';
          break;
        default:
          console.warn(
            `${ChallengePwdPage.name} error code: ${response.errorCode}`,
          );
          this.errorMessage = 'Unexpected error';
          this.password = '';
          break;
      }
      this.inputPassword.nativeElement.focus();
      return;
    }
  }
}
