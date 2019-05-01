import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AccountsService } from './accounts.service';
import * as AccountsActions from './accounts.actions';
import { AccountsQuery } from './accounts.interface';

@Injectable()
export class AccountsEffects {

	constructor(public actions$: Actions, public accountsService: AccountsService) {}

	@Effect()
	private getBills$ = this.actions$.pipe(

		ofType(AccountsActions.GET_ACCOUNTS_REQUEST),

		switchMap((action: AccountsActions.GetAccountsRequest) => 
			this.accountsService.list().pipe(
				map((data: AccountsQuery) => new AccountsActions.GetAccountsSuccess(data)),
				catchError((err: HttpErrorResponse) => of(new AccountsActions.GetAccountsFailure(err)))  // need to catch the error or the stream will end
			)
		)
	)

}
