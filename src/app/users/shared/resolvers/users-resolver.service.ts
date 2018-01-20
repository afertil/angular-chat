import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../services/users.service';
import { User } from '../../../auth/shared/services/auth.service';

@Injectable()
export class UsersResolver implements Resolve<User[]> {
  constructor(private articlesService: UsersService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.articlesService.getUsers();
  }
}
