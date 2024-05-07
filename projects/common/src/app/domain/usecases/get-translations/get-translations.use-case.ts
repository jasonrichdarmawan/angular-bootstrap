import { Observable } from 'rxjs';

export abstract class GetTranslationsUseCase {
  abstract execute(
    relativePath: string,
    hostLanguage: string,
  ): Observable<Record<string, string>>;
}
