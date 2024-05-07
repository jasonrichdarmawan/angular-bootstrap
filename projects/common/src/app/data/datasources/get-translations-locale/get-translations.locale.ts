import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetTranslationsUseCase } from '@common/domain/usecases/get-translations/get-translations.use-case';
import { DEFAULT_LANGUAGE_CONSTANT } from 'projects/accounts/src/app/presentation/constants/default_language/language-default.constant';
import { Observable, catchError, first, map } from 'rxjs';

@Injectable()
export class GettranslationsLocale implements GetTranslationsUseCase {
  constructor(private httpClient: HttpClient) {}

  /**
   * @todo component should not care about @Inject(HOST_LANGUAGE_TOKEN)
   * @todo cache
   */
  execute(
    relativePath: string,
    hostLanguage: string,
  ): Observable<Record<string, string>> {
    return this.httpClient.get(`${relativePath}.${hostLanguage}.json`).pipe(
      first(),
      map((response) => response as Record<string, string>),
      catchError(() => {
        return this.httpClient
          .get(`${relativePath}.${DEFAULT_LANGUAGE_CONSTANT}.json`)
          .pipe(
            first(),
            map((response) => response as Record<string, string>),
          );
      }),
    );
  }
}
