import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private router: Router) {}

  private handleAuthError(err: HttpErrorResponse) {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl(`/login`);
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.storageService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error) => {
        this.handleAuthError(error);
        return throwError(error);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
