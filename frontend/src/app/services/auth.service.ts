import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

const AUTH_URL = 'http://localhost:8000/accounts/';
const USER_TOKEN = 'user-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    localStorage.removeItem(USER_TOKEN);
    return this.http.post(AUTH_URL + 'login', { username, password }).pipe(
      map((value) => {
        localStorage.setItem(USER_TOKEN, JSON.stringify(value));
        return of(true);
      }),
      catchError((e) => {
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
  }
}
