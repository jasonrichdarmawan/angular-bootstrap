import { IsFeatureEnabledResponse } from '@common/domain/entities/is-feature-enabled/is-feature-enabled.entity';

export abstract class IsFeatureEnabledRepository {
  abstract execute(email: string): Promise<IsFeatureEnabledResponse>;
}
