import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  ViewChild
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';

import { User, AuthService } from '../../../auth/shared/services/auth.service';
import { Store } from '../../../../store';
import { UsersService } from '../services/users.service';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['sidebar.component.scss'],
  template: `
    <mat-sidenav-container class="sidenav">
      <mat-sidenav #sidenav
        *ngIf="user"
        [opened]="toggle"
        [mode]="getMode()"
        class="container"
        [fixedInViewport]="mobileQuery.matches"
        fixedTopGap="64">

        <mat-list>
          <h3 mat-subheader>Rooms</h3> <!-- Create a new component -->
          <mat-list-item *ngFor="let room of rooms">
            <mat-icon mat-list-icon>folder</mat-icon>
            <h4 mat-line>{{ room.name }}</h4>
          </mat-list-item>

          <mat-divider></mat-divider>

          <h3 mat-subheader>Direct messages</h3> <!-- Create a new component -->
          <div class="user-list" *ngIf="users | async">
            <mat-list-item *ngFor="let user of users | async" (click)="goToRoom(user)">
              <mat-icon *ngIf="user.connected" style="color:green" mat-list-icon>radio_button_checked</mat-icon>
              <mat-icon *ngIf="!user.connected" mat-list-icon>radio_button_unchecked</mat-icon>
              <p mat-line>{{ user.username }}</p>
            </mat-list-item>
          </div>
        </mat-list>

      </mat-sidenav>

      <mat-sidenav-content>
        <div class="wrapper">
          <router-outlet></router-outlet>
          <mat-spinner diameter="50"></mat-spinner>
        </div>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewChecked {
  rooms: any[];
  users: Observable<User[]>;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @Input() user: User;
  @Input() toggle: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private userService: UsersService,
    private store: Store
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.store.set('users', users);
      this.users = this.store.select<User[]>('users');
    });
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  goToRoom(user: User) {
    console.log(user);
  }

  /**
   * Retrive the mode of the sidenav according to the type of device
   */
  getMode() {
    return this.mobileQuery.matches ? 'over' : 'side';
  }
}
