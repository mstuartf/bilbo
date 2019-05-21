import { BillObject, BillQuery, ValidBillPeriod, BillPayloads } from './bill.interface';
import * as moment from 'moment';

export class BillModel {

	id: number;
	userId: number;
	title: string;
	amount: number;
	period: ValidBillPeriod;
	periodFrequency: number;
	firstPaymentDate: Date;

	constructor(data?: BillObject) { 

		if (data) {
			this.id = data.id;
			this.userId = data.user_id;
			this.title = data.name;
			this.amount = data.amount / 100;
			this.period = data.periodType;
			this.periodFrequency = data.periodFrequency;
			this.firstPaymentDate = new Date(data.startDate);
		}

	}

  public isDueOnDate(date: Date): boolean {

    const dueDate = moment(this.firstPaymentDate);
    const checkDate = moment(date);

    while (checkDate.isSameOrAfter(dueDate, 'day')) {

      if (dueDate.isSame(checkDate, 'day')) {
        return true;
      }
      
      dueDate.add(this.periodFrequency, this.period);

    }

    return false;

  }

	public get create (): BillPayloads.Create {
		return {
			user_id: this.userId,
			name: this.title,
			amount: this.amount * 100,
			startDate: this.firstPaymentDate.getTime(),
			periodType: this.period,
			periodFrequency: this.periodFrequency
		}
	}

}

export class BillFeed {

	list: BillModel[] = [];
  	rawList: BillModel[] = [];
  	monthlyTotal: number;

	constructor(data?: BillQuery) {
		
		if (data) {

			for (var i = 0; i < data.length; i++) {
				let bill = new BillModel(data[i]);
				this.rawList.push(bill);
			}

		}

    this.list = [ ...this.rawList ];

    this.updateTotal();

	}

  public updateTotal() {
    this.monthlyTotal = 0;
    this.list.map(bill => this.monthlyTotal += bill.amount);
  }

  public filterByDate(date: Date) {
    this.list = this.rawList.filter(bill => date? bill.isDueOnDate(date) : true );
  }

}
