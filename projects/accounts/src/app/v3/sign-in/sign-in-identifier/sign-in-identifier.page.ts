import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IsEmailExistsMock } from '@common/data/datasources/is-email-exists-mock/is-email-exists.mock';
import { IsEmailExistsUseCase } from '@common/domain/usecases/is-email-exists/is-email-exists.use-case';
import { ButtonBasicComponent } from '@common/presentation/components/button-basic/button-basic.component';
import { ButtonFlatComponent } from '@common/presentation/components/button-flat/button-flat.component';
import { InputComponent } from '@common/presentation/components/input/input.component';
import { Observable, Subject, lastValueFrom, takeUntil } from 'rxjs';
import { AccountsLayout } from '../../../presentation/layouts/accounts/accounts.layout';
import { IsFeatureEnabledUseCase } from '@common/domain/usecases/is-feature-enabled/is-feature-enabled.use-case';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorComponent } from '@common/presentation/components/error/error.component';
import { TranslatePipe } from '@common/presentation/pipes/translate/translate.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetTranslationsUseCase } from '@common/domain/usecases/get-translations/get-translations.use-case';
import { HOST_LANGUAGE_TOKEN } from '@common/presentation/tokens/host-language-token/host-language.token';

/**
 * @todo translation
 */
@Component({
  selector: 'acc-sign-in-identifier',
  standalone: true,
  imports: [
    AccountsLayout,
    ButtonBasicComponent,
    ButtonFlatComponent,
    ErrorComponent,
    InputComponent,
    RouterLink,
    TranslatePipe,
  ],
  providers: [
    {
      provide: IsEmailExistsUseCase,
      // @todo replace mock
      useClass: IsEmailExistsMock,
    },
  ],
  templateUrl: './sign-in-identifier.page.html',
  styleUrl: './sign-in-identifier.page.scss',
})
export class SignInIdentifierPage implements OnInit, AfterViewInit, OnDestroy {
  isChallengePwdEnabled: boolean = false;
  isCreateAccountEnabled: boolean = false;
  isDestroyed$: Subject<void> = new Subject();

  email: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  @ViewChild('inputEmail') inputEmail!: InputComponent;

  translations: Record<string, string> = {};

  constructor(
    @Inject(HOST_LANGUAGE_TOKEN) private hostLanguage$: Observable<string>,
    private getTranslations: GetTranslationsUseCase,
    private isEmailExists: IsEmailExistsUseCase,
    private isFeatureEnabled: IsFeatureEnabledUseCase,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.hostLanguage$.pipe(takeUntilDestroyed()).subscribe((hostLanguage) => {
      this.getTranslations
        .execute(
          '/locale/v3/sign-in/sign-in-identifier/sign-in-identifier',
          hostLanguage,
        )
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe({
          next: (translations) => {
            this.translations = translations;
          },
        });
    });
  }

  ngOnInit(): void {
    this.isFeatureEnabled
      .execute('/lifecycle/steps/signup/name')
      .then((response) => {
        if (!response.ok) {
          this.isCreateAccountEnabled = false;
          return;
        }
        this.isCreateAccountEnabled = response.data.isEnabled;
      });
    this.isFeatureEnabled
      .execute('/v3/signin/challenge/pwd')
      .then((response) => {
        if (!response.ok) {
          this.isChallengePwdEnabled = false;
          return;
        }
        this.isChallengePwdEnabled = response.data.isEnabled;
      });
  }

  ngAfterViewInit(): void {
    this.inputEmail.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
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
