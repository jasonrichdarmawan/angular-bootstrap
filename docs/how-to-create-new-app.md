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

   ```
   assets: ["projects/common/src/styles.scss"]
   ```

6. add Angular Material to the application with `npx ng add @angular/material --project <app-name>`

7. if it's SSR and will be deployed to Firebase Hosting.

   go to line 47 in `projects/poc/server.ts`. Then, remove the process.env['PORT'].
