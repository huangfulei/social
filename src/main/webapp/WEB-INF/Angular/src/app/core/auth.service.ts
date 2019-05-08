import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../model/User';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/*const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', test: 'testvalue'})
};*/


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUserDetailUrl = '/server/authUser';


  authUserDetail(user: IUser): Observable<IUser> {

    return this.http.post<IUser>(this.authUserDetailUrl, user, httpOptions);

  }

  constructor(private http: HttpClient) {
  }
}
