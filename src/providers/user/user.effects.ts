import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from './user.service';
import * as UserActions from './user.actions';
import { UserObject, TokenObject } from './user.interface';

@Injectable()
export class UserEffects {

	constructor(public actions$: Actions, public userService: UserService) {}

	@Effect()
	private register$ = this.actions$.pipe(

		ofType(UserActions.REGISTER_REQUEST),

		switchMap((action: UserActions.RegisterRequest) => 
			this.userService.register(action.payload).pipe(
				map(() => new UserActions.RegisterSuccess()),
				catchError((err: HttpErrorResponse) => of(new UserActions.RegisterFailure(err)))  // need to catch the error or the stream will end
			)
		)
	)

	@Effect()
	private login$ = this.actions$.pipe(

		ofType(UserActions.LOGIN_REQUEST),

		switchMap((action: UserActions.LoginRequest) => 
			this.userService.login(action.payload).pipe(
				map((data: TokenObject) => {
					this.userService.setToken(data.token)
					return new UserActions.LoginSuccess()
				}),
				catchError((err: HttpErrorResponse) => of(new UserActions.LoginFailure(err)))  // need to catch the error or the stream will end
			)
		)
	)

	@Effect() 
  	private logout$ = this.actions$.pipe(

    	ofType(UserActions.LOGOUT_REQUEST),

 		switchMap((action: UserActions.LogoutRequest) => 
			this.userService.logout().pipe(
				map(() => new UserActions.LogoutSuccess()),
				catchError((err: HttpErrorResponse) => of(new UserActions.LogoutFailure(err)))  // need to catch the error or the stream will end
			)
		)

    );

	@Effect() 
  	private get$ = this.actions$.pipe(

    	ofType(UserActions.GET_REQUEST),

 		switchMap((action: UserActions.GetRequest) => 
			this.userService.getUser().pipe(
				map((data: UserObject) => new UserActions.GetSuccess(data)),
				catchError((err: HttpErrorResponse) => of(new UserActions.GetFailure(err)))  // need to catch the error or the stream will end
			)
		)

    );

	@Effect() 
  	private update$ = this.actions$.pipe(

    	ofType(UserActions.UPDATE_REQUEST),

 		switchMap((action: UserActions.UpdateRequest) => 
			this.userService.updateUser(action.payload).pipe(
				map((data: UserObject) => new UserActions.UpdateSuccess(data)),
				catchError((err: HttpErrorResponse) => of(new UserActions.UpdateFailure(err)))  // need to catch the error or the stream will end
			)
		)

    );

}
