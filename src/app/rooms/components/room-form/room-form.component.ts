import { Component } from '@angular/core';

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
          <!-- Form -->
          Form content
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">Create</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class RoomFormComponent {
  constructor() {}
}
