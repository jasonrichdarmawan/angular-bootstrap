import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_LANGUAGE_CONSTANT } from 'projects/accounts/src/app/presentation/constants/default_language/language-default.constant';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  transform(language: string, translations: Record<string, string>): string {
    const translation = translations[language];
    if (!translation) {
      const defaultTranslation = translations[DEFAULT_LANGUAGE_CONSTANT];
      return defaultTranslation;
    }
    return translation;
  }
}
