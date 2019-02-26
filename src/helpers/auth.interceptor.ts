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

		// wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            request = request.clone({
				setHeaders: {
					user_id: token
					// Authorization: `Token ${token}`
				}
			})
            console.log(request)
            return next.handle(request);
             
        }))

	}

}

export let TokenProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}
