import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../model/User';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from "rxjs/operators";
import {Tokens} from "../model/tokens";
import {environment} from "../../environments/environment";

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
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  private authUserDetailUrl = '/login';
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  authUserDetail(user: IUser): Observable<boolean> {
    return this.http.post<any>(this.authUserDetailUrl, user, httpOptions)
        .pipe(
            tap((tokens) => {
              console.log(tokens);
              this.doLoginUser(user, tokens);
            }),
            mapTo(true),
            catchError(err => {
              console.log(err.error);
              return of(false);
            })
            /*map((user: User) => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.doLoginUser(user);
                // localStorage.setItem('currentUser', JSON.stringify(user));
              }

              return user;
            })*/);
  }
  private doLoginUser(user: IUser, token: Tokens) {
    this.currentUserSubject.next(user);
    this.storeTokens(token);
  }
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }
  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  public refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/token/refresh/`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.access);
    }));
  }
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
}
