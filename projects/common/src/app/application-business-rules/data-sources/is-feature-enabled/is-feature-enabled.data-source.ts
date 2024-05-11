import { IsFeatureEnabledResponse } from '@common/entities/is-feature-enabled/is-feature-enabled.entity';

export abstract class IsFeatureEnabledDataSource {
  abstract execute(feature: string): Promise<IsFeatureEnabledResponse>;
}
