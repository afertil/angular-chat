import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MaterialModule } from './../material.module';

// Services
import { ChatService } from './shared/services/chat.service';
// import { MessagesResolver } from './shared/resolvers/messages-resolver.service';

// components
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';

// containers
import { ChatComponent } from './containers/chat/chat.component';

export const ROUTES: Routes = [
  {
    path: ':roomId',
    component: ChatComponent,
    // resolve: { messages: MessagesResolver }
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MaterialModule,
    PerfectScrollbarModule,
  ],
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatItemComponent,
    ChatInputComponent,
  ],
  providers: [ChatService /* MessagesResolver */],
})
export class ChatModule {}
