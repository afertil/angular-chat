import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/shared/services/auth.service';
import { LoggerService } from '@app/shared/logger/logger.service';
import { APP_CONFIG } from '@config';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <app-auth-form (submitted)="loginUser($event)">
        <mat-toolbar color="primary">
          <mat-toolbar-row>
            <h1>Login</h1>
          </mat-toolbar-row>
        </mat-toolbar>

        <!-- <a routerLink="/auth/register">Not registered?</a> -->
        <button mat-raised-button color="primary" type="submit">
          Login
        </button>
        <mat-error class="error" *ngIf="error">
          {{ error }}
        </mat-error>
      </app-auth-form>
    </div>
  `
})
export class LoginComponent {
  error: string;

  constructor(
    private authService: AuthService,
    private loggerService: LoggerService,
    private router: Router
  ) {}

  async loginUser(event: FormGroup) {
    const { email, password } = event.value;

    await this.authService.loginUser(email, password).subscribe(
      res => {
        this.authService.storeData(res);
        this.loggerService.success('Successfully connected');
        this.router.navigate([`/messages/${ APP_CONFIG.defaultRoom}`]);
      },
      error => this.loggerService.error(error.error.message)
    );
  }
}
