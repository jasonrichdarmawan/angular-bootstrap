import { Inject, Injectable } from '@angular/core';
import { IsFeatureEnabledDataSource } from '@common/application-business-rules/data-sources/is-feature-enabled/is-feature-enabled.data-source';
import {
  IsFeatureEnabledData,
  IsFeatureEnabledResponse,
} from '@common/entities/is-feature-enabled/is-feature-enabled.entity';
import {
  ENVIRONMENT_TOKEN,
  Environment,
  EnvironmentType,
} from 'projects/common/src/environments/environment.entity';

@Injectable()
export class IsFeatureEnabledUseCase {
  private environmentType: EnvironmentType = 'development';

  constructor(
    private dataSource: IsFeatureEnabledDataSource,
    @Inject(ENVIRONMENT_TOKEN) environment: Environment,
  ) {
    this.environmentType = environment.type;
  }

  async execute(feature: string): Promise<IsFeatureEnabledResponse> {
    const response = await this.dataSource.execute(feature);

    if (!response.ok) {
      return response;
    }

    const data: IsFeatureEnabledData = (() => {
      switch (this.environmentType) {
        case 'development':
          return { isEnabled: response.data.development ?? false };
        case 'staging':
          return { isEnabled: response.data.staging ?? false };
        case 'production':
          return { isEnabled: response.data.production ?? false };
      }
    })();

    return { ok: true, data: data };
  }
}
