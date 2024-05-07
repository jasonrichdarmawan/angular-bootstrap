import { Inject, Injectable } from '@angular/core';
import { Mutex } from '@common/api/mutex/mutex';
import {
  IsFeatureEnabledData,
  IsFeatureEnabledResponse,
} from '@common/domain/entities/is-feature-enabled/is-feature-enabled.entity';
import { IsFeatureEnabledUseCase } from '@common/domain/usecases/is-feature-enabled/is-feature-enabled.use-case';
import {
  ENVIRONMENT_TOKEN,
  Environment,
  EnvironmentType,
} from 'projects/common/src/environments/environment.entity';

@Injectable()
export class IsFeatureEnabledMock implements IsFeatureEnabledUseCase {
  private mutex: Mutex = new Mutex();
  private localCache?: Map<string, IsFeatureEnabledMockModel>;

  constructor(@Inject(ENVIRONMENT_TOKEN) private environment: Environment) {}

  async execute(feature: string): Promise<IsFeatureEnabledResponse> {
    return this.mutex.runExclusive(async () => {
      // fetch
      if (!this.localCache) {
        // simulate fetch
        const response = await new Promise<
          Map<string, IsFeatureEnabledMockModel>
        >((resolve) => {
          setTimeout(() => {
            resolve(databaseMock);
          }, 100);
        });
        this.localCache = response;

        const hasKey = response.has(feature);
        if (!hasKey) {
          return {
            ok: false,
            errorCode: 'feature-not-found',
          };
        }

        const element = response.get(feature)!;
        const data = isFeatureEnabledHelper(this.environment.type, element);

        return {
          ok: true,
          data: data,
        };
      }

      // cached
      const hasKey = this.localCache.has(feature);
      if (!hasKey) {
        return {
          ok: false,
          errorCode: 'feature-not-found',
        };
      }

      const element = this.localCache.get(feature)!;

      const data = isFeatureEnabledHelper(this.environment.type, element);

      return { ok: true, data: data };
    });
  }
}

function isFeatureEnabledHelper(
  type: EnvironmentType,
  input: IsFeatureEnabledMockModel,
) {
  const output: IsFeatureEnabledData = (() => {
    switch (type) {
      case 'development':
        return { isEnabled: input.development ?? false };
      case 'staging':
        return { isEnabled: input.staging ?? false };
      case 'production':
        return { isEnabled: input.production ?? false };
    }
  })();

  return output;
}

const databaseMock: Map<string, IsFeatureEnabledMockModel> = new Map([
  [
    '/lifecycle/steps/signup/name',
    { development: true, staging: false, production: false },
  ],
  [
    '/v3/signin/challenge/pwd',
    { development: true, staging: false, production: false },
  ],
  [
    '/v3/signin/challenge/pwd#onTryAnotherWay',
    { development: false, staging: false, production: false },
  ],
  [
    '/v3/signin/challenge/pwd#onNext',
    { development: true, staging: false, production: false },
  ],
]);

interface IsFeatureEnabledMockModel {
  development?: boolean;
  staging?: boolean;
  production?: boolean;
}
