
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { AuthService } from '@app/auth/shared/services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private authService: AuthService;
  private router: Router;
  private isRefreshing = false;

  constructor(private inj: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService = this.inj.get(AuthService);
    this.router = this.inj.get(Router);

    if (!this.authService.isAuthenticated()) {
      const tokens = this.authService.getTokens();

      if (tokens.refreshToken && !this.isRefreshing) {
        this.isRefreshing = true;
        return this.authService
          .refreshToken(tokens.refreshToken)
          .pipe(mergeMap(res => {
            this.authService.storeData(res);
            this.isRefreshing = false;
            req = req.clone({
              setHeaders: {
                ['Authorization']: `Bearer ${res.tokens.accessToken}`
              }
            });

            return next.handle(req);
          }),
          catchError(error => {
            this.authService.logoutUser();
            this.router.navigate(['/auth/login']);

            return observableThrowError(error.error.message);
          }));
      }
    }

    return next.handle(req);
  }
}
