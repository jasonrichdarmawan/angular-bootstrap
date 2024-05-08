# Note

1. Angular is smart enough not to download the default language if the host language exists.

# How to

1. Create the json files.

   The default language is English (United States). So, create the `en-US.json` file.

   `projects/accounts/src/app/v3/sign-in/sign-in-identifier/sign-in-identifier.en-US.json`

   ```
   {
     "create_account": "Create account",
     "description": "Use your Google Account",
     "email_not_found": "Couldn't find your Google Account",
     "enter_an_email": "Enter an email",
     "next": "Next",
     "title": "Sign In",
     "unexpected_error": "Unexpected error"
   }
   ```

   Then, create the translations file. For example, for Indonesia, the `id.json` file.

   `projects/accounts/src/app/v3/sign-in/sign-in-identifier/sign-in-identifier.id.json`

   ```
   {
     "create_account": "Buat akun",
     "description": "Gunakan Akun Google Anda",
     "email_not_found": "Tidak dapat menemukan Akun Google Anda",
     "enter_an_email": "Masukkan email",
     "next": "Selanjutnya",
     "title": "Login",
     "unexpected_error": "Terjadi kesalahan tak terduga"
   }
   ```

2. get the translations file like this

   `projects/accounts/src/app/v3/sign-in/sign-in-identifier/sign-in-identifier.page.ts`

   ```
   translations: Record<string, string> = {};

   constructor(
     @Inject(HOST_LANGUAGE_TOKEN) private hostLanguage$: Observable<string>,
     private getTranslations: GetTranslationsUseCase,
   ) {
     this.hostLanguage$.pipe(takeUntilDestroyed()).subscribe((hostLanguage) => {
       this.getTranslations
         .execute(
           () => import(`./sign-in-identifier.${hostLanguage}.json`),
           () =>
             import(`./sign-in-identifier.${DEFAULT_LANGUAGE_CONSTANT}.json`),
         )
         .pipe(first())
         .subscribe({
           next: (translations) => {
             this.translations = translations;
           },
         });
     });
   }
   ```

   Note: import the TranslatePipe.

3. use the `translations` variable like this

   1. if it's an error message

      `projects/accounts/src/app/v3/sign-in/sign-in-identifier/sign-in-identifier.page.ts`

      ```
      const errorMessage = 'enter_an_email';
      ```

      `projects/accounts/src/app/v3/sign-in/sign-in-identifier/sign-in-identifier.page.html`

      ```
      <span>{{ errorMessage | translate: translations }}</span>
      ```

   2. if it's a standard message

      `projects/accounts/src/app/v3/sign-in/sign-in-identifier/sign-in-identifier.page.html`

      ```
      <span>{{ "create_account" | translate: translations }}</span>
      ```
