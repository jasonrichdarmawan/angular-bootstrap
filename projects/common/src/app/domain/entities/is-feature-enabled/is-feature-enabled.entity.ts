export type IsFeatureEnabledResponse =
  | {
      ok: true;
      data: IsFeatureEnabledData;
    }
  | { ok: false; errorCode: IsFeatureEnabledErrorCode };

export interface IsFeatureEnabledData {
  production: boolean;
  staging: boolean;
  development: boolean;
}

export type IsFeatureEnabledErrorCode =
  | 'feature-not-found'
  | 'unexpected-error';
