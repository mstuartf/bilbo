import { Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { UserObject } from './user.interface';

export function userReducer (state: UserObject, action: UserActions.Actions) {
	
	switch (action.type) {
		
		case UserActions.GET_SUCCESS:
			return action.payload;
		
		case UserActions.UPDATE_SUCCESS:
			return action.payload;
		
		case UserActions.REGISTER_SUCCESS:
			return action.payload;

		case UserActions.LOGIN_SUCCESS:
			return action.payload;

		default:
			return state;

	}
}
