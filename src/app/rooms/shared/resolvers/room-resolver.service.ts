import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Room, RoomsService } from '../services/rooms.service';

@Injectable()
export class RoomResolver implements Resolve<Room> {
  constructor(
    private roomsService: RoomsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Room> {

    return this.roomsService.getRoom(route.params['id']);

  }
}
