import { BillObject, BillQuery, ValidBillPeriod } from './bill.interface';


export class BillModel {

	id: string;
	userId: string;
	title: string;
	description: string;
	amount: number;
	period: ValidBillPeriod;
	periodFrequency: number;
	firstPaymentDate: Date;

  	constructor(data?: BillObject) { 
  		if (data) {
  			this.id = data.id;
  			this.userId = data.user_id;
  			this.title = data.title;
  			this.description = data.description;
  			this.amount = data.amount;
  			this.period = data.period;
  			this.periodFrequency = data.period_frequency;
  			this.firstPaymentDate = new Date(data.first_payment_date);
  		}

  	}

  	public getData (): BillObject {
  		return {
  			id: this.id,
  			user_id: this.userId,
  			title: this.title,
  			description: this.description,
  			amount: this.amount,
  			first_payment_date: BillModel.formatDateString(this.firstPaymentDate),
  			period: this.period,
  			period_frequency: this.periodFrequency
  		}
  	}

  	public static formatDateString(date: Date): string {
  		const day = date.getDate();
  		const month = date.getMonth() + 1;
  		const year = date.getFullYear();
  		return year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
  	}

}

export class BillFeed {

	list: BillModel[] = [];
	count: number;
	next: boolean;
  total: number;

	constructor(data?: BillQuery) {
		
		if (data) {
			this.count = data.count;
			this.next = data.next;

			for (var i = 0; i < data.results.length; i++) {
				let bill = new BillModel(data.results[i]);
				this.list.push(bill);
			}

		}

    this.updateTotal();

	}

  public updateTotal() {
    this.total = 0;
    this.list.map(bill => this.total += bill.amount);
  }

}
