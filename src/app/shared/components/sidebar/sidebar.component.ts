import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Input,
  AfterViewChecked,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { User, AuthService } from '@app/auth/shared/services/auth.service';
import { Store } from '@store';
import { UsersService } from '@app/shared/components/services/users.service';
import {
  Room,
  RoomsService,
} from '@app/rooms/shared/services/rooms.service';

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
           <!-- Create a new component -->
          <h3 mat-subheader>Rooms <a class="link" routerLink="rooms/new"><mat-icon>add_circle_outline</mat-icon></a></h3>
          <div class="room-list" *ngIf="rooms | async">
            <mat-list-item *ngFor="let room of rooms | async" routerLinkActive="active" [routerLink]="['../messages', room._id]">
              <mat-icon mat-list-icon>folder</mat-icon>
              <p mat-line>{{ room.name }}</p>
            </mat-list-item>
          </div>

          <mat-divider></mat-divider>

          <h3 mat-subheader>Direct messages</h3> <!-- Create a new component -->
          <div class="user-list" *ngIf="users | async">
            <mat-list-item *ngFor="let user of users | async" routerLinkActive="active" [routerLink]="['../messages', user._id]">
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
  `,
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewChecked {
  users: Observable<User[]>;
  rooms: Observable<Room[]>;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @Input() user: User;
  @Input() toggle: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private usersService: UsersService,
    private roomsService: RoomsService,
    private store: Store,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.store.set('users', users);
      this.users = this.store.select<User[]>('users');
    });

    this.roomsService.getRooms().subscribe(rooms => {
      console.log(rooms);
      const globalRooms = rooms.filter(room => room.is_user === false);
      this.store.set('rooms', rooms);
      this.rooms = this.store.select<Room[]>('rooms');
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
