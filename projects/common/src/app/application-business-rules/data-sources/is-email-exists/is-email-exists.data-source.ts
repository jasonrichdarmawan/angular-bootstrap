import { IsEmailExistsResponse } from '@common/entities/is-email-exists/is-email-exists.entity';
import { Observable } from 'rxjs';

export abstract class IsEmailExistsDataSource {
  abstract execute(email: string): Observable<IsEmailExistsResponse>;
}
