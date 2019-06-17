import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig ={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        
        const _req = req.clone({setHeaders: headersConfig});
        return next.handle(_req);
    }
}