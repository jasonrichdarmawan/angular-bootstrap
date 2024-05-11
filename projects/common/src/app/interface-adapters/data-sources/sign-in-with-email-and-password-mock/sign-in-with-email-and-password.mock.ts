import { Injectable } from '@angular/core';
import { SignInWithEmailAndPasswordResponse } from '@common/entities/sign-in-with-email-and-password/sign-in-with-email-and-password.entity';
import { userDatabaseMock } from '../user-database-mock/user-database.mock';
import { Observable, delay, of } from 'rxjs';
import { SignInWithEmailAndPasswordDataSource } from '@common/application-business-rules/data-sources/sign-in/sign-in.data-source';

@Injectable()
export class SignInWithEmailAndPasswordMock
  implements SignInWithEmailAndPasswordDataSource
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
