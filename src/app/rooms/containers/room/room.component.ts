import { Component } from '@angular/core';

@Component({
  selector: 'app-room',
  styleUrls: ['room.component.scss'],
  template: `
    <div>
      <app-room-form></app-room-form>
    </div>
  `
})
export class RoomComponent {
  constructor() {}
}
