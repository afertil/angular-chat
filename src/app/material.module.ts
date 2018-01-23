import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatPaginatorModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatChipsModule
  ]
})
export class MaterialModule {}
