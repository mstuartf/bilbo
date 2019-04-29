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

  private calculatePaymentsInWindow(bill: BillModel, startDate: moment.Moment, endDate: moment.Moment): number {

    const paymentDate = moment(bill.firstPaymentDate);

    let total = 0;

    while (paymentDate <= endDate) {

      if (paymentDate >= startDate) {
        total += bill.amount;
      }

      paymentDate.add(bill.period, bill.periodFrequency);

    }

    return total;

  }

  public calculateTotalDueInPeriod(billFeed: BillFeed, salaryDate): number {

  	const [startDate, endDate] = this.calculatePeriodBoundaries(salaryDate);

  	let totalAmount = 0;
  	billFeed.list.forEach(bill => totalAmount += this.calculatePaymentsInWindow(bill, startDate, endDate));

  	return totalAmount;

  }

}
