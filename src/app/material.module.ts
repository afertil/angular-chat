import { NgModule } from '@angular/core';

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
  MatChipsModule,
  MatGridListModule,
  MatCheckboxModule,
  MatAutocompleteModule
} from '@angular/material';

const MODULES = [
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
  MatChipsModule,
  MatGridListModule,
  MatCheckboxModule,
  MatAutocompleteModule
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class MaterialModule {}
