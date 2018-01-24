import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoggerService } from './../../../shared/logger/logger.service';
import { Room, RoomsService } from './../../shared/services/rooms.service';

@Component({
  selector: 'app-room',
  styleUrls: ['room.component.scss'],
  template: `
    <div>
      <app-room-form
        (create)="addRoom($event)">
      </app-room-form>
    </div>
  `,
})
export class RoomComponent {
  constructor(
    private router: Router,
    private roomService: RoomsService,
    private loggerService: LoggerService,
  ) {}

  addRoom(event: Room) {
    this.roomService.createRoom(event).subscribe(
      res => {
        console.log(res);
        this.loggerService.success('Room successfully created');
        this.goToRoom(res._id);
      },
      error => this.loggerService.error(error.error.message),
    );
  }

  goToRoom(id) {
    this.router.navigate([`rooms/${id}`]);
  }
}
