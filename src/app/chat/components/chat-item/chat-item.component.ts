import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { User } from '@app/auth/shared/services/auth.service';

@Component({
  selector: 'app-chat-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['chat-item.component.scss'],
  template: `
    <div class="chat-item" [ngClass]="{'right': user._id === item.user}">
      <mat-icon *ngIf="user._id !== item.user">account_circle</mat-icon>
      <mat-chip class="message">{{ item.message }}</mat-chip>
      <mat-icon *ngIf="user._id === item.user">account_circle</mat-icon>
      <p class="date">{{ item.date | date:'HH:mm:ss' }}</p>
    </div>
  `,
})
export class ChatItemComponent {
  @Input() item;
  @Input() user: User;
}
