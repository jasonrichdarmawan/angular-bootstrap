import { Injectable } from '@angular/core';
import { IsEmailExistsDataSource } from '@common/application-business-rules/data-sources/is-email-exists/is-email-exists.data-source';
import { IsEmailExistsResponse } from '@common/entities/is-email-exists/is-email-exists.entity';
import { Observable } from 'rxjs';

@Injectable()
export class IsEmailExistsUseCase {
  constructor(private dataSource: IsEmailExistsDataSource) {}

  execute(email: string): Observable<IsEmailExistsResponse> {
    return this.dataSource.execute(email);
  }
}
