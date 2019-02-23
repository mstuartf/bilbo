import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { switchMap, map } from 'rxjs/operators';

import { BillService } from './bill.service';
import * as BillActions from './bill.actions';
import { BillQuery } from './bill.interface';

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

}
