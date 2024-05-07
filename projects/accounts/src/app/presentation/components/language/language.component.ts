import { KeyValue, KeyValuePipe } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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
export class LanguageComponent implements OnInit, OnDestroy {
  readonly languages: Record<string, string> = {
    'en-US': 'English (United States) ',
    id: 'Indonesia',
  };

  onDestroy$: Subject<void> = new Subject<void>();

  selectedLanguage: KeyValue<string, string> = {
    key: 'en-US',
    value: 'English (United States)',
  };

  @ViewChild('trigger') trigger!: MatMenuTrigger;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((queryParamMap) => {
        const hostLanguage = queryParamMap.get('hl');
        if (!hostLanguage) {
          return;
        }

        const language = this.languages[hostLanguage];
        if (!language) {
          return;
        }

        this.selectedLanguage = { key: hostLanguage, value: language };
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSelectLanguage(event: MouseEvent, language: KeyValue<string, string>) {
    event.stopPropagation();
    this.selectedLanguage = language;
    this.trigger.closeMenu();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { hl: language.key },
      queryParamsHandling: 'merge',
    });
  }
}
