import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable, of, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( private router: Router,
    private readonly spinnerOverlayService: SpinnerOverlayService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
 
  const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
  
    let authReq = req;
    return next
      .handle(authReq)
      .pipe(finalize(() => spinnerSubscription.unsubscribe()),catchError((x) => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
  
    return throwError(err);
  }
}
