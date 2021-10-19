import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { observable } from "rxjs";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const lang = localStorage.getItem('lang') || 'en';
        request = request.clone({
            setHeaders: {
                'Accept-Language': lang
            }
        })
        return next.handle(request);
    }
}