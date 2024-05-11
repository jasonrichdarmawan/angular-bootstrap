import { Injectable } from '@angular/core';
import { GetTranslationsDataSource } from '@common/application-business-rules/data-sources/get-translations/get-translations.data-source';
import { Observable } from 'rxjs';

@Injectable()
export class GetTranslationsUseCase {
  constructor(private dataSource: GetTranslationsDataSource) {}

  execute(
    translations: () => Promise<object>,
    defaultTranslations: () => Promise<object>,
  ): Observable<Record<string, string>> {
    return this.dataSource.execute(translations, defaultTranslations);
  }
}
