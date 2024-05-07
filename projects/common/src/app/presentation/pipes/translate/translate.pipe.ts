import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  transform(key: string, translations: Record<string, string>): string {
    const translation = translations[key];
    return translation;
  }
}
