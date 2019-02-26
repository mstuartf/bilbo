import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { handlers } from './backend.handlers';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // need to assert type as Observable<HttpEvent<any>> when accessing the functions this way
            if (handlers.hasOwnProperty(request.url) && handlers[request.url].hasOwnProperty(request.method))
                return handlers[request.url][request.method].handler(request) as Observable<HttpEvent<any>>;
            
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown
        .pipe(materialize())
        .pipe(delay(1000))
        .pipe(dematerialize());
    }
}

export let FakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
}
