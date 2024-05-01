import { Injectable } from '@angular/core';
import { SignInWithEmailAndPasswordResponse } from '@common/domain/entities/sign-in-with-email-and-password/sign-in-with-email-and-password.entity';
import { SignInWithEmailAndPasswordRepository } from '@common/domain/repositories/sign-in-with-email-and-password/sign-in-with-email-and-password.repository';
import { Observable } from 'rxjs';

@Injectable()
export class SignInWithEmailAndPasswordUseCase {
  constructor(private repository: SignInWithEmailAndPasswordRepository) {}

  execute(
    email: string,
    password: string,
  ): Observable<SignInWithEmailAndPasswordResponse> {
    return this.repository.execute(email, password);
  }
}
