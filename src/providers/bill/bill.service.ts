import { Injectable } from '@angular/core'

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { BillQuery } from './bill.interface';
import { BillModel } from './bill.model';


@Injectable()
export class BillService {

	delay: number = 1000;

	constructor() { }

	query() {
		// break the reference
		return of(JSON.parse(JSON.stringify(mocked))).pipe(
			delay(this.delay)
		);
	}

	add(bill: BillModel) {
		mocked.results.push(bill.getData())
		// in rxjs 6 you chain operators via pipe (rather than functions on the observable)
		return of(bill.getData()).pipe(
			delay(this.delay)
		);
	}

	remove(bill: BillModel) {
		for (var i = 0; i < mocked.results.length; i++) {
			if (mocked.results[i].id === bill.id)
				mocked.results.splice(i, 1);
		}
		mocked.count--;
		return of(bill.getData()).pipe(
			delay(this.delay)
		);
	}

}


let mocked: BillQuery = {
		count: 4,
		next: false,
		previous: false,
		results: [
			{
				id: '1',
				title: 'Bill 1',
				description: 'NetFlix due on the 8th',
				due_date: 8,
				amount: 9.99
			},
			{
				id: '2',
				title: 'Bill 2',
				description: 'Spotify',
				due_date: 12,
				amount: 9.99
			},
			{
				id: '3',
				title: 'Bill 3',
				description: 'Council Tax',
				due_date: 3,
				amount: 93
			},
			{
				id: '4',
				title: 'Bill 4',
				description: 'Rent',
				due_date: 9,
				amount: 725
			}
		]
};
