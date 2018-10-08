import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  Event,
} from '@angular/router';

import { Observable ,  Subscription } from 'rxjs';

import { ChatService } from '@app/chat/shared/services/chat.service';
import { Store } from '@store';
import { User } from '@app/auth/shared/services/auth.service';

@Component({
  selector: 'app-chat',
  styleUrls: ['chat.component.scss'],
  template: `
    <div>
      <app-chat-list [messages]="messages" [loading]="loading"></app-chat-list>
      <app-chat-input (message)="sendMessage($event)"></app-chat-input>
    </div>
  `,
})
export class ChatComponent implements OnInit, OnDestroy {
  user: Observable<User>;
  users: Observable<User[]>;
  messages: any[]; // TODO: create type message
  subscription: Subscription;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => this.subscribe());
    // Unsubscribe before changing room
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart && this.chatService.roomId) {
        this.chatService.leaveRoom();
        this.subscription.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribe() {
    this.loading = true;
    this.messages = [];
    this.user = this.store.select<User>('user');
    this.users = this.store.select<User[]>('users');
    if (this.subscription) {
      this.chatService.joinRoom();
    }

    this.subscription = this.chatService.onMessage().subscribe(message => {
      console.log(message);
      this.messages = [...this.messages, ...message];
      this.loading = false;
    });
  }

  sendMessage(message) {
    const date = Date.now();
    this.user.subscribe(user => {
      this.chatService.sendMessage({ message, user, date });
    });
  }
}
