import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IsFeatureEnabledMock } from '@common/data/datasources/is-feature-enabled-mock/is-feature-enabled.mock';
import { IsFeatureEnabledUseCase } from '@common/domain/usecases/is-feature-enabled/is-feature-enabled.use-case';
import { ENVIRONMENT_TOKEN } from 'projects/common/src/environments/environment.entity';
import { environment } from 'projects/common/src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: environment,
    },
    {
      provide: IsFeatureEnabledUseCase,
      useClass: IsFeatureEnabledMock,
    },
  ],
};
