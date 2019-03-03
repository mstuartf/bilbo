import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators';

import { UserService} from '../providers/user/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(public userService: UserService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const token = this.userService.getToken()

        return of(null).pipe(mergeMap(() => {

        	if (token)
        		request = this.setAuthHeader(request, token);

            return next.handle(request);
             
        }))

	}

	setAuthHeader (request: HttpRequest<any>, token: string) {
		return request.clone({
			setHeaders: {
				Authorization: `Token ${token}`
			}
		})
	}

}

export let TokenProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}
