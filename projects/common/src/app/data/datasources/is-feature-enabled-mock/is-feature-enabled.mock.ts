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

  async execute(feature: string): Promise<IsFeatureEnabledResponse> {
    return this.mutex.runExclusive(async () => {
      // fetch
      if (!this.localCache) {
        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 1000),
        );
        const response = this.remoteDatabase;
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

  private localCache?: Map<string, IsFeatureEnabledData>;

  private remoteDatabase: Map<string, IsFeatureEnabledData> = new Map([
    [
      'lifecycle/steps/signup/name',
      { development: true, staging: false, production: false },
    ],
  ]);
}
