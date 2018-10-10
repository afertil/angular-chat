import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Room } from '@app/rooms/shared/services/rooms.service';
import { Observable } from 'rxjs';
import { User } from '@app/auth/shared/services/auth.service';
import { Store } from '@store';

@Component({
  selector: 'app-room-form',
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

            <div class="room-form__user">
              <div class="room-form__subtitle">
                <h3>Users</h3>
                <button mat-raised-button color="primary" *ngIf="true" (click)="addUser()">
                  <mat-icon>add</mat-icon> Add user
                </button>
              </div>

              <div formArrayName="users">
                <mat-form-field *ngFor="let c of users.controls; index as i;">
                  <input matInput [formControlName]="i" placeholder="Enter user email" [matAutocomplete]="auto">
                  <mat-autocomplete #auto="matAutocomplete">
                    <mat-option *ngFor="let user of users$ | async" [value]="user.email">
                      {{ user.username }}
                    </mat-option>
                  </mat-autocomplete>
                  <button mat-icon-button color="primary" class="room-form__remove" (click)="removeUser(i)">
                    <mat-icon>clear</mat-icon>
                  </button>
                </mat-form-field>
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
export class RoomFormComponent implements OnInit {
  users$: Observable<User[]>;

  @Output()
  create = new EventEmitter<Room>();

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    is_private: [''],
    users: this.fb.array([''])
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.users$ = this.store.select<User[]>('users');
    this.users$.subscribe(users => console.log(users));
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

  /**
   * Adds a user to the private room
   */
  addUser() {
    this.users.push(new FormControl(''));
  }

  /**
   * Removes the user from the private room
   * @param index The position of the user to remove
   */
  removeUser(index: number) {
    this.users.removeAt(index);
  }
}
