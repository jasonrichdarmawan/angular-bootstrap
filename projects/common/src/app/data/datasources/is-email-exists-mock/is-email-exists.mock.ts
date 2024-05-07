import { Injectable } from '@angular/core';
import { IsEmailExistsResponse } from '@common/domain/entities/is-email-exists/is-email-exists.entity';
import { Observable, delay, of } from 'rxjs';
import { userDatabaseMock } from '../user-database-mock/user-database.mock';
import { IsEmailExistsUseCase } from '@common/domain/usecases/is-email-exists/is-email-exists.use-case';

@Injectable()
export class IsEmailExistsMock implements IsEmailExistsUseCase {
  execute(email: string): Observable<IsEmailExistsResponse> {
    const hasEmail = userDatabaseMock.get(email);

    if (!hasEmail) {
      return of<IsEmailExistsResponse>({
        ok: false,
        errorCode: 'email-not-found',
      }).pipe(delay(1000));
    }

    return of<IsEmailExistsResponse>({ ok: true }).pipe(delay(1000));
  }
}
