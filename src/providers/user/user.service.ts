import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { UserModel } from './user.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(public http: HttpClient) { }

	public register(user: UserModel) {
		return this.http.post('register', user.getData());
	}

	public login(user: UserModel) {
		return this.http.post('login', user.getData());
	}

	public getToken(): string {
		return JSON.parse(localStorage.getItem('authToken'));
	}

	public setToken(token: string) {
		localStorage.setItem('authToken', token);
	}

	public logout() {
		return of(this.removeToken()).pipe(delay(1000))
	}

	public removeToken() {
		localStorage.removeItem('authToken');
	}

	public getUser() {
		return this.http.get('user');
	}

	public updateUser(user: UserModel) {
		return this.http.put('user', user.getData());
	}

}
