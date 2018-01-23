import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <ng-content select="mat-toolbar"></ng-content>
      <mat-card>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <mat-form-field>
            <input
              matInput
              type="email"
              placeholder="Email adress"
              formControlName="email">
            <mat-error class="error" *ngIf="emailFormat">
              Invalid email format
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input
              matInput
              type="password"
              placeholder="Enter password"
              formControlName="password">
            <mat-error class="error" *ngIf="passwordInvalid">
              Password is required
            </mat-error>
          </mat-form-field>

          <ng-content select=".error"></ng-content>

          <div class="auth-form__action">
            <ng-content select="button"></ng-content>
          </div>

          <div class="auth-form__toggle">
            <ng-content select="a"></ng-content>
          </div>
        </form>
      </mat-card>
    </div>
  `
})
export class AuthFormComponent {

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }
}
