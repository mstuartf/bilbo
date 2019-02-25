import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { switchMap, map } from 'rxjs/operators';

import { BillService } from './bill.service';
import * as BillActions from './bill.actions';
import { BillQuery, BillObject } from './bill.interface';

@Injectable()
export class BillEffects {

	constructor(public actions$: Actions, public billService: BillService) {}

	@Effect()
	getBills$ = this.actions$.pipe(

		ofType(BillActions.GET_BILLS_REQUEST),

		switchMap((action: BillActions.GetBillsRequest) => 
			this.billService.query().pipe(
				map((data: BillQuery) => new BillActions.GetBillsSuccess(data))
			)
		)
	)

	@Effect()
	addBill$ = this.actions$.pipe(

		ofType(BillActions.ADD_BILL_REQUEST),

		switchMap((action: BillActions.AddBillRequest) => 
			this.billService.add(action.payload).pipe(
				map((data: BillObject) => new BillActions.AddBillSuccess(data))
			)
		)
	)

	@Effect()
	removeBill$ = this.actions$.pipe(

		ofType(BillActions.REMOVE_BILL_REQUEST),

		switchMap((action: BillActions.RemoveBillRequest) => 
			this.billService.remove(action.payload).pipe(
				map((data: BillObject) => new BillActions.RemoveBillSuccess(data))
			)
		)
	)

}
