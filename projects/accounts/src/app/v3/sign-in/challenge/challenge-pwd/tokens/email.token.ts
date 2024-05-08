import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const EMAIl_TOKEN = new InjectionToken<Observable<string>>('EMAIL');
