import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { PotsService } from './pots.service';
import * as PotsActions from './pots.actions';
import { PotsQuery } from './pots.interface';

@Injectable()
export class PotsEffects {

	constructor(public actions$: Actions, public potsService: PotsService) {}

	@Effect()
	private getBills$ = this.actions$.pipe(

		ofType(PotsActions.GET_POTS_REQUEST),

		switchMap((action: PotsActions.GetPotsRequest) => 
			this.potsService.list().pipe(
				map((data: PotsQuery) => new PotsActions.GetPotsSuccess(data)),
				catchError((err: HttpErrorResponse) => of(new PotsActions.GetPotsFailure(err)))  // need to catch the error or the stream will end
			)
		)
	)

}
