import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ChatService } from '../../shared/services/chat.service';
import { Store } from '../../../../store';
import { User } from '../../../auth/shared/services/auth.service';

@Component({
  selector: 'app-chat',
  styleUrls: ['chat.component.scss'],
  template: `
    <div>
      <app-chat-list [messages]="messages"></app-chat-list>
      <app-chat-input (message)="sendMessage($event)"></app-chat-input>
    </div>
  `
})
export class ChatComponent implements OnInit, OnDestroy {
  user: Observable<User>;
  messages: any[]; // TODO: create type message
  subscription: Subscription;

  constructor(private chatService: ChatService, private store: Store) {}

  ngOnInit() {
    this.messages = [];
    this.user = this.store.select<User>('user');
    // this.messages = this.store.select<String[]>('messages');
    this.subscription = this.chatService.messages.subscribe(msg => {
      console.log('messages', msg);
      this.messages.push(msg);
      console.log(this.messages);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendMessage(message) {
    console.log(message);
    this.user.subscribe(user => {
      this.chatService.send({ message, user });
      this.messages.push({ message, user });
    });
  }
}
