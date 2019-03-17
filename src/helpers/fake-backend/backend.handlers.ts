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

	const authToken = tokenHeader.substr(6);

	const users = database.users.filter((user: UserObject) => user.id === authToken);

	if (!users.length) {
		return null;
	}

	return authToken;
}

export const handlers = {
	login: {
		POST: {
			handler(request: HttpRequest<any>) {

				const results = database.users.filter((user: UserObject) => user.email_address === request.body.email_address);

				if (results.length && results[0].password === request.body.password)
					return of(new HttpResponse({ status: 200, body: results[0] }));
				 
				return throwError(new HttpErrorResponse({error: 'fuck off', status: 400}));

			}
		}
	},
	register: {
		POST: {
			handler(request: HttpRequest<any>) {

				if (request.body.email_address && request.body.password) {
					request.body.id = Math.round(Math.random() * 100).toString();
					database.users.push(request.body);
					return of(new HttpResponse({ status: 200, body: request.body }));
				}

				return throwError(new HttpErrorResponse({error: 'fuck off', status: 400}));
			}
		}
	},
	bills: {
		GET: {
			handler(request: HttpRequest<any>) {

				const authToken = getTokenHeader(request)
				
				if (!authToken)
					return throwError(new HttpErrorResponse({error: 'fuck off', status: 401}));

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
					return throwError(new HttpErrorResponse({error: 'fuck off', status: 401}));

				if (request.body.title && request.body.description && request.body.amount && request.body.due_date) {
					request.body.id = Math.round(Math.random() * 100).toString();
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
					return throwError(new HttpErrorResponse({error: 'fuck off', status: 401}));

				for (var i = 0; i < database.bills.length; i++) {
					if (database.bills[i].id === request.params.get('id')) {
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
