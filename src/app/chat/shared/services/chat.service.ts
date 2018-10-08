
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WebsocketService } from '@app/shared/websocket/websocket.service';
import { Store } from '@store';
import { User } from '@app/auth/shared/services/auth.service';

@Injectable()
export class ChatService {
  users: Observable<User[]>;
  roomId: string;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService, private store: Store) {
    this.joinRoom();
  }

  /**
   * Subscribes to incoming message
   */
  onMessage() {
    return this.wsService.on('message');
  }

  /**
   * Sends a message to a chatroom
   * @param message The message to send
   */
  sendMessage(message, ) {
    this.wsService.emit('message', { message, room: this.roomId });
  }

  /**
   * Joins a room and retrieves room messages
   * @param roomId The chatroom id to join
   */
  joinRoom(roomId?: string) {
    this.roomId = window.location.pathname.split('/')[2]; // TODO: Improve
    console.log('join room', this.roomId);
    this.wsService.emit('join', this.roomId);
  }

  /**
   * Leaves a room
   * @param roomId The chatroom to leave
   */
  leaveRoom(roomId?: string) {
    this.roomId = window.location.pathname.split('/')[2]; // TODO: Improve
    console.log('leave room', this.roomId);
    this.wsService.emit('leave', this.roomId);
  }
}
