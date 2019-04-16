import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';

import { database } from './backend.database';

import { UserObject } from '../../providers/user/user.interface';
import { BillObject } from '../../providers/bill/bill.interface';


function getTokenHeader(request: HttpRequest<any>) {

	const tokenHeader = request.headers.get("Authorization");

	if (!tokenHeader) {
		return null;
	}

	const authToken = parseInt(tokenHeader.substr(7));
	
	const users = database.users.filter((user: UserObject) => user.id === authToken);

	if (!users.length) {
		return null;
	}

	return authToken;
}

export const handlers = {
	auth: {
		GET: {
			handler(request: HttpRequest<any>) {

				const authToken = getTokenHeader(request);

				return of(new HttpResponse({ status: 200, body: {auth_link: 'https://developers.monzo.com/'} }));
			}
		}
	},
	login: {
		POST: {
			handler(request: HttpRequest<any>) {

				const result = database.users.find((user: UserObject) => user.email === request.body.email);

				if (result && result.password === request.body.password)
					return of(new HttpResponse({ status: 200, body: result }));
				 
				return throwError(new HttpErrorResponse({error: 'invalid email address or password', status: 400}));

			}
		}
	},
	user: {
		GET: {
			handler(request: HttpRequest<any>) {

				const authToken = getTokenHeader(request);

				const user = database.users.find((user: UserObject) => user.id === authToken);

				if (user)
					return of(new HttpResponse({ status: 200, body: user }));
				 
				return throwError(new HttpErrorResponse({error: 'invalid email address or password', status: 400}));

			}
		},
		PUT: {
			handler(request: HttpRequest<any>) {

				const authToken = getTokenHeader(request);

				const user = database.users.find((user: UserObject) => user.id === authToken);

				if (user) {
					user.potDepositDay = request.body.potDepositDay;
					return of(new HttpResponse({ status: 200, body: user }));
				}
				 
				return throwError(new HttpErrorResponse({error: 'invalid email address or password', status: 400}));

			}
		},
		POST: {
			handler(request: HttpRequest<any>) {
				
				if (request.body.email && request.body.password && request.body.password.length > 8) {
					request.body.id = Math.round(Math.random() * 100);
					database.users.push(request.body);
					return of(new HttpResponse({ status: 200, body: request.body }));
				}

				return throwError(new HttpErrorResponse({error: 'invalid email address or password', status: 400}));
			}
		}
	},
	bills: {
		GET: {
			handler(request: HttpRequest<any>) {

				const authToken = getTokenHeader(request)
				
				if (!authToken)
					return throwError(new HttpErrorResponse({error: 'invalid token', status: 401}));

				const results = database.bills.filter((bill: BillObject) => bill.user_id === authToken);

				let feed = {
					count: results.length,
					results: results,
					next: false,
					previous: false
				}

				return of(new HttpResponse({ status: 200, body: feed }));
					
			}
		},
		POST: {
			handler(request: HttpRequest<any>) {

				const authToken = getTokenHeader(request)

				if (!authToken)
					return throwError(new HttpErrorResponse({error: 'invalid token', status: 401}));

				if (request.body.title && request.body.amount && request.body.period && request.body.period_frequency && request.body.first_payment_date) {
					request.body.id = Math.round(Math.random() * 100);
					request.body.user_id = authToken;
					database.bills.push(request.body);
					return of(new HttpResponse({ status: 200, body: request.body }));
				}
				
				return throwError({ error: { message: 'Missing title, message, amount or due date' } });
					
			}
		},
		DELETE: {
			handler(request: HttpRequest<any>) {

				const authToken = getTokenHeader(request)

				if (!authToken)
					return throwError(new HttpErrorResponse({error: 'invalid token', status: 401}));

				for (var i = 0; i < database.bills.length; i++) {
					if (database.bills[i].id === parseInt(request.params.get('id'))) {
						const bill = database.bills[i];
						database.bills.splice(i, 1);
						return of(new HttpResponse({ status: 200, body: bill }));
					}
				}

				return throwError({ error: { message: 'Invalid bill ID' } });

			}
		}
	}
}
