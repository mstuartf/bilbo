import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../app/app.state';
import { BillService } from '../../providers/bill/bill.service';
import { BillFeed, BillModel } from '../../providers/bill/bill.model';
import { BillQuery } from '../../providers/bill/bill.interface';
import * as BillActions from '../../providers/bill/bill.actions';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	billFeed: BillFeed;
	newBill: BillModel = new BillModel();
	actionsSub: Subscription

	showSpinner: boolean;
	spinnerText: string;

	constructor(public billService: BillService, private store: Store<AppState>, private actionsSubject: ActionsSubject) {

		this.toggleLoadingSpinner(true, 'Loading...')

		this.store.dispatch(new BillActions.GetBillsRequest())

		this.actionsSub = actionsSubject.subscribe(action => { 
			if (action.type === BillActions.ADD_BILL_SUCCESS)
				this.onAddBillSuccess();
			else if (action.type === BillActions.REMOVE_BILL_SUCCESS)
				this.onRemoveBillSuccess();
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

	ngOnDestroy() {
		this.actionsSub.unsubscribe();
	}

}
