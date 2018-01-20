import { Injectable } from '@angular/core';
import { WebsocketService } from '../../../shared/websocket/websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Store } from '../../../../store';
import { User } from '../../../auth/shared/services/auth.service';

@Injectable()
export class ChatService {
  messages: Subject<any>;
  users: Observable<User[]>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService, private store: Store) {
    this.users = this.store.select<User[]>('users');

    this.messages = <Subject<any>>this.wsService
      .connect()
      .map((response: any): any => {
        this.store.set('messages', response);
        return response;
      });

    // Handle user connection
    this.wsService.socket.on('userConnected', user => {
      this.users.subscribe(results => {
        results.map(data => {
          if (data.id === user.id) {
            data.connected = true;
          }
        });
      });
    });
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  send(message) {
    this.messages.next(message);
  }
}
