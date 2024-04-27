import { InjectionToken } from '@angular/core';

export interface Environment {
  type: EnvironmentType;
}

export type EnvironmentType = 'production' | 'staging' | 'development';

export const ENVIRONMENT_TOKEN = new InjectionToken<Environment>('environment');
