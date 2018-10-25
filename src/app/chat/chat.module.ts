import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MaterialModule } from '@app/material.module';

// Services
import { ChatService } from '@app/chat/shared/services/chat.service';
// import { MessagesResolver } from './shared/resolvers/messages-resolver.service';

// components
import { ChatInputComponent } from '@app/chat/components/chat-input/chat-input.component';
import { ChatListComponent } from '@app/chat/components/chat-list/chat-list.component';
import { ChatItemComponent } from '@app/chat/components/chat-item/chat-item.component';

// containers
import { ChatComponent } from '@app/chat/containers/chat/chat.component';

export const ROUTES: Routes = [
  {
    path: ':roomId',
    component: ChatComponent
    // resolve: { messages: MessagesResolver }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MaterialModule,
    PerfectScrollbarModule
  ],
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatItemComponent,
    ChatInputComponent
  ],
  providers: [ChatService /* MessagesResolver */]
})
export class ChatModule {}
