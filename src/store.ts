import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';

import { User } from './app/auth/shared/services/auth.service';
import { Room } from './app/rooms/shared/services/rooms.service';

export interface State {
  user: User;
  messages: String[];
  users: User[];
  rooms: Room[];
}

const state: State = {
  user: undefined,
  messages: undefined,
  users: undefined,
  rooms: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, stateValue: any) {
    this.subject.next({ ...this.value, [name]: stateValue });
  }
}
