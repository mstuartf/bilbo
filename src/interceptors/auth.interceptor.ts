import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../state/app.state';

import { UserService} from '../modules/shared/providers/user/user.service';
import * as UserActions from '../modules/shared/providers/user/user.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(private userService: UserService, private router: Router, private store: Store<AppState>) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		const token = this.userService.getToken()

    	if (token)
    		request = this.setAuthHeader(request, token);

        return next.handle(request).pipe(

        	tap(
        		(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						// option to modify successful requests here
						// console.log('success', event);
					}
				}, 

				(err: HttpErrorResponse) => {	
					if (err.status === 401) {
						this.store.dispatch(new UserActions.LogoutRequest());
					}
				}
        	)
        );

	}

	setAuthHeader (request: HttpRequest<any>, token: string) {
		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		})
	}

}

export let TokenProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}
