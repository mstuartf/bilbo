import { BillObject, BillQuery } from './bill.interface';

export class BillModel {

	id: string;
	title: string;
	description: string;
	amount: number;
	dueDate: number;

  	constructor(data?: BillObject) { 
  		if (data) {
  			this.id = data.id;
  			this.title = data.title;
  			this.description = data.description;
  			this.amount = data.amount;
  			this.dueDate = data.due_date;
  		}

  	}

  	getData (): BillObject {
  		return {
  			id: this.id,
  			title: this.title,
  			description: this.description,
  			amount: this.amount,
  			due_date: this.dueDate,
  		}
  	}

}

export class BillFeed {

	list: BillModel[] = [];
	count: number;
	next: boolean;

	constructor(data?: BillQuery) {
		
		if (data) {
			this.count = data.count;
			this.next = data.next;

			for (var i = 0; i < data.results.length; i++) {
				let bill = new BillModel(data.results[i]);
				this.list.push(bill);
			}

		}

	}

}
