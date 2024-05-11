import { Inject, Injectable } from '@angular/core';
import { IsFeatureEnabledDataSource } from '@common/application-business-rules/data-sources/is-feature-enabled/is-feature-enabled.data-source';
import { IsFeatureEnabledResponse } from '@common/entities/is-feature-enabled/is-feature-enabled.entity';

@Injectable()
export class IsFeatureEnabledUseCase {
  constructor(
    @Inject(IsFeatureEnabledDataSource)
    private dataSource: IsFeatureEnabledDataSource,
  ) {}

  execute(feature: string): Promise<IsFeatureEnabledResponse> {
    return this.dataSource.execute(feature);
  }
}
