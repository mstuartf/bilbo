import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ActionsSubject } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoreAction } from '../../helpers/store-action.interface';

import { AppState } from '../../app/app.state';
import { BillService } from '../../providers/bill/bill.service';
import { BillFeed, BillModel } from '../../providers/bill/bill.model';
import { BillQuery } from '../../providers/bill/bill.interface';
import * as BillActions from '../../providers/bill/bill.actions';
import * as UserActions from '../../providers/user/user.actions';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	unsubscribe = new Subject();

	billFeed: BillFeed;
	newBill: BillModel = new BillModel();
	actionsSub: Subscription

	showSpinner: boolean;
	spinnerText: string;

	showErrorPopup: boolean;
	errorPopupTitle: string;
	errorPopupMessage: string;
	errorPopupConfirm: string;

	constructor(public billService: BillService, private store: Store<AppState>, private actionsSubject: ActionsSubject, private router: Router) {

		this.toggleLoadingSpinner(true, 'Loading...')

		this.store.dispatch(new BillActions.GetBillsRequest())

		this.actionsSub = actionsSubject.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => { 
			if (action.type === BillActions.ADD_BILL_SUCCESS)
				this.onAddBillSuccess();
			else if (action.type === BillActions.REMOVE_BILL_SUCCESS)
				this.onRemoveBillSuccess();
			else if (action.type === BillActions.ADD_BILL_FAILURE)
				this.onBillActionFailure(action.payload);
			else if (action.type === BillActions.REMOVE_BILL_FAILURE)
				this.onBillActionFailure(action.payload);
			else if (action.type === UserActions.LOGOUT_SUCCESS)
				this.onLogoutSuccess();
		});

	}

	ngOnInit() {
		this.store.select('bills').subscribe((bills: BillQuery) => {
			if (bills) {
				this.billFeed = new BillFeed(bills);
				this.toggleLoadingSpinner(false);
			}
		})
	}

	addBill() {
		this.toggleLoadingSpinner(true, 'Adding bill...')
		this.store.dispatch(new BillActions.AddBillRequest(this.newBill));    
	}

	onAddBillSuccess() {
		this.newBill = new BillModel();
		this.toggleLoadingSpinner(false);
	}

	removeBill(bill: BillModel) {
		this.toggleLoadingSpinner(true, 'Removing bill...')
		this.store.dispatch(new BillActions.RemoveBillRequest(bill))
	}

	toggleLoadingSpinner(show: boolean, text?: string) {
		if (text)
			this.spinnerText = text;
		this.showSpinner = show;
	}

	onRemoveBillSuccess() {
		this.toggleLoadingSpinner(false);
	}

	onBillActionFailure(err: HttpErrorResponse) {
		this.toggleLoadingSpinner(false);
		this.errorPopupTitle = 'Oops, something went wrong';
		this.errorPopupMessage = err.error;
		this.errorPopupConfirm = 'OK';
		this.showErrorPopup = true;
	}

	logout() {
		this.toggleLoadingSpinner(true, 'Logging out...')
		this.store.dispatch(new UserActions.LogoutRequest());    
	}

	onLogoutSuccess() {
		this.toggleLoadingSpinner(false);
		this.router.navigate(['login'])
	}

	ngOnDestroy() {
		this.unsubscribe.next();
    	this.unsubscribe.complete();
	}

}
