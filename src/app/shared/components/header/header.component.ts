import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { User } from '../../../auth/shared/services/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['header.component.scss'],
  template: `
    <mat-toolbar color="primary" class="app-header">
      <mat-toolbar-row>
        <button mat-icon-button (click)="toggleSidenav()">
          <mat-icon>insert_comment</mat-icon>
        </button>

        <div class="brand" [class.expanded]="toggled">
          <span class="app-title">weeTalk</span>
        </div>
        <span class="space"></span>

        <div>
          <button mat-icon-button matTooltip="Account" [mat-menu-trigger-for]="userMenu" tabindex="-1">
            <mat-icon>account_circle</mat-icon>
          </button>

          <mat-menu #userMenu="matMenu">
            <button
              mat-menu-item
              (click)="logoutUser()">
              <mat-icon>power_settings_new</mat-icon>
              <span>Disconnect</span>
            </button>
          </mat-menu>
        </div>

      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class HeaderComponent {
  toggled = true;

  @Input() user$: Observable<User>;

  @Output() logout = new EventEmitter<any>();
  @Output() toggledSidenav = new EventEmitter<boolean>();

  /**
   * Launch an event to logout the user
   */
  logoutUser() {
    this.logout.emit();
  }

  /**
   * Launch an event to open or close the sidenav
   */
  toggleSidenav() {
    this.toggled = !this.toggled;
    this.toggledSidenav.emit(this.toggled);
  }
}
