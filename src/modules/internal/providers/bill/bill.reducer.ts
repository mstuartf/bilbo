import { Action } from '@ngrx/store';

import * as BillActions from './bill.actions';
import { BillQuery, BillObject } from './bill.interface';

export function billReducer (state: BillQuery, action: BillActions.Actions) {

	switch (action.type) {
		
		case BillActions.GET_BILLS_SUCCESS:
			return action.payload;

		case BillActions.ADD_BILL_SUCCESS:
			return [...state, action.payload];

		case BillActions.REMOVE_BILL_SUCCESS:
			let results = [];
			for (var i = 0; i < state.length; i++) {
				if (state[i].id !== action.payload.id)
					results.push(state[i])
			}
			return results;

		default:
			return state;

	}
}
