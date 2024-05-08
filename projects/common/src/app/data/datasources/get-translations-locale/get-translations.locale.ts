import { Injectable } from '@angular/core';
import { GetTranslationsUseCase } from '@common/domain/usecases/get-translations/get-translations.use-case';
import { Observable, catchError, defer, first } from 'rxjs';

@Injectable()
export class GettranslationsLocale implements GetTranslationsUseCase {
  /**
   * @todo component should not care about @Inject(HOST_LANGUAGE_TOKEN)
   */
  execute(
    hostLanguageTranslations: () => Promise<object>,
    defaultTranslations: () => Promise<object>,
  ): Observable<Record<string, string>> {
    return defer(
      () => hostLanguageTranslations() as Promise<Record<string, string>>,
    ).pipe(
      first(),
      catchError(() => {
        return defer(
          () => defaultTranslations() as Promise<Record<string, string>>,
        );
      }),
    );
  }
}
