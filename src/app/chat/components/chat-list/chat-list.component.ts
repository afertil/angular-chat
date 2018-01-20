import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  styleUrls: ['chat-list.component.scss'],
  template: `
    <div class="chat-list">
      <div *ngIf="messages.length; else noMessage;">
        <mat-chip-list *ngFor="let message of messages" class="chat-list">
          <app-chat-item [item]="message"></app-chat-item>
        </mat-chip-list>
      </div>

      <ng-template #noMessage>
        <div class="message">
          You have not start a conversation yet ...
        </div>
      </ng-template>
    </div>
  `
})
export class ChatListComponent {
  @Input() messages;

  constructor() {
    console.log(this.messages);
  }
}
