
import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebsocketService } from '../../../shared/websocket/websocket.service';
import { Store } from '../../../../store';
import { User } from '../../../auth/shared/services/auth.service';

@Injectable()
export class ChatService {
  messages: any[] = []; // Message interface
  messagesSubject: Subject<any>;
  users: Observable<User[]>;
  roomId: string;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService, private store: Store) {
    this.initConnexion();

    // Handle user connection
    // this.wsService.socket.on('userConnected', user => {
    //   this.users.subscribe(results => {
    //     results.map(data => {
    //       if (data.id === user.id) {
    //         data.connected = true;
    //       }
    //     });
    //   });
    // });
  }

  initConnexion() {
    this.users = this.store.select<User[]>('users');
    this.roomId = window.location.pathname.split('/')[2]; // TODO: Improve

    this.messagesSubject = <Subject<any>>this.wsService
      .connect(this.roomId).pipe(
      map((response: any): any => {
        // this.store.set('messages', response);
        this.messages = [...this.messages, ...response];
        console.log(this.messages);

        return response;
      }));
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  send(message) {
    this.messagesSubject.next(message);
  }
}
