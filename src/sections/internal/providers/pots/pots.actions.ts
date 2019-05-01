import { HttpErrorResponse } from '@angular/common/http';

import { PotsQuery } from './pots.interface';

import { StoreAction } from '../../../../state/store-action.interface';

export const GET_POTS_REQUEST = 'GET_POTS_REQUEST'
export class GetPotsRequest implements StoreAction {
	readonly type = GET_POTS_REQUEST;
}

export const GET_POTS_SUCCESS = 'GET_POTS_SUCCESS'
export class GetPotsSuccess implements StoreAction {
	readonly type = GET_POTS_SUCCESS;
	constructor (public payload: PotsQuery) {}
}

export const GET_POTS_FAILURE = 'GET_POTS_FAILURE'
export class GetPotsFailure implements StoreAction {
	readonly type = GET_POTS_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

export type Actions = GetPotsRequest | GetPotsSuccess | GetPotsFailure;
