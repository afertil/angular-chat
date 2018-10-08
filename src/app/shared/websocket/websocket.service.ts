import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '@config';
import { AuthService, User } from '@app/auth/shared/services/auth.service';

@Injectable()
export class WebsocketService {
  // Our socket connection
  socket;
  user$: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user;
  }

  /**
   * Connects to the WS server
   */
  connect() {
    this.socket = io(APP_CONFIG.ws, {
      query: {
        token: this.authService.getTokens().accessToken
      }
    });
  }

  /**
   * Listens to the WS server according to the event name
   * @param eventName The name of the WS event to connect
   * @returns An observable with the right data
   */
  on(eventName: string): Observable<any> {
    return new Observable(obs => {
      this.socket.on(eventName, data => {
        console.log('Received message from Websocket Server');
        obs.next(data);
      });
      // return () => {
      //   this.socket.disconnect();
      // };
    });
  }

  /**
   * Sends data to WS server
   * @param eventName The name of the WS event to send
   * @param data The data to send to the WS server
   */
  emit(eventName: string, data: any, callback?) {
    this.socket.emit(eventName, data, callback);
  }

  /**
   * Disconnects from the WS server
   */
  disconnect() {
    this.socket.disconnect();
  }
}
