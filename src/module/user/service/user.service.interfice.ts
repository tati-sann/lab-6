import { UserModel } from '../model';
import { Observable } from 'rxjs';

interface IUserService {
  list(): Observable<UserModel[]>;
}

export type { IUserService };
