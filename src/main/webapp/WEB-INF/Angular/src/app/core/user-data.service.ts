import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../model/User';
import {Observable} from 'rxjs';
import {SubSink} from 'subsink';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements OnDestroy {

  subs = new SubSink();
  private saveNewUserUrl = '/saveNewUser';
  private getUserUrl = '/getUser';
  private updateUserUrl = '/updateUser';


  saveNewUser(newUser: IUser): Observable<IUser> {

    return this.http.post<IUser>(this.saveNewUserUrl, newUser, httpOptions);

  }

  getUser(email: string): Observable<IUser> {

    return this.http.get<IUser>(this.getUserUrl, {params: {email}});
  }

  updateUser(user: IUser) {

    this.subs.sink = this.http.put<IUser>(this.updateUserUrl, user, httpOptions).subscribe();
  }

  constructor(private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}
