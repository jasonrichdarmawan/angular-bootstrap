import { Injectable } from '@angular/core';
import { IsEmailExistsResponse } from '@common/entities/is-email-exists/is-email-exists.entity';
import { Observable, delay, of } from 'rxjs';
import { userDatabaseMock } from '../user-database-mock/user-database.mock';
import { IsEmailExistsDataSource } from '@common/application-business-rules/data-sources/is-email-exists/is-email-exists.data-source';

@Injectable()
export class IsEmailExistsMock implements IsEmailExistsDataSource {
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
