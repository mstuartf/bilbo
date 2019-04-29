import { Injectable } from '@angular/core'

import { BillModel, BillFeed } from './bill.model';

import * as moment from 'moment';

@Injectable()
export class BillCalculationService {

	constructor() { }

	private calculatePeriodBoundaries(salaryDate: number): [moment.Moment, moment.Moment] {

    let startDate = moment(),
        endDate = moment();

    startDate.date(salaryDate);
    endDate.date(salaryDate);

    if (salaryDate <= (new Date()).getDate()) {
      endDate.add('month', 1)
    } 

    else {
      startDate.subtract(1, 'months')
    }

    return [startDate, endDate];

  }

  private calculatePaymentsInWindow(bill: BillModel, startDate: moment.Moment, endDate: moment.Moment): [number, number] {

    const paymentDate = moment(bill.firstPaymentDate);

    let sum = 0, count = 0;

    while (paymentDate <= endDate) {

      if (paymentDate >= startDate) {
        sum += bill.amount;
        count += 1;

      }

      paymentDate.add(bill.period, bill.periodFrequency);

    }

    return [sum, count];

  }

  public calculateTotalDueInPeriod(billFeed: BillFeed, salaryDate): [number, number] {

  	const [startDate, endDate] = this.calculatePeriodBoundaries(salaryDate);

  	let sum = 0, count = 0;
  	billFeed.list.forEach(bill => {
  		const [billTotal, billCount] = this.calculatePaymentsInWindow(bill, startDate, endDate)
  		sum += billTotal;
  		count += billCount;
  	});

  	return [sum, count];

  }

}
