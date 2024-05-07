import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const HOST_LANGUAGE_TOKEN = new InjectionToken<Subject<string>>(
  'HOST_LANGUAGE_TOKEN',
);
