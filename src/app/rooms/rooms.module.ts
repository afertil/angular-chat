import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './../material.module';

// Services
import { RoomsService } from './shared/services/rooms.service';
import { RoomResolver } from './shared/resolvers/room-resolver.service';

// components
import { RoomFormComponent } from './components/room-form/room-form.component';

// containers
import { RoomComponent } from './containers/room/room.component';

export const ROUTES: Routes = [
  {
    path: 'rooms',
    children: [
      { path: 'new', component: RoomComponent },
      {
        path: ':id',
        component: RoomComponent,
        resolve: { room: RoomComponent }
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), MaterialModule],
  declarations: [
    RoomComponent,
    RoomFormComponent
  ],
  providers: [RoomsService, RoomResolver]
})
export class RoomsModule {}
