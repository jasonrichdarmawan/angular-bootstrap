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

3. if it's SSR and will be deployed to Firebase Hosting.

go to line 47 in `projects/poc/server.ts`. Then, remove the process.env['PORT'].