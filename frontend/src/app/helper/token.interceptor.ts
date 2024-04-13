import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, finalize, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isLogged()) {
      // Aggiungi il token nella richiesta se autenticato
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getAccessToken()}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap({
        next: (event) => {},
        error: (_error) => {
          if (_error.status == 401) {
            // In caso di errore di autenticazione 401, esegue la logout
            console.warn('Redirecting on login due to 401 error from server');
            if (this.authService.isLogged()) {
              this.authService.refreshToken()?.subscribe((success) => {
                if (success) {
                  //TODO eseguire reload
                  console.log("success refresh token: " + this.router.url);
                  this.router.navigate([this.router.url])
                } else {
                  this.router.navigate(['login']);
                }
              });
            } else {
              this.authService.logout();
              this.router.navigate(['login']);
            }
          }
        },
      })
    );
  }
}
