import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    url: string;
    constructor() {
        this.url = 'https://api-crud-test.herokuapp.com';
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig ={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        let _req = req.clone({setHeaders: headersConfig}); 
        _req = _req.clone({url: `${this.url}/${req.url}`});
        return next.handle(_req);
    }
}