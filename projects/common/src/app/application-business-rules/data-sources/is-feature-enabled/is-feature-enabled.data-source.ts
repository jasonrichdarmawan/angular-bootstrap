import { IsFeatureEnabledErrorCode } from '@common/entities/is-feature-enabled/is-feature-enabled.entity';

export abstract class IsFeatureEnabledDataSource {
  abstract execute(feature: string): Promise<IsFeatureEnabledModelResponse>;
}

export type IsFeatureEnabledModelResponse =
  | {
      ok: true;
      data: IsFeatureEnabledModelData;
    }
  | { ok: false; errorCode: IsFeatureEnabledErrorCode };

export interface IsFeatureEnabledModelData {
  development?: boolean;
  staging?: boolean;
  production?: boolean;
}
