import { Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthLinkResponse } from './auth.interface';

export function authReducer (state: AuthLinkResponse, action: AuthActions.Actions) {

	switch (action.type) {
		
		case AuthActions.GET_AUTH_LINK_SUCCESS:
			return action.payload;

		default:
			return state;

	}
}
