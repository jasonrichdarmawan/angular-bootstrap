import { SignInWithEmailAndPasswordResponse } from '@common/entities/sign-in-with-email-and-password/sign-in-with-email-and-password.entity';
import { Observable } from 'rxjs';

export abstract class SignInWithEmailAndPasswordDataSource {
  abstract execute(
    email: string,
    password: string,
  ): Observable<SignInWithEmailAndPasswordResponse>;
}
