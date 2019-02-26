import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { UserModel } from './user.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	delay: number = 1000;

	constructor(public http: HttpClient) { }

	register(user: UserModel) {
		let userObj = user.getData();
		userObj.id = (mocked.count + 1).toString()
		mocked.results.push(userObj);
		mocked.count++;
		return of(userObj).pipe(
			delay(this.delay)
		);
	}

	login(user: UserModel) {
		return this.http.post('login', user.getData());
	}

	loginTask(user: UserModel) {
		let userObj = this.findByEmailAddress(user.emailAddress);
		if (!userObj)
			return null;
		if (userObj.password !== user.password)
			return null;
		return userObj;
	}

	findByEmailAddress(email: string) {
		for (var i = 0; i < mocked.results.length; i++) {
			if (mocked.results[i].email_address === email)
				return mocked.results[i];
		}
		return null;
	}

}


let mocked = {
	count: 2,
	results: [
		{
			id: '1',
			email_address: 'mike@user.com',
			password: 'password!'
		}
	]
}
