import { Inject, Injectable } from '@angular/core';
import { IsFeatureEnabledRepository } from '@common/domain/repositories/is-feature-enabled/is-feature-enabled.repository';
import {
  ENVIRONMENT_TOKEN,
  Environment,
} from 'projects/common/src/environments/environment.entity';

@Injectable()
export class IsFeatureEnabledUseCase {
  constructor(
    private repository: IsFeatureEnabledRepository,
    @Inject(ENVIRONMENT_TOKEN) private environment: Environment,
  ) {}

  async execute(feature: string): Promise<boolean> {
    const response = await this.repository.execute(feature);
    if (!response.ok) {
      console.warn(response.errorCode);
      return false;
    }

    switch (this.environment.type) {
      case 'production':
        return response.data.production;
      case 'staging':
        return response.data.staging;
      case 'development':
        return response.data.development;
      default:
        return false;
    }
  }
}
