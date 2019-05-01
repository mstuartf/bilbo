import { Action } from '@ngrx/store';

import * as AccountsActions from './accounts.actions';
import { AccountsQuery } from './accounts.interface';

export function accountsReducer (state: AccountsQuery, action: AccountsActions.Actions) {

	switch (action.type) {
		
		case AccountsActions.GET_ACCOUNTS_SUCCESS:
			return action.payload;

		default:
			return state;

	}
}
