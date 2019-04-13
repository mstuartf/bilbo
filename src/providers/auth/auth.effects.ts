import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import * as AuthActions from './auth.actions';
import { AuthLinkResponse } from './auth.interface';

@Injectable()
export class AuthEffects {

	constructor(public actions$: Actions, public authService: AuthService) {}

	@Effect()
	private getBills$ = this.actions$.pipe(

		ofType(AuthActions.GET_AUTH_LINK_REQUEST),

		switchMap((action: AuthActions.GetAuthLinkRequest) => 
			this.authService.getAuthLink().pipe(
				map((data: AuthLinkResponse) => new AuthActions.GetAuthLinkSuccess(data)),
				catchError((err: HttpErrorResponse) => of(new AuthActions.GetAuthLinkFailure(err)))  // need to catch the error or the stream will end
			)
		)
	)

}
