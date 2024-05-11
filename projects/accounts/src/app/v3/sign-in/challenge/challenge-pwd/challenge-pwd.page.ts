import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountsLayout } from '@accounts/interface-adapters/layouts/accounts/accounts.layout';
import { MatIcon } from '@angular/material/icon';
import { InputComponent } from '@common/interface-adapters/components/input/input.component';
import { ButtonOutlineIconComponent } from '@common/interface-adapters/components/button-outline-icon/button-outline-icon.component';
import { CheckboxComponent } from '@common/interface-adapters/components/checkbox/checkbox.component';
import { ErrorComponent } from '@common/interface-adapters/components/error/error.component';
import { IsFeatureEnabledUseCase } from '@common/application-business-rules/usecases/is-feature-enabled/is-feature-enabled.use-case';
import { ButtonFlatComponent } from '@common/interface-adapters/components/button-flat/button-flat.component';
import { ButtonBasicComponent } from '@common/interface-adapters/components/button-basic/button-basic.component';
import { SignInWithEmailAndPasswordUseCase } from '@common/application-business-rules/usecases/sign-in-with-email-and-password/sign-in-with-email-and-password.use-case';
import { SignInWithEmailAndPasswordMock } from '@common/interface-adapters/data-sources/sign-in-with-email-and-password-mock/sign-in-with-email-and-password.mock';
import { Observable, first, lastValueFrom, map } from 'rxjs';
import { EMAIl_TOKEN } from './tokens/email.token';
import { EMAIL_PARAMETER_CONSTANT } from './constants/email-parameter.constant';
import { SignInWithEmailAndPasswordDataSource } from '@common/application-business-rules/data-sources/sign-in/sign-in.data-source';

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
      provide: EMAIl_TOKEN,
      useFactory: () => {
        const route = inject(ActivatedRoute);
        const email$ = route.queryParamMap.pipe(
          first(),
          map((queryParamMap) => {
            const email = queryParamMap.get(EMAIL_PARAMETER_CONSTANT);
            if (!email) {
              return '';
            }

            return email;
          }),
        );
        return email$;
      },
    },

    SignInWithEmailAndPasswordUseCase,
    {
      provide: SignInWithEmailAndPasswordDataSource,
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
    @Inject(EMAIl_TOKEN) private email$: Observable<string>,
    private isFeatureEnabled: IsFeatureEnabledUseCase,
    private router: Router,
    private signIn: SignInWithEmailAndPasswordUseCase,
  ) {}

  ngOnInit(): void {
    this.email$.pipe(first()).subscribe((email) => {
      this.email = email;
      if (!email) {
        this.router.navigate(['/v3/signin/identifier'], {
          queryParamsHandling: 'preserve',
          replaceUrl: true,
        });
        return;
      }
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
