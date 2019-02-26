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

export type Actions = RegisterRequest | RegisterSuccess | LoginRequest | LoginSuccess;
