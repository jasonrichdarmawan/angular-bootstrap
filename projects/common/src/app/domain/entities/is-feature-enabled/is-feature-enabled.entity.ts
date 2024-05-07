export type IsFeatureEnabledResponse =
  | {
      ok: true;
      data: IsFeatureEnabledData;
    }
  | { ok: false; errorCode: IsFeatureEnabledErrorCode };

export interface IsFeatureEnabledData {
  isEnabled: boolean;
}

export type IsFeatureEnabledErrorCode =
  | 'feature-not-found'
  | 'unexpected-error';
