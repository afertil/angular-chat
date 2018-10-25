import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { MatOption } from '@angular/material';

import { Room } from '@app/rooms/shared/services/rooms.service';
import { User } from '@app/auth/shared/services/auth.service';
import { Store } from '@store';

@Component({
  selector: 'app-room-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['room-form.component.scss'],
  template: `
    <div class="room-form">
      <mat-card>
        <mat-card-header class="header">
          Create room
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="form">

            <mat-form-field class="name">
              <input
                matInput
                placeholder="Name*"
                formControlName="name">
              <mat-error *ngIf="required('name')">
                Room name is <strong>required</strong>
              </mat-error>
            </mat-form-field>

            <mat-form-field class="description">
              <input
                matInput
                placeholder="Description"
                formControlName="description">
            </mat-form-field>

            <mat-checkbox formControlName="is_private">Private room</mat-checkbox>

            <div class="room-form__user" *ngIf="isPrivateRoom">
              <div class="room-form__subtitle">
                <h3>Users</h3>

                <input matInput
                  placeholder="Enter user name"
                  (input)="onSearchChange($event.target.value)"
                  [matAutocomplete]="auto"
                  [value]="autocompleteUser">
                <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayUser" (optionSelected)="onUserSelect($event.option)">
                  <mat-option *ngFor="let user of filteredUsers" [value]="user">
                    {{ user.username }}
                  </mat-option>
                </mat-autocomplete>

                <button mat-raised-button color="primary" [disabled]="userSelected === null" (click)="addUser(userSelected)">
                  <mat-icon>add</mat-icon> Add user
                </button>

                <div>
                  <mat-list *ngFor="let user of users.controls; index as i; trackBy: trackByFn">
                    <mat-list-item *ngIf="user.value">
                      {{ user.value.username }}
                      <button mat-icon-button color="primary" class="room-form__remove" (click)="removeUser(i)">
                        <mat-icon>clear</mat-icon>
                      </button>
                      <mat-divider></mat-divider>
                    </mat-list-item>
                  </mat-list>
                </div>

              </div>
            </div>

          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="createRoom()" [disabled]="!form.valid">Create</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class RoomFormComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  allUsers: User[];
  userSelected: User = null;
  filteredUsers: User[];
  autocompleteUser = '';
  subscription: Subscription;

  @Output()
  create = new EventEmitter<Room>();

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    is_private: [''],
    users: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.users$ = this.store.select<User[]>('users');
    this.subscription = this.users$.subscribe(users => {});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Filters users throw autocomplete
   * @param value The current search of autocomple
   * @return The list of filtred users
   */
  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(
      user => user.username.toLowerCase().indexOf(filterValue) === 0
    );
  }

  /**
   * Filter user in autocomplete field
   * @param searchValue
   */
  onSearchChange(searchValue: string) {
    this.filteredUsers = this._filterUsers(searchValue);
  }

  required(field) {
    return (
      this.form.get(field).hasError('required') && this.form.get(field).touched
    );
  }

  /**
   * Sends an event to the parent component to create the new room
   */
  createRoom() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  get users() {
    return this.form.get('users') as FormArray;
  }

  get isPrivateRoom() {
    return !!this.form.get('is_private').value;
  }

  /**
   * Adds a user to the private room
   * @param user The user to add to the private room
   */
  addUser(user) {
    this.users.push(new FormControl(user));
    this.userSelected = null;
    this.autocompleteUser = null;
  }

  /**
   * Removes the user from the private room
   * @param index The position of the user to remove
   */
  removeUser(index: number) {
    this.users.removeAt(index);
  }

  /**
   * Defines the selected user to add to the private room
   * @param option The selected option from the autocomplete
   */
  onUserSelect(option: MatOption) {
    this.userSelected = option.value;
  }

  /**
   * Displays the username of the selected user
   * @param user The selected user in the autocomplete
   */
  displayUser(user): string {
    return user ? user.username : '';
  }

  trackByFn(index) {
    return index;
  }
}
