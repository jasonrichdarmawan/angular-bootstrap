# Note

1. Use Case is an Abstract Class

   By making Use Case as an Abstract Class, you can create more than one implementation i.e. fake and real implementations. Fake implementation can be used for testing.

   ![Use Case is an Abstract Class](./use-case-is-an-abstract-class.svg)

2. Use Case returns an Entity

   No matter how the implementation is written, the Use Case will return an Entity. i.e. `{ ok: true, data: Data }` or `{ ok: false, errorCode: string }`

   ![Use Case returns an Entity](./use-case-returns-an-entity.svg)

3. This is an oversimplification.

   The reason for oversimplifaction is that the Clean Architecture require developers to conform with Dependency Inversion Principle, which is not what most Frontend Developer used to.

   So, take your time, please get used to write an abstract class. Later, when you are comfortable, start to separate into layers:

   1. application's business rules, -> this should be written in the Use Case
   2. part of the code that call the Fetching API. -> this should be written in the Data Source

   As a note, a Use Case is not supposed to be an abstract class. It should contain the application's business rules.

   For example, let's say we are working with a Feature Flag and the data is from a server.

   In this case, we have 2 layers:

   1. The Data Source, for example the `IsFeatureEnabledDataSource`.

      The server will respond with `{ development: boolean, staging: boolean, production: boolean }`

   2. The Use Case, for example `IsFeatureEnabledUseCase`.

      The Use Case should return `{ isEnabled: boolean }`.

      The Use Case have 3 application's business rules:

      1. if the environment is `development`, then return the `development` value.
      2. if the environment is `staging`, then return the `staging` value.
      3. if the environment is `production`, then return the `production` value.

   For reference:

   1. [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

      ![Clean Architecture](./clean-architecture.jpeg)

   2. [The Dependency Rule](https://betterprogramming.pub/the-clean-architecture-beginners-guide-e4b7058c1165)

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
