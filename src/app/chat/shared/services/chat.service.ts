import { Injectable } from '@angular/core';

import { WebsocketService } from '../../../shared/websocket/websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

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
    this.users = this.store.select<User[]>('users');
    this.roomId = window.location.pathname.split('/')[2]; // TODO: Improve

    this.messagesSubject = <Subject<any>>this.wsService
      .connect(this.roomId)
      .map((response: any): any => {
        // this.store.set('messages', response);

        this.messages = [...this.messages, response];
        return response;
      });

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

  // Our simplified interface for sending
  // messages back to our socket.io server
  send(message) {
    this.messagesSubject.next(message);
  }

  leaveRoom() {
    console.log( this.wsService.socket);
    this.wsService.socket.emit('leave');
  }
}
