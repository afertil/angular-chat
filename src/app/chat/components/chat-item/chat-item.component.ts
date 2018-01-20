import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['chat-item.component.scss'],
  template: `
    <div class="chat-item">
      <mat-icon>account_circle</mat-icon>
      <mat-chip class="message">{{ item.message }}</mat-chip>
      <p>{{ item.user.username }}</p>
    </div>
  `
})
export class ChatItemComponent {
  @Input() item;

  constructor() {}
}
