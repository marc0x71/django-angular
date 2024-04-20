import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, tap } from 'rxjs';
import { environment } from './../../environments/environment';

const AUTH_URL = environment.apiUrl + '/accounts/';
const USER_TOKEN = 'user-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.isLoggedIn$.next(false);
  }

  isLoggedIn() {
    return this.isLoggedIn$.asObservable();
  }

  login(username: string, password: string) {
    localStorage.removeItem(USER_TOKEN);
    return this.http.post(AUTH_URL + 'login', { username, password }).pipe(
      map((value) => {
        localStorage.setItem(USER_TOKEN, JSON.stringify(value));
        this.isLoggedIn$.next(true);
        return of(true);
      }),
      catchError((e) => {
        this.isLoggedIn$.next(false);
        console.error(e.message);
        return of(false);
      })
    );
  }
  refreshToken() {
    let item = localStorage.getItem(USER_TOKEN);
    if (!item) {
      return;
    }
    let tokens = JSON.parse(item);

    return this.http
      .post(AUTH_URL + 'refresh', { refresh: tokens.refresh })
      .pipe(
        map((value: any) => {
          tokens.access = value.access;
          localStorage.setItem(USER_TOKEN, JSON.stringify(tokens));
          this.isLoggedIn$.next(true);
          return of(true);
        }),
        catchError((e) => {
          console.log(e);
          this.logout();
          return of(false);
        })
      );
  }

  isLogged(): boolean {
    return localStorage.getItem(USER_TOKEN) != null;
  }

  getAccessToken() {
    let item = localStorage.getItem(USER_TOKEN);
    if (item != null) {
      let tokens = JSON.parse(item);
      return tokens.access;
    }
  }

  getRefreshToken() {
    let item = localStorage.getItem(USER_TOKEN);
    if (item != null) {
      let tokens = JSON.parse(item);
      return tokens.refresh;
    }
  }

  logout() {
    localStorage.removeItem(USER_TOKEN);
    this.isLoggedIn$.next(false);
  }
}
