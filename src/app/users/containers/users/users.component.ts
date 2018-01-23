import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './../../../auth/shared/services/auth.service';

@Component({
  selector: 'app-users',
  styleUrls: ['users.component.scss'],
  template: `
    <div>
      <!-- <mat-spinner *ngIf="isLoadingResults"></mat-spinner> -->

      <app-user-list
        [users]="users">
      </app-user-list>

    </div>
  `
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the prefetched users
    this.route.data.subscribe((data: { users: User[] }) => {
      this.users = data.users;
    });
  }
}
