import { Observable } from 'rxjs';
import { Component, Input, ViewChild, OnChanges, OnInit } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

import {
  User,
  AuthService,
} from '@app/auth/shared/services/auth.service';

@Component({
  selector: 'app-chat-list',
  styleUrls: ['chat-list.component.scss'],
  template: `
    <perfect-scrollbar>
      <div class="chat-list">
        <div *ngIf="messages.length; else noMessage;">
          <mat-chip-list *ngFor="let message of messages" class="chat-list">
            <app-chat-item [item]="message" [user]="user$ | async"></app-chat-item>
          </mat-chip-list>
        </div>

        <ng-template #noMessage>
          <mat-spinner [diameter]="50" *ngIf="loading"></mat-spinner>
          <div class="message" *ngIf="!loading">
            You have not start a conversation yet ...
          </div>
        </ng-template>
      </div>
    </perfect-scrollbar>
  `,
})
export class ChatListComponent implements OnInit, OnChanges {
  @ViewChild(PerfectScrollbarComponent)
  componentScroll: PerfectScrollbarComponent;
  @Input() messages;
  @Input() loading;

  user$: Observable<User>;

  constructor(private authServive: AuthService) {
    console.log(this.messages);
  }

  ngOnInit() {
    this.user$ = this.authServive.user;
    this.componentScroll.directiveRef.scrollToBottom();
  }

  ngOnChanges(changes) {
    if (changes.messages) {
      this.componentScroll.directiveRef.update();
      this.componentScroll.directiveRef.scrollToBottom();
    }
  }
}
