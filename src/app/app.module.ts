import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// Feature modules
import { MaterialModule } from '@app/material.module';
import { AuthModule } from '@app/auth/auth.module';
import { RoomsModule } from '@app/rooms/rooms.module';

// Containers
import { AppComponent } from '@app/app.component';

// Components
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { SidebarComponent } from '@app/shared/components/sidebar/sidebar.component';

// Services
import { LoggerService } from '@app/shared/logger/logger.service';
import { Store } from '@store';
import { RequestInterceptor } from '@app/shared/interceptors/request.interceptor';
import { WebsocketService } from '@app/shared/websocket/websocket.service';
import { UsersService } from '@app/shared/components/services/users.service';

// Guard
import { AuthGuard } from '@app/auth/shared/guards/auth.guard';

import { environment } from '@env/environment';

// Routes
export const ROUTES: Routes = [
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   loadChildren: './'
  // }
  {
    path: 'messages',
    canActivate: [AuthGuard],
    loadChildren: './chat/chat.module#ChatModule',
  },
];

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: ['localhost:3000'],
  };
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    AuthModule,
    MaterialModule,
    RoomsModule,
  ],
  providers: [
    LoggerService,
    UsersService,
    WebsocketService,
    Store,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
