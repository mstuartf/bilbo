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

	register(user: UserModel) {
		return this.http.post('register', user.getData());
	}

	login(user: UserModel) {
		return this.http.post('login', user.getData());
	}

	getToken(): string {
		return JSON.parse(localStorage.getItem('authToken'));
	}

	setToken(token: string) {
		localStorage.setItem('authToken', token);
	}

	logout() {
		return of(this.removeToken()).pipe(delay(1000))
	}

	removeToken() {
		localStorage.removeItem('authToken');
	}

}
