import {Injectable} from '@angular/core';
import {IUser} from '../model/User';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  private user: IUser;
  private loggedInUserSubject$ = new Subject();
  loggedInUserObservable$ = this.loggedInUserSubject$.asObservable();

  // set logged in user to the service and localstorage, change log in status to true
  setLoggedInUser(user: IUser) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.setLoggedIn(true);
    this.loggedInUserSubject$.next(this.user);
  }

  getLoggedInUser(): IUser {
    return JSON.parse(localStorage.getItem('user'));
  }

  // used to change menu bar
  // userSubject$ = new Subject<IUser>();

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', this.loggedInStatus);
  }

  get isLoggedIn() {
    console.log('log in status is: ' + this.loggedInStatus);
    return this.loggedInStatus;
  }

  constructor() {
  }
}
