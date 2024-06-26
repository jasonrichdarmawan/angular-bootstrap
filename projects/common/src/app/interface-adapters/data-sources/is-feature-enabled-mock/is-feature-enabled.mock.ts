import { Inject, Injectable } from '@angular/core';
import { Mutex } from '@common/frameworks-and-drivers/mutex/mutex';
import {
  IsFeatureEnabledDataSource,
  IsFeatureEnabledModelResponse,
} from '@common/application-business-rules/data-sources/is-feature-enabled/is-feature-enabled.data-source';

@Injectable()
export class IsFeatureEnabledMock implements IsFeatureEnabledDataSource {
  private localCache?: Map<string, IsFeatureEnabledMockModel>;

  constructor(@Inject(Mutex) private mutex: Mutex) {}

  async execute(feature: string): Promise<IsFeatureEnabledModelResponse> {
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

        const data = response.get(feature)!;

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

      const data = this.localCache.get(feature)!;

      return {
        ok: true,
        data: data,
      };
    });
  }
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
  [
    'accounts/layouts/accounts/language',
    { development: true, staging: false, production: false },
  ],
]);

interface IsFeatureEnabledMockModel {
  development?: boolean;
  staging?: boolean;
  production?: boolean;
}
