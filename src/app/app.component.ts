import {
  Component,
  OnInit,
} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';

import { User, AuthService } from './auth/shared/services/auth.service';
import { LoggerService } from './shared/logger/logger.service';
import { APP_CONFIG } from './../config';

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
  `,
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  toggledSidenav = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loggerService: LoggerService,
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/' || event.url === '/messages') {
          this.router.navigate([`/messages/${APP_CONFIG.defaultRoom}`]);
        }
      }
    });
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
