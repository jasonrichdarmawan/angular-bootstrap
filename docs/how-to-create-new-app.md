# How to create new app

Run these commands:

1. create the app.

   ```
   // npx ng new app < app-name > --prefix < app-name >
   $ npx ng new app poc --prefix poc
   ```

2. add linter to the app.

   ```
   // npx ng g @angular-eslint/schematics:add-eslint-to-project < app-name >
   $ npx ng g @angular-eslint/schematics:add-eslint-to-project poc
   ```

3. set the port for `npx ng serve < app-name >` in the `angular.json` file

   ```
        "serve": {
          "configurations": {
            "development": {
              "port": 4200
            }
          }
        }
   ```

4. set `skipTests` to true in the `angular.json` file

   So you don't accidentally create test file when you don't actually want to.

   ```
        "@schematics/angular:component": {
          "style": "scss",
          "skipTests": true
        },
        "@schematics/angular:service": {
          "skipTests": true
        },
        "@schematics/angular:pipe": {
          "skipTests": true
        },
        "@schematics/angular:directive": {
          "skipTests": true
        },
        "@schematics/angular:guard": {
          "skipTests": true
        },
        "@schematics/angular:class": {
          "skipTests": true
        },
        "@schematics/angular:interceptor": {
          "skipTests": true
        }
   ```

5. add `common` styles to the application in the `angular.json` file

   `<app-name>.architect.build.options.styles`

   ```
   styles: ["projects/common/src/styles.scss"]
   ```

   Note: make sure to add this to the `<app-name>.architect.test.options.styles` key as well.

6. add `common` assets to the application in the `angular.json` file

   `<app-name>.architect.build.options.assets`

   ```
   assets: [
    {
      "glob": "**/*",
      "input": "projects/common/src/assets",
      "output": "assets"
    },
   ]
   ```

   Note: make sure to add this to the `<app-name>.architect.test.options.assets` key as well.

7. add the environment config, the feature flag feature and the translate feature to the `app.config.ts` file.

   ```
    providers: [
      {
        provide: ENVIRONMENT_TOKEN,
        useValue: environment,
      },
      {
        provide: IsFeatureEnabledUseCase,
        /** @todo replace mock */
        useClass: IsFeatureEnabledMock,
      },
      {
        provide: HOST_LANGUAGE_TOKEN,
        useFactory: () => {
          const route = inject(ActivatedRoute);
          const hl = route.queryParamMap.pipe(
            map((queryParamMap) => {
              const hl = queryParamMap.get(HOST_LANGUAGE_PARAMETER_CONSTANT);
              if (!hl) {
                return DEFAULT_LANGUAGE_CONSTANT;
              }

              return hl;
            }),
          );
          return hl;
        },
      },
      {
        provide: GetTranslationsUseCase,
        useClass: GettranslationsLocale,
      },
    ],
   ```

# Optional

1. if the application use the `common` favicon.ico, add it to the application in the `angular.json` file

   `<app-name>.architect.build.options.assets`

   ```
   assets: [
    {
      "glob": "favicon.ico",
      "input": "projects/common/src",
      "output": "."
    },
   ]
   ```

   Note: make sure to add this to the `<app-name>.architect.test.options.assets` key as well.

2. if the UI/UX use Angular Material, add Angular Material to the application with `npx ng add @angular/material --project <app-name>`

3. if it's SSR and will be deployed to Firebase Hosting.

   go to line 47 in `projects/poc/server.ts`. Then, remove the process.env['PORT'].
