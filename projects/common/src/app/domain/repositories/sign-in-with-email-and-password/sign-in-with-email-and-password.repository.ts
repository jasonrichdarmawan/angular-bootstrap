import { SignInWithEmailAndPasswordResponse } from '@common/domain/entities/sign-in-with-email-and-password/sign-in-with-email-and-password.entity';
import { Observable } from 'rxjs';

export abstract class SignInWithEmailAndPasswordRepository {
  abstract execute(
    email: string,
    password: string,
  ): Observable<SignInWithEmailAndPasswordResponse>;
}
