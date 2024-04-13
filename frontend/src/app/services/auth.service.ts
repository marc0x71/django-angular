import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

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
}
