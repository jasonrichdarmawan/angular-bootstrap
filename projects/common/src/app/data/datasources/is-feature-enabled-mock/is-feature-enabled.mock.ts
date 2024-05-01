import { Injectable } from '@angular/core';
import { Mutex } from '@common/api/mutex/mutex';
import {
  IsFeatureEnabledData,
  IsFeatureEnabledResponse,
} from '@common/domain/entities/is-feature-enabled/is-feature-enabled.entity';
import { IsFeatureEnabledRepository } from '@common/domain/repositories/is-feature-enabled/is-feature-enabled.repository';

@Injectable()
export class IsFeatureEnabledMock implements IsFeatureEnabledRepository {
  private mutex: Mutex = new Mutex();
  private localCache?: Map<string, IsFeatureEnabledData>;

  async execute(feature: string): Promise<IsFeatureEnabledResponse> {
    return this.mutex.runExclusive(async () => {
      // fetch
      if (!this.localCache) {
        // simulate fetch
        const response = await new Promise<Map<string, IsFeatureEnabledData>>(
          (resolve) => {
            setTimeout(() => {
              resolve(this.remoteDatabase);
            }, 100);
          },
        );
        this.localCache = response;

        const hasKey = response.has(feature);
        if (!hasKey) {
          return {
            ok: false,
            errorCode: 'feature-not-found',
          };
        }

        const isFeatureEnabled = response.get(feature)!;
        return {
          ok: true,
          data: isFeatureEnabled,
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

      const isFeatureEnabled = this.localCache.get(feature)!;
      return { ok: true, data: isFeatureEnabled };
    });
  }

  private remoteDatabase: Map<string, IsFeatureEnabledData> = new Map([
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
}
