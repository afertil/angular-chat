import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { APP_CONFIG } from '../../../config';
import { AuthService, User } from '../../auth/shared/services/auth.service';

@Injectable()
export class WebsocketService {
  // Our socket connection
  socket;
  user$: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user;
  }

  connect(roomId: string): Subject<MessageEvent> {
    this.socket = io(APP_CONFIG.ws, {
      query: {
        token: this.authService.getTokens().accessToken,
        room: roomId,
      },
    });

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    const observable = new Observable(obs => {
      this.socket.on('message', data => {
        console.log('Received message from Websocket Server');
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', data);
      },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }

  // join(roomId: string) {
  //   this.socket.emit('room/join', roomId);
  // }

  leave(roomId: string) {
    console.log(roomId);
    console.log(this.socket);
    this.socket.emit('leave', roomId);
  }
}
