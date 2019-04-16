import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { UserModel } from './user.model';
import { TokenObject } from './user.interface';

import { HttpClient } from '@angular/common/http';

const AUTH_TOKEN_STORAGE_KEY = 'authToken';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(public http: HttpClient) { }

	public register(user: UserModel): Observable<null> {
		return this.http.post<null>('user', user.create);
	}

	public login(user: UserModel): Observable<TokenObject> {
		return this.http.post<TokenObject>('login', user.login);
	}

	public getToken(): string {
		return JSON.parse(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));
	}

	public setToken(token: string) {
		localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token));
	}

	public logout() {
		return of(this.removeToken()).pipe(delay(1000))
	}

	public removeToken() {
		localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
	}

	public getUser() {
		return this.http.get('user');
	}

	public updateUser(user: UserModel) {
		return this.http.put('user', user.update);
	}

}
