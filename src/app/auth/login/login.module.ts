import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '@app/material.module';

import { SharedModule } from '@app/auth/shared/shared.module';
import { LoginComponent } from '@app/auth/login/containers/login/login.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent, outlet: 'login' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}
