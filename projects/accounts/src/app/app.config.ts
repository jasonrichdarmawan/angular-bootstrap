import { ApplicationConfig, inject } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IsFeatureEnabledMock } from '@common/data/datasources/is-feature-enabled-mock/is-feature-enabled.mock';
import { IsFeatureEnabledUseCase } from '@common/domain/usecases/is-feature-enabled/is-feature-enabled.use-case';
import { ENVIRONMENT_TOKEN } from 'projects/common/src/environments/environment.entity';
import { environment } from 'projects/common/src/environments/environment';
import { HOST_LANGUAGE_TOKEN } from '@common/presentation/tokens/host-language-token/host-language.token';
import { HOST_LANGUAGE_PARAMETER_CONSTANT } from '@common/presentation/constants/host-language-parameter/host-language-parameter.constant';
import { DEFAULT_LANGUAGE_CONSTANT } from './presentation/constants/default_language/language-default.constant';
import { map } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { GetTranslationsUseCase } from '@common/domain/usecases/get-translations/get-translations.use-case';
import { GettranslationsLocale } from '@common/data/datasources/get-translations-locale/get-translations.locale';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: environment,
    },
    {
      provide: IsFeatureEnabledUseCase,
      useClass: IsFeatureEnabledMock,
    },
    {
      provide: HOST_LANGUAGE_TOKEN,
      useFactory: () => {
        const route = inject(ActivatedRoute);
        const hl = route.queryParamMap.pipe(
          map((queryParamMap) => {
            const hl = queryParamMap.get(HOST_LANGUAGE_PARAMETER_CONSTANT);
            if (!hl) {
              return DEFAULT_LANGUAGE_CONSTANT;
            }

            return hl;
          }),
        );
        return hl;
      },
    },
    {
      provide: GetTranslationsUseCase,
      useClass: GettranslationsLocale,
    },
  ],
};
