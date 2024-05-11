import { ApplicationConfig, inject } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IsFeatureEnabledMock } from '@common/interface-adapters/data-sources/is-feature-enabled-mock/is-feature-enabled.mock';
import { IsFeatureEnabledUseCase } from '@common/application-business-rules/usecases/is-feature-enabled/is-feature-enabled.use-case';
import { ENVIRONMENT_TOKEN } from 'projects/common/src/environments/environment.entity';
import { environment } from 'projects/common/src/environments/environment';
import { HOST_LANGUAGE_TOKEN } from '@common/interface-adapters/tokens/host-language-token/host-language.token';
import { HOST_LANGUAGE_PARAMETER_CONSTANT } from '@common/interface-adapters/constants/host-language-parameter/host-language-parameter.constant';
import { DEFAULT_LANGUAGE_CONSTANT } from './interface-adapters/constants/default_language/language-default.constant';
import { map } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { GetTranslationsUseCase } from '@common/application-business-rules/usecases/get-translations/get-translations.use-case';
import { Mutex } from '@common/frameworks-and-drivers/mutex/mutex';
import { MutexImplementation } from '@common/frameworks-and-drivers/mutex/mutex.implementation';
import { GetTranslationsDataSource } from '@common/application-business-rules/data-sources/get-translations/get-translations.data-source';
import { IsFeatureEnabledDataSource } from '@common/application-business-rules/data-sources/is-feature-enabled/is-feature-enabled.data-source';
import { GetTranslationsLocale } from '@common/interface-adapters/data-sources/get-translations-locale/get-translations.locale';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),

    { provide: ENVIRONMENT_TOKEN, useValue: environment },

    {
      provide: HOST_LANGUAGE_TOKEN,
      useFactory: () => {
        const route = inject(ActivatedRoute);
        const hl$ = route.queryParamMap.pipe(
          map((queryParamMap) => {
            const hl = queryParamMap.get(HOST_LANGUAGE_PARAMETER_CONSTANT);
            if (!hl) {
              return DEFAULT_LANGUAGE_CONSTANT;
            }

            return hl;
          }),
        );
        return hl$;
      },
    },

    { provide: Mutex, useClass: MutexImplementation },

    IsFeatureEnabledUseCase,
    { provide: IsFeatureEnabledDataSource, useClass: IsFeatureEnabledMock },

    GetTranslationsUseCase,
    { provide: GetTranslationsDataSource, useClass: GetTranslationsLocale },
  ],
};
