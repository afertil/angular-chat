import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const tokens = this.authService.getTokens();

    if (!this.authService.isAuthenticated() && (!tokens.refreshToken || !tokens.accessToken)) {
      this.router.navigate(['auth/login']);
    }

    return true;
  }
}
