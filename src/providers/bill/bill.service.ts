import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs';

import { BillQuery } from './bill.interface';
import { BillModel } from './bill.model';


@Injectable()
export class BillService {

  constructor() { }

  query() {
    return of(mocked);
  }

  add(bill: BillModel) {
  	return of(bill.getData());
  }

  remove(bill: BillModel) {
  	return of(bill.getData());
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