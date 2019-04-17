import { BillObject, BillQuery, ValidBillPeriod, BillPayloads } from './bill.interface';


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
  			this.amount = data.amount;
  			this.period = data.periodType;
  			this.periodFrequency = data.periodFrequency;
  			this.firstPaymentDate = new Date(data.startDate * 1000);
  		}

  	}

  	public get create (): BillPayloads.Create {
  		return {
  			user_id: this.userId,
  			name: this.title,
  			amount: this.amount,
  			startDate: this.firstPaymentDate.getTime(),
  			periodType: this.period,
  			periodFrequency: this.periodFrequency
  		}
  	}

    get monthlyAmount(): number {

      const periodAmount = this.amount / this.periodFrequency;

      switch (this.period) {

        case 'day':
          return periodAmount * 365.25 / 12;

        case 'week':
          return periodAmount * 52 / 12;

        default:
          return periodAmount;

      }

    }

}

export class BillFeed {

	list: BillModel[] = [];
	count: number;
	next: boolean;
  monthlyTotal: number;

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
    this.monthlyTotal = 0;
    this.list.map(bill => this.monthlyTotal += bill.monthlyAmount);
  }

}
