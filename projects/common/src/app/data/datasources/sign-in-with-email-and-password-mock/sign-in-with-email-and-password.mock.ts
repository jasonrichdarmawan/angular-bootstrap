import { Injectable } from '@angular/core';
import { SignInWithEmailAndPasswordResponse } from '@common/domain/entities/sign-in-with-email-and-password/sign-in-with-email-and-password.entity';
import { SignInWithEmailAndPasswordRepository } from '@common/domain/repositories/sign-in-with-email-and-password/sign-in-with-email-and-password.repository';
import { userDatabaseMock } from '../user-database-mock/user-database.mock';
import { Observable, delay, of } from 'rxjs';

@Injectable()
export class SignInWithEmailAndPasswordMock
  implements SignInWithEmailAndPasswordRepository
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
