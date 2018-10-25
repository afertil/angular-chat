import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - Optional value to return as the observable result
   */
  handleError<T>(result?: T) {
    return (errorResponse: any): Observable<T> => {
      this.snackBar.open(
        `[${errorResponse.status}] ${errorResponse.statusText} : ${
          errorResponse.error.message
        }`,
        'Error'
      );

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
