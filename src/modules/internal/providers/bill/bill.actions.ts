import { HttpErrorResponse } from '@angular/common/http';

import { BillQuery, BillObject } from './bill.interface';
import { BillModel } from './bill.model';

import { StoreAction } from '../../../../state/store-action.interface';

// FETCHING ALL BILLS -----------------------------------

export const GET_BILLS_REQUEST = 'GET_BILLS_REQUEST'
export class GetBillsRequest implements StoreAction {
	readonly type = GET_BILLS_REQUEST;
}

export const GET_BILLS_SUCCESS = 'GET_BILLS_SUCCESS'
export class GetBillsSuccess implements StoreAction {
	readonly type = GET_BILLS_SUCCESS;
	constructor (public payload: BillQuery) {}
}

export const GET_BILLS_FAILURE = 'GET_BILLS_FAILURE'
export class GetBillsFailure implements StoreAction {
	readonly type = GET_BILLS_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

// ADDING A NEW BILL ------------------------------------

export const ADD_BILL_REQUEST = 'ADD_BILL_REQUEST'
export class AddBillRequest implements StoreAction {
	readonly type = ADD_BILL_REQUEST;
	constructor (public payload: BillModel) {}
}

export const ADD_BILL_SUCCESS = 'ADD_BILL_SUCCESS'
export class AddBillSuccess implements StoreAction {
	readonly type = ADD_BILL_SUCCESS;
	constructor (public payload: BillObject) {}
}

export const ADD_BILL_FAILURE = 'ADD_BILL_FAILURE'
export class AddBillFailure implements StoreAction {
	readonly type = ADD_BILL_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

// REMOVING A BILL --------------------------------------

export const REMOVE_BILL_REQUEST = 'REMOVE_BILL_REQUEST'
export class RemoveBillRequest implements StoreAction {
	readonly type = REMOVE_BILL_REQUEST;
	constructor (public payload: BillModel) {}
}

export const REMOVE_BILL_SUCCESS = 'REMOVE_BILL_SUCCESS'
export class RemoveBillSuccess implements StoreAction {
	readonly type = REMOVE_BILL_SUCCESS;
	constructor (public payload: BillObject) {}
}

export const REMOVE_BILL_FAILURE = 'REMOVE_BILL_FAILURE'
export class RemoveBillFailure implements StoreAction {
	readonly type = REMOVE_BILL_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

export type Actions = GetBillsRequest | GetBillsSuccess | GetBillsFailure | AddBillRequest | AddBillSuccess | AddBillFailure | RemoveBillRequest | RemoveBillSuccess | RemoveBillFailure;
