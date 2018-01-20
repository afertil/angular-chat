import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { APP_CONFIG } from './../../../../config';
import { User } from '../../../auth/shared/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private http: HttpClient,
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${APP_CONFIG.api}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${APP_CONFIG.api}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${APP_CONFIG.api}/users`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${APP_CONFIG.api}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${APP_CONFIG.api}/users/${id}`);
  }
}
