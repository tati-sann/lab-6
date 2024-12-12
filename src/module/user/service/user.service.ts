import type { IUserService } from './user.service.interfice';
import { HttpClient } from '@angular/common/http';
import type { UserModel } from '../model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: "root"
})
class UserService implements IUserService {
  constructor(private http: HttpClient) { }

  list(): Observable<UserModel[]>  {
    return this.http.get<UserModel[]>(`http://localhost:3000/users`)
  }
}

export { UserService };
