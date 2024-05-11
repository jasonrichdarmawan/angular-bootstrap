import { KeyValue, KeyValuePipe } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { HOST_LANGUAGE_PARAMETER_CONSTANT } from '@common/interface-adapters/constants/host-language-parameter/host-language-parameter.constant';
import { LANGUAGES_CONSTANT } from '../../constants/languages/languages.constant';
import { first } from 'rxjs';
import { DEFAULT_LANGUAGE_CONSTANT } from '../../constants/default_language/language-default.constant';

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
export class LanguageComponent implements OnInit {
  readonly languages = LANGUAGES_CONSTANT;

  selectedLanguage: KeyValue<string, string> = { key: '', value: '' };

  @ViewChild('trigger') trigger!: MatMenuTrigger;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe((queryParamMap) => {
      const result:
        | { data: KeyValue<string, string>; error: null }
        | { data: null; error: string } = (() => {
        const hostLanguage = queryParamMap.get(
          HOST_LANGUAGE_PARAMETER_CONSTANT,
        );
        if (!hostLanguage) {
          return { data: null, error: 'host-language-not-found' };
        }

        const language = LANGUAGES_CONSTANT[hostLanguage];
        if (!language) {
          return { data: null, error: 'language-not-found' };
        }

        return { data: { key: hostLanguage, value: language }, error: null };
      })();

      if (result.error !== null) {
        const defaultLanguage = LANGUAGES_CONSTANT[DEFAULT_LANGUAGE_CONSTANT];
        this.selectedLanguage = {
          key: DEFAULT_LANGUAGE_CONSTANT,
          value: defaultLanguage,
        };
        return;
      }

      this.selectedLanguage = result.data;
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
