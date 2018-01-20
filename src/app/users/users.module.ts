import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './../material.module';

// Services
import { UsersService } from './shared/services/users.service';
import { UsersResolver } from './shared/resolvers/users-resolver.service';

// Containers
import { UsersComponent } from './containers/users/users.component';

// Components
import { UserListComponent } from './components/user-list/user-list.component';

export const ROUTES: Routes = [
  { path: '', component: UsersComponent, resolve: {users: UsersResolver} },
  // { path: 'new', canActivate: [AuthGuard], component: UserComponent},
  // { path: ':id', canActivate: [AuthGuard], component: UserComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MaterialModule
  ],
  exports: [],
  declarations: [
    UsersComponent,
    UserListComponent
  ],
  providers: [
    UsersService,
    UsersResolver
    ],
})
export class UsersModule {}
