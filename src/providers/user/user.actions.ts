import { HttpErrorResponse } from '@angular/common/http';

import { StoreAction } from '../../helpers/store-action.interface';

import { UserObject } from './user.interface';
import { UserModel } from './user.model';

// REGISTER NEW USERS -----------------------------------

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export class RegisterRequest implements StoreAction {
	readonly type = REGISTER_REQUEST;
	constructor (public payload: UserModel) {}
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export class RegisterSuccess implements StoreAction {
	readonly type = REGISTER_SUCCESS;
	constructor () {}
}

export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export class RegisterFailure implements StoreAction {
	readonly type = REGISTER_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

// LOGIN EXISTING USERS --------------------------------

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export class LoginRequest implements StoreAction {
	readonly type = LOGIN_REQUEST;
	constructor (public payload: UserModel) {}
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export class LoginSuccess implements StoreAction {
	readonly type = LOGIN_SUCCESS;
	constructor () {}
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export class LoginFailure implements StoreAction {
	readonly type = LOGIN_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

// LOGOUT ----------------------------------------------

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export class LogoutRequest implements StoreAction {
	readonly type = LOGOUT_REQUEST;
	constructor () {}
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export class LogoutSuccess implements StoreAction {
	readonly type = LOGOUT_SUCCESS;
	constructor () {}
}

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export class LogoutFailure implements StoreAction {
	readonly type = LOGOUT_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

// UPDATE ----------------------------------------------

export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export class UpdateRequest implements StoreAction {
	readonly type = UPDATE_REQUEST;
	constructor (public payload: UserModel) {}
}

export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export class UpdateSuccess implements StoreAction {
	readonly type = UPDATE_SUCCESS;
	constructor (public payload: UserObject) {}
}

export const UPDATE_FAILURE = 'UPDATE_FAILURE'
export class UpdateFailure implements StoreAction {
	readonly type = UPDATE_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

// UPDATE ----------------------------------------------

export const GET_REQUEST = 'GET_REQUEST'
export class GetRequest implements StoreAction {
	readonly type = GET_REQUEST;
	constructor () {}
}

export const GET_SUCCESS = 'GET_SUCCESS'
export class GetSuccess implements StoreAction {
	readonly type = GET_SUCCESS;
	constructor (public payload: UserObject) {}
}

export const GET_FAILURE = 'GET_FAILURE'
export class GetFailure implements StoreAction {
	readonly type = GET_FAILURE;
	constructor (public payload: HttpErrorResponse) {}
}

export type Actions = GetRequest | GetSuccess | GetFailure | UpdateRequest | UpdateSuccess | UpdateFailure | RegisterRequest | RegisterSuccess | LoginRequest | LoginSuccess | LogoutRequest | LogoutSuccess;
