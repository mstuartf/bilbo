import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from './user.service';
import * as UserActions from './user.actions';
import { UserObject } from './user.interface';

@Injectable()
export class UserEffects {

	constructor(public actions$: Actions, public userService: UserService) {}

	@Effect()
	register$ = this.actions$.pipe(

		ofType(UserActions.REGISTER_REQUEST),

		switchMap((action: UserActions.RegisterRequest) => 
			this.userService.register(action.payload).pipe(
				map((data: UserObject) => {
					this.userService.setToken(data.id)
					return new UserActions.RegisterSuccess(data)
				}),
				catchError((err: HttpErrorResponse) => of(new UserActions.RegisterFailure(err)))  // need to catch the error or the stream will end
			)
		)
	)

	@Effect()
	login$ = this.actions$.pipe(

		ofType(UserActions.LOGIN_REQUEST),

		switchMap((action: UserActions.LoginRequest) => 
			this.userService.login(action.payload).pipe(
				map((data: UserObject) => {
					this.userService.setToken(data.id)
					return new UserActions.LoginSuccess(data)
				}),
				catchError((err: HttpErrorResponse) => of(new UserActions.LoginFailure(err)))  // need to catch the error or the stream will end
			)
		)
	)

	@Effect() 
  	logout$ = this.actions$.pipe(

    	ofType(UserActions.LOGOUT_REQUEST),

 		switchMap((action: UserActions.LogoutRequest) => 
			this.userService.logout().pipe(
				map(() => new UserActions.LogoutSuccess()),
				catchError((err: HttpErrorResponse) => of(new UserActions.LogoutFailure()))  // need to catch the error or the stream will end
			)
		)

    );

}
