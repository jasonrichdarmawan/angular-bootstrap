import { Inject, Injectable } from '@angular/core';
import { SignInWithEmailAndPasswordDataSource } from '@common/application-business-rules/data-sources/sign-in/sign-in.data-source';
import { SignInWithEmailAndPasswordResponse } from '@common/entities/sign-in-with-email-and-password/sign-in-with-email-and-password.entity';
import { Observable } from 'rxjs';

@Injectable()
export class SignInWithEmailAndPasswordUseCase {
  constructor(
    @Inject(SignInWithEmailAndPasswordDataSource)
    private dataSource: SignInWithEmailAndPasswordDataSource,
  ) {}

  execute(
    email: string,
    password: string,
  ): Observable<SignInWithEmailAndPasswordResponse> {
    return this.dataSource.execute(email, password);
  }
}
