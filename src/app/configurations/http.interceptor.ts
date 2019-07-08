import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    url: string;
    constructor() {
        this.url = 'https://api-crud-test.herokuapp.com';
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        let _req = req.clone({ setHeaders: headersConfig });
        if (req.url.includes('aspects')) {
            _req = _req.clone({ url: `${this.url}/${req.url}` });
        }
        return next.handle(_req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) { }
                return event;
            }));
    }
}
