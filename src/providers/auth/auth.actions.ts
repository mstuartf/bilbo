import { HttpErrorResponse } from '@angular/common/http';

import { AuthLinkResponse } from './auth.interface';

import { Action } from '@ngrx/store';

export const GET_AUTH_LINK_REQUEST = 'GET_AUTH_LINK_REQUEST'
export class GetAuthLinkRequest implements Action {
	readonly type = GET_AUTH_LINK_REQUEST;
}

export const GET_AUTH_LINK_SUCCESS = 'GET_AUTH_LINK_SUCCESS'
export class GetAuthLinkSuccess implements Action {
	readonly type = GET_AUTH_LINK_SUCCESS;
	constructor (public payload: AuthLinkResponse) {}
}

export const GET_AUTH_LINK_FAILURE = 'GET_AUTH_LINK_FAILURE'
export class GetAuthLinkFailure implements Action {
	readonly type = GET_AUTH_LINK_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

export type Actions = GetAuthLinkRequest | GetAuthLinkSuccess | GetAuthLinkFailure;
