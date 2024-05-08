# Note

1. Use Case is an Abstract Class

   By making Use Case as an Abstract Class, you can create more than one implementation i.e. fake and real implementations. Fake implementation can be used for testing.

   ![Use Case is an Abstract Class](./use-case-is-an-abstract-class.svg)

2. Use Case returns an Entity

   No matter how the implementation is written, the Use Case will return an Entity. i.e. `{ ok: true, data: Data }` or `{ ok: false, errorCode: string }`

   ![Use Case returns an Entity](./use-case-returns-an-entity.svg)

# How to

Let's say you want to create a use case to sign in with email and password.

1. Create the Entity

   The Entity can be anything that you want, if you want to just return a boolean, that's fine.

   `sign-in-with-email-and-password.entity.ts`

   ```
   export type SignInWithEmailAndPasswordResponse =
     | { ok: true }
     | { ok: false; errorCode: SignInWithEmailAndPasswordErrorCode };

   export type SignInWithEmailAndPasswordErrorCode =
     | 'email-not-found'
     | 'wrong-password';
   ```

2. Create the Use Case

   The Use Case expects an input and have predictable output.

   `sign-in-with-email-and-password.use-case.ts`

   ```
   export abstract class SignInWithEmailAndPasswordUseCase {
     abstract execute(
       email: string,
       password: string,
     ): Observable<SignInWithEmailAndPasswordResponse>;
   }
   ```

3. Create the Use Case implementation

   The implementation can be a fake or real implementation. The fake implementation can be used for testing.

   `sign-in-with-email-and-password.mock.ts`

   ```
   @Injectable()
   export class SignInWithEmailAndPasswordMock
     implements SignInWithEmailAndPasswordUseCase
   {
     execute(
       email: string,
       password: string,
     ): Observable<SignInWithEmailAndPasswordResponse> {
       const userData = userDatabaseMock.get(email);

       if (!userData) {
         return of<SignInWithEmailAndPasswordResponse>({
           ok: false,
           errorCode: 'email-not-found',
         }).pipe(delay(1000));
       }

       if (userData.password !== password) {
         return of<SignInWithEmailAndPasswordResponse>({
           ok: false,
           errorCode: 'wrong-password',
         }).pipe(delay(1000));
       }

       return of<SignInWithEmailAndPasswordResponse>({ ok: true }).pipe(
         delay(1000),
       );
     }
   }
   ```
