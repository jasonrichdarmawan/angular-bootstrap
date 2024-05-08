import { Observable } from 'rxjs';

export abstract class GetTranslationsUseCase {
  abstract execute(
    translations: () => Promise<object>,
    defaultTranslations: () => Promise<object>,
  ): Observable<Record<string, string>>;
}
