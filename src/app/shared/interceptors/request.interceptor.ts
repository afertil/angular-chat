import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from '../../auth/shared/services/auth.service';

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
          .mergeMap(res => {
            this.authService.storeData(res);
            this.isRefreshing = false;
            req = req.clone({
              setHeaders: {
                ['Authorization']: `Bearer ${res.tokens.accessToken}`
              }
            });

            return next.handle(req);
          })
          .catch(error => {
            this.authService.logoutUser();
            this.router.navigate(['/auth/login']);

            return Observable.throw(error.error.message);
          });
      }
    }

    return next.handle(req);
  }
}
