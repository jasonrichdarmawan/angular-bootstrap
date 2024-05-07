import { IsFeatureEnabledResponse } from '@common/domain/entities/is-feature-enabled/is-feature-enabled.entity';

export abstract class IsFeatureEnabledUseCase {
  abstract execute(feature: string): Promise<IsFeatureEnabledResponse>;
}
