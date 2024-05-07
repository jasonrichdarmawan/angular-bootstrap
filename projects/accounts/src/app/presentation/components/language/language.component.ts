import { KeyValue, KeyValuePipe } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

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
  readonly languages: Record<string, string> = {
    'en-US': 'English (United States) ',
    id: 'Indonesia',
  };

  selectedLanguage: KeyValue<string, string> = {
    key: 'en-US',
    value: 'English (United States)',
  };

  @ViewChild('trigger') trigger!: MatMenuTrigger;

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
  }
}
