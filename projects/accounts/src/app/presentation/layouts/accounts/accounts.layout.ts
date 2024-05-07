import { Component, Input, OnInit } from '@angular/core';
import { LanguageComponent } from '../../components/language/language.component';
import { IsFeatureEnabledUseCase } from '@common/domain/usecases/is-feature-enabled/is-feature-enabled.use-case';

/**
 * @todo support select="[left-content-action]"
 */
@Component({
  selector: 'acc-accounts',
  standalone: true,
  imports: [LanguageComponent],
  templateUrl: './accounts.layout.html',
  styleUrl: './accounts.layout.scss',
})
export class AccountsLayout implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() showOverlay: boolean = false;

  isLanguageEnabled: boolean = false;

  constructor(private isFeatureEnabled: IsFeatureEnabledUseCase) {}

  ngOnInit(): void {
    this.isFeatureEnabled
      .execute('accounts/layouts/accounts/language')
      .then((response) => {
        if (!response.ok) {
          this.isLanguageEnabled = false;
          return;
        }
        this.isLanguageEnabled = response.data.isEnabled;
      });
  }
}
