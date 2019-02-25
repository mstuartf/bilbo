import { Action } from '@ngrx/store';

import * as BillActions from './bill.actions';
import { BillQuery, BillObject } from './bill.interface';

export function billReducer (state: BillQuery, action: BillActions.Actions) {

	switch (action.type) {
		
		case BillActions.GET_BILLS_SUCCESS:
			return action.payload;

		case BillActions.ADD_BILL_SUCCESS:
			return {...state, results: [...state.results, action.payload], count: state.count + 1}

		case BillActions.REMOVE_BILL_SUCCESS:
			// todo: optimise this
			let results = [];
			for (var i = 0; i < state.results.length; i++) {
				if (state.results[i].id !== action.payload.id)
					results.push(state.results[i])
			}
			return {...state, results: results, count: state.count - 1};

		default:
			return state;

	}
}
