import { Action } from '@ngrx/store';

import * as BillActions from './bill.actions';
import { BillData, BillObject } from './bill.interface';

export function billReducer (state: BillData, action: BillActions.Actions) {

	switch (action.type) {
		
		case BillActions.GET_BILLS_SUCCESS:
			return { ...state, query: action.payload }

		case BillActions.ADD_BILL_SUCCESS:
			return { ...state, query: [...state.query, action.payload] }

		case BillActions.REMOVE_BILL_SUCCESS:
			let results = [];
			for (var i = 0; i < state.query.length; i++) {
				if (state.query[i].id !== action.payload)
					results.push(state.query[i])
			}
			return results;

		case BillActions.SET_DATE_FILTER:
			return { ...state, dateFilter: action.payload }

		case BillActions.REMOVE_DATE_FILTER:
			return { ...state, dateFilter: null }

		default:
			return state;

	}
}
