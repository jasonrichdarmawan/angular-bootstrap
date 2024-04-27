import { Injectable } from '@angular/core';
import { IsEmailExistsResponse } from '@common/domain/entities/is-email-exists/is-email-exists.entity';
import { IsEmailExistsRepository } from '@common/domain/repositories/is-email-exists/is-email-exists.repository';
import { Observable } from 'rxjs';

@Injectable()
export class IsEmailExistsUseCase {
  constructor(private repository: IsEmailExistsRepository) {}

  execute(email: string): Observable<IsEmailExistsResponse> {
    return this.repository.execute(email);
  }
}
