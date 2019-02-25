import { BillQuery, BillObject } from './bill.interface';
import { BillModel } from './bill.model';

import { Action } from '@ngrx/store';

// FETCHING ALL BILLS -----------------------------------

export const GET_BILLS_REQUEST = 'GET_BILLS_REQUEST'
export class GetBillsRequest implements Action {
	readonly type = GET_BILLS_REQUEST;
}

export const GET_BILLS_SUCCESS = 'GET_BILLS_SUCCESS'
export class GetBillsSuccess implements Action {
	readonly type = GET_BILLS_SUCCESS;
	constructor (public payload: BillQuery) {}
}

// ADDING A NEW BILL ------------------------------------

export const ADD_BILL_REQUEST = 'ADD_BILL_REQUEST'
export class AddBillRequest implements Action {
	readonly type = ADD_BILL_REQUEST;
	constructor (public payload: BillModel) {}
}

export const ADD_BILL_SUCCESS = 'ADD_BILL_SUCCESS'
export class AddBillSuccess implements Action {
	readonly type = ADD_BILL_SUCCESS;
	constructor (public payload: BillObject) {}
}

// REMOVING A BILL --------------------------------------

export const REMOVE_BILL_REQUEST = 'REMOVE_BILL_REQUEST'
export class RemoveBillRequest implements Action {
	readonly type = REMOVE_BILL_REQUEST;
	constructor (public payload: BillModel) {}
}

export const REMOVE_BILL_SUCCESS = 'REMOVE_BILL_SUCCESS'
export class RemoveBillSuccess implements Action {
	readonly type = REMOVE_BILL_SUCCESS;
	constructor (public payload: BillObject) {}
}

export type Actions = GetBillsRequest | GetBillsSuccess | AddBillRequest | AddBillSuccess | RemoveBillRequest | RemoveBillSuccess;
