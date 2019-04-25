import { Action } from '@ngrx/store';

import * as PotsActions from './pots.actions';
import { PotsQuery } from './pots.interface';

export function potsReducer (state: PotsQuery, action: PotsActions.Actions) {

	switch (action.type) {
		
		case PotsActions.GET_POTS_SUCCESS:
			return action.payload;

		default:
			return state;

	}
}
