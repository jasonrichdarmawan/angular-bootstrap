import { KeyValue, KeyValuePipe } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { HOST_LANGUAGE_PARAMETER_CONSTANT } from '@common/presentation/constants/host-language-parameter/host-language-parameter.constant';
import { LANGUAGES_CONSTANT } from '../../constants/languages/languages.constant';
import { DEFAULT_LANGUAGE_CONSTANT } from '../../constants/default_language/language-default.constant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * @todo change language
 */
@Component({
  selector: 'acc-language',
  standalone: true,
  imports: [MatIcon, MatMenuModule, KeyValuePipe],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
})
export class LanguageComponent {
  languages = LANGUAGES_CONSTANT;

  selectedLanguage: KeyValue<string, string> = (() => {
    const language = LANGUAGES_CONSTANT[DEFAULT_LANGUAGE_CONSTANT];
    return { key: DEFAULT_LANGUAGE_CONSTANT, value: language };
  })();

  @ViewChild('trigger') trigger!: MatMenuTrigger;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe((queryParamMap) => {
        const hostLanguage = queryParamMap.get(
          HOST_LANGUAGE_PARAMETER_CONSTANT,
        );
        if (!hostLanguage) {
          return;
        }

        const language = LANGUAGES_CONSTANT[hostLanguage];
        if (!language) {
          return;
        }

        this.selectedLanguage = { key: hostLanguage, value: language };
      });
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('document:click')
  private onDocumentClick() {
    if (this.trigger.menuOpen) {
      this.trigger.closeMenu();
    }
  }

  onSelectLanguage(event: MouseEvent, language: KeyValue<string, string>) {
    event.stopPropagation();
    this.selectedLanguage = language;
    this.trigger.closeMenu();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [HOST_LANGUAGE_PARAMETER_CONSTANT]: language.key },
      queryParamsHandling: 'merge',
    });
  }
}
