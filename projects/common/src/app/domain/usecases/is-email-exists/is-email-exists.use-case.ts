import { IsEmailExistsResponse } from '@common/domain/entities/is-email-exists/is-email-exists.entity';
import { Observable } from 'rxjs';

export abstract class IsEmailExistsUseCase {
  abstract execute(email: string): Observable<IsEmailExistsResponse>;
}
