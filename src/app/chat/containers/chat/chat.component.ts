import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Event } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router, private chatService: ChatService, private store: Store) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => this.subscribe()
    );

    // Unsubscribe before changing room
    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('navigationstart');
        this.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribe() {
    this.messages = [];
    this.user = this.store.select<User>('user');
    // this.messages = this.store.select<String[]>('messages');
    this.subscription = this.chatService.messagesSubject.subscribe(message => {
      this.messages = [...this.messages, message];
    });
  }

  sendMessage(message) {
    this.user.subscribe(user => {
      this.chatService.send({ message, user });
    });
  }

  unsubscribe() {
    console.log('unsubscribe');
    this.subscription.unsubscribe();
    this.chatService.leaveRoom();
  }
}
