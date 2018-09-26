import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../../../../config';

export interface Room {
  _id: string;
  name: string;
  description: string;
}

@Injectable()
export class RoomsService {

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${APP_CONFIG.api}/rooms`);
  }

  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(`${APP_CONFIG.api}/rooms/${id}`);
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${APP_CONFIG.api}/rooms`, room);
  }

  updateRoom(id: string, room: Room): Observable<any> {
    return this.http.put(`${APP_CONFIG.api}/rooms/${id}`, room);
  }

  deleteRoom(id: string): Observable<Room> {
    return this.http.delete<Room>(`${APP_CONFIG.api}/rooms/${id}`);
  }
}
