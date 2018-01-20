import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

export enum LOGGER_LEVEL {
  INFO, WARNING, SUCCESS, ERROR, IMPORTANT
}

@Injectable()
export class LoggerService {
  constructor(
    private snackBar: MatSnackBar
  ) {}

  info(message) {
    this.snackBar.open(message, 'Information', {
      duration: 2000,
    });
  }

  warning(message) {
    this.snackBar.open(message, 'Warning', {
      duration: 2000,
    });
  }

  success(message) {
    this.snackBar.open(message, 'Succes', {
      duration: 2000,
    });
  }

  error(message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }

  important(message) {
    this.snackBar.open(message, 'Important', {
      duration: 2000,
    });
  }
}
