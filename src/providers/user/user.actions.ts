import { Action } from '@ngrx/store';

import { UserObject } from './user.interface';
import { UserModel } from './user.model';

// REGISTER NEW USERS -----------------------------------

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export class RegisterRequest implements Action {
	readonly type = REGISTER_REQUEST;
	constructor (public payload: UserModel) {}
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export class RegisterSuccess implements Action {
	readonly type = REGISTER_SUCCESS;
	constructor (public payload: UserObject) {}
}

// LOGIN EXISTING USERS --------------------------------

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export class LoginRequest implements Action {
	readonly type = LOGIN_REQUEST;
	constructor (public payload: UserModel) {}
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export class LoginSuccess implements Action {
	readonly type = LOGIN_SUCCESS;
	constructor (public payload: UserObject) {}
}

// LOGOUT ----------------------------------------------

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export class LogoutRequest implements Action {
	readonly type = LOGOUT_REQUEST;
	constructor () {}
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export class LogoutSuccess implements Action {
	readonly type = LOGOUT_SUCCESS;
	constructor () {}
}

export type Actions = RegisterRequest | RegisterSuccess | LoginRequest | LoginSuccess | LogoutRequest | LogoutSuccess;
