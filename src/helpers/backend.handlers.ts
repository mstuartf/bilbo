import { HttpRequest, HttpResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';

import { database } from './backend.database';

import { UserObject } from '../providers/user/user.interface';
import { BillObject } from '../providers/bill/bill.interface';

export const handlers = {
	login: {
		POST: {
			handler(request: HttpRequest<any>) {

				const results = database.users.filter((user: UserObject) => user.email_address === request.body.email_address);

				if (results.length && results[0].password === request.body.password)
					return of(new HttpResponse({ status: 200, body: results[0] }));
				 
				return throwError({ error: { message: 'Username or password is incorrect' } });

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

				return throwError({ error: { message: 'Missing email address or password' } });
			}
		}
	},
	bills: {
		GET: {
			handler(request: HttpRequest<any>) {

				const results = database.bills.filter((bill: BillObject) => bill.user_id === '1');

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

				if (request.body.title && request.body.description && request.body.amount && request.body.due_date) {
					request.body.id = Math.round(Math.random() * 100).toString();
					database.bills.push(request.body);
					return of(new HttpResponse({ status: 200, body: request.body }));
				}
				
				return throwError({ error: { message: 'Missing title, message, amount or due date' } });
					
			}
		},
		DELETE: {
			handler(request: HttpRequest<any>) {

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
