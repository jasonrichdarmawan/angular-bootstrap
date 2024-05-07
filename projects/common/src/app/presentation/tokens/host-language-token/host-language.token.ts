import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const HOST_LANGUAGE_TOKEN = new InjectionToken<Observable<string>>(
  'HOST_LANGUAGE_TOKEN',
);
