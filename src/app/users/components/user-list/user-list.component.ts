import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { User } from '../../../auth/shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-list.component.scss'],
  template: `
    <div class="user-list">
      <div class="table-header">
        <h1>Users list</h1>

        <mat-form-field>
          <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
        </mat-form-field>

        <a mat-raised-button color="primary" class="create-user" [routerLink]="'../users/new'">
          <mat-icon>add</mat-icon> New
        </a>
      </div>

      <div class="container mat-elevation-z8">
        <mat-table [dataSource]="dataSource" matSort>

          <!-- Name column -->
          <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{ user.name }} </mat-cell>
          </ng-container>

          <!-- Email column -->
          <ng-container matColumnDef="email">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Email </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{ user.email }} </mat-cell>
          </ng-container>

          <!-- Edit column -->
          <ng-container matColumnDef="edit">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Edit </mat-header-cell>
            <mat-cell *matCellDef="let user">
              <a [routerLink]="['../users', user._id]"><mat-icon>create</mat-icon></a></mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let user; columns: displayedColumns;">
          </mat-row>
        </mat-table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit, AfterViewInit {

  displayedColumns = [
    'name',
    'email',
    'edit'
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  users: User[];

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.users);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
