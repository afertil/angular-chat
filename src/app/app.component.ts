import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { User, AuthService } from './auth/shared/services/auth.service';
import { LoggerService } from './shared/logger/logger.service';
import { UsersService } from './shared/components/services/users.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="mat-typography"
      *ngIf="user$ | async">
      <app-header
        [user$]="user$"
        (logout)="onLogout()"
        (toggledSidenav)="onToggledSidenav($event)">
      </app-header>

      <app-sidebar
        [user]="user$ | async"
        [toggle]="toggledSidenav">
      </app-sidebar>
    </div>
    <router-outlet name="login"></router-outlet>
  `
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  toggledSidenav = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loggerService: LoggerService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user;
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
    this.loggerService.success('Successfully disconnected');
  }

  onToggledSidenav(event: boolean) {
    this.toggledSidenav = event;
  }
}
