import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './../material.module';

// Services
import { ChatService } from './shared/services/chat.service';
// import { ArticlesResolver } from './shared/resolvers/articles-resolver.service';
// import { ArticleResolver } from './shared/resolvers/article-resolver.service';

// components
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';

// containers
import { ChatComponent } from './containers/chat/chat.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ChatComponent
    // resolve: { articles: ArticlesResolver }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), MaterialModule],
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatItemComponent,
    ChatInputComponent
  ],
  providers: [ChatService /* ArticlesResolver, ArticleResolver */]
})
export class ChatModule {}
