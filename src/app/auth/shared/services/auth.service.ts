import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { Store } from '../../../../store';
import { APP_CONFIG } from './../../../../config';

export interface User {
  email: string;
  id: string;
  username: string;
  connected: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private store: Store,
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  /**
   * Gets the connected user
   *
   */
  get user() {
    if (!this.store.value.user && localStorage.getItem('user')) {
      this.store.set('user', JSON.parse(localStorage.getItem('user')));
    }

    return this.store.select<User>('user');
  }

  /**
   * Log in the user
   *
   * @param {string} email - Email user
   * @param {string} password - Password user
   */
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${APP_CONFIG.api}/auth/login`, { email, password });
  }

  /**
   * Refresh tokens
   *
   * @param {string} refreshToken - The refresh token user
   */
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${APP_CONFIG.api}/auth/refresh-token`, {
      refreshToken
    });
  }

  /**
   * Saves tokens and the connected user in localStorage
   *
   * @param {array} data - Access, refresh JWT tokens and connected user
   */
  storeData(data) {
    localStorage.setItem('access_token', data.tokens.accessToken);
    localStorage.setItem('refresh_token', data.tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    this.store.set('user', data.user);
  }

  /**
   * Check if there's an unexpired JWT
   *
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    const tokens = this.getTokens();

    if (!tokens.accessToken) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(tokens.accessToken);
  }

  /**
   * Gets token without Bearer
   *
   * @returns {array} tokens - The token without Bearer entry
   */
  getTokens(): any {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    return { accessToken, refreshToken };
  }

  /**
   * Logged out the user from the application
   */
  logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    this.store.set('user', null);
  }
}
