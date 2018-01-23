import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

// Feature modules
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';

// Containers
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

// Services
import { LoggerService } from './shared/logger/logger.service';
import { Store } from '../store';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { WebsocketService } from './shared/websocket/websocket.service';
import { UsersService } from './shared/components/services/users.service';

// Guard
import { AuthGuard } from './auth/shared/guards/auth.guard';

import { environment } from '../environments/environment';

// Routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: './chat/chat.module#ChatModule'
  }
];

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: ['localhost:3000']
  };
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    AuthModule,
    MaterialModule,
    RoomsModule
  ],
  providers: [
    LoggerService,
    UsersService,
    WebsocketService,
    Store,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
