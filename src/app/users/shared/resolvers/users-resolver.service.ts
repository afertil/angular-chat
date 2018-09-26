import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from '../services/users.service';
import { User } from '../../../auth/shared/services/auth.service';

@Injectable()
export class UsersResolver implements Resolve<User[]> {
  constructor(private usersService: UsersService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.usersService.getUsers();
  }
}
