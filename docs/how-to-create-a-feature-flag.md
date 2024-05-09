# Note

1. A Feature Flag can be used to remotely disable or enable a feature without the need to make any code change.
2. The `IsFeatureEnabledUseCase` implementation i.e. `IsFeatureEnabledMock` guarantees that there is no race condition and implements caching logic.

# How to

1. Add the feature flag

   For example, the feature flags are stored locally.

   `is-feature-enabled.mock.ts`

   ```
   const databaseMock: Map<string, IsFeatureEnabledMockModel> = new Map([
     [
       '/v3/signin/challenge/pwd',
       { development: true, staging: false, production: false },
     ]
   ]);
   ```

   Note: if the feature flags are stored in Firebase's Remote Config or Firestore, go to the said service and add the feature flag there.

2. Inject the `IsFeatureEnabledUseCase` in a constructor

   `sign-in-identifier.page.ts`

   ```
   constructor(private isFeatureEnabled: IsFeatureEnabledUseCase) {}
   ```

   You can call the `execute` function anywhere, it can be in a Component, or a Service.

   Note: If you use it in a Component, call the `execute` function in the `ngOnInit` callback method.

   `sign-in-identifier.page.ts`

   ```
   ngOnInit() {
     this.isFeatureEnabled
       .execute('/v3/signin/challenge/pwd')
       .then((response) => {
         if (!response.ok) {
           this.isChallengePwdEnabled = false;
           return;
         }
         this.isChallengePwdEnabled = response.data.isEnabled;
       });
   }
   ```

   `sign-in-identifier.html.ts`

   ```
   @if (isCreateAccountEnabled) {
     <a com-basic right-content-action routerLink="/lifecycle/steps/signup">
       <span class="com-button">{{ "create_account" | translate: translations }}</span>
     </a>
   }
   ```
