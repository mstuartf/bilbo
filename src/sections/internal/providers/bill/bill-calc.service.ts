import { Injectable } from '@angular/core'

import { BillModel, BillFeed } from './bill.model';

import * as moment from 'moment';

@Injectable()
export class BillCalculationService {

	public lastSalaryDate: moment.Moment;
	public nextSalaryDate: moment.Moment;
	public periodSum: number;
	public periodCount: number;

	constructor() { }

	private setPeriodBoundaries(salaryDate: number) {

    this.lastSalaryDate = moment();
    this.nextSalaryDate = moment();

    this.lastSalaryDate.date(salaryDate);
    this.nextSalaryDate.date(salaryDate);

    if (salaryDate <= (new Date()).getDate()) {
      this.nextSalaryDate.add(1, 'month');
    } 

    else {
      this.lastSalaryDate.subtract(1, 'months');
    }

  }

  private calculatePaymentsInWindow(bill: BillModel): [number, number] {

    const paymentDate = moment(bill.firstPaymentDate);

    let sum = 0, count = 0;

    while (paymentDate <= this.nextSalaryDate) {

      if (paymentDate >= this.lastSalaryDate) {
        sum += bill.amount;
        count += 1;

      }

      paymentDate.add(bill.periodFrequency, bill.period);

    }

    return [sum, count];

  }

  public updateSummary(billFeed: BillFeed, salaryDate) {

  	this.setPeriodBoundaries(salaryDate);

  	this.periodSum = 0;
  	this.periodCount = 0;
  	billFeed.list.forEach(bill => {
  		const [billTotal, billCount] = this.calculatePaymentsInWindow(bill);
  		this.periodSum += billTotal;
  		this.periodCount += billCount;
  	});

  }

}
