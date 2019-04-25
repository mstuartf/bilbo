import { HttpErrorResponse } from '@angular/common/http';

import { AccountsQuery } from './accounts.interface';

import { StoreAction } from '../../../../state/store-action.interface';

export const GET_ACCOUNTS_REQUEST = 'GET_ACCOUNTS_REQUEST'
export class GetAccountsRequest implements StoreAction {
	readonly type = GET_ACCOUNTS_REQUEST;
}

export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS'
export class GetAccountsSuccess implements StoreAction {
	readonly type = GET_ACCOUNTS_SUCCESS;
	constructor (public payload: AccountsQuery) {}
}

export const GET_ACCOUNTS_FAILURE = 'GET_ACCOUNTS_FAILURE'
export class GetAccountsFailure implements StoreAction {
	readonly type = GET_ACCOUNTS_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

export type Actions = GetAccountsRequest | GetAccountsSuccess | GetAccountsFailure;
