import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { Room } from '@app/rooms/shared/services/rooms.service';

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

          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="createRoom()" [disabled]="!form.valid">Create</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class RoomFormComponent {
  @Output() create = new EventEmitter<Room>();

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  constructor(private fb: FormBuilder) {}

  required(field) {
    return (
      this.form.get(field).hasError('required') && this.form.get(field).touched
    );
  }

  createRoom() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
}
