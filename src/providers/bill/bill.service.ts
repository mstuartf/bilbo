import { Injectable } from '@angular/core'

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { BillQuery } from './bill.interface';
import { BillModel } from './bill.model';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class BillService {

	constructor(public http: HttpClient) { }

	public query() {
		return this.http.get('bills');
	}

	public add(bill: BillModel) {
		return this.http.post('bills', bill.getData());
	}

	public remove(bill: BillModel) {
		return this.http.delete('bills', {params: {id: bill.id}});
	}

}
