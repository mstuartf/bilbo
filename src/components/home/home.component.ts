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

import { PopupConfig } from '../popup/popup-config.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	private unsubscribe = new Subject();

	public billFeed: BillFeed;
	public newBill: BillModel = new BillModel();
	private actionsSub: Subscription

	public showSpinner: boolean;
	public spinnerText: string;

	public showPopup: boolean;
	public popupConfig: PopupConfig;
	public onConfirmPopup: Function;
	public onCancelPopup: Function;

	constructor(public billService: BillService, private store: Store<AppState>, private actionsSubject: ActionsSubject, private router: Router) {

		this.toggleLoadingSpinner(true, 'Loading...')

		this.store.dispatch(new BillActions.GetBillsRequest())

		this.actionsSub = actionsSubject.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => { 

			switch (action.type) {

				case BillActions.ADD_BILL_SUCCESS:
					this.onAddBillSuccess();
					break;

				case BillActions.REMOVE_BILL_SUCCESS:
					this.onRemoveBillSuccess();
					break;

				case BillActions.ADD_BILL_FAILURE || BillActions.REMOVE_BILL_FAILURE:
					this.onBillActionFailure(action.payload);
					break;

				case UserActions.LOGOUT_SUCCESS:
					this.onLogoutSuccess();
					break;

				default:
					break;

			}

		});

	}

	public ngOnInit() {
		this.store.select('bills').subscribe((bills: BillQuery) => {
			if (bills) {
				this.billFeed = new BillFeed(bills);
				this.toggleLoadingSpinner(false);
			}
		})
	}

	public addBill() {
		this.onConfirmPopup = this.onAddBillConfirm;
		this.onCancelPopup = () => this.showPopup = false;
		this.popupConfig = {
			title: 'Confirm',
			message: 'Are you sure you would like to add this bill?',
			confirm: 'OK',
			cancel: 'Cancel'
		};
		this.showPopup = true; 
	}

	public onAddBillConfirm() {
		this.toggleLoadingSpinner(true, 'Adding bill...')
		this.store.dispatch(new BillActions.AddBillRequest(this.newBill));
		this.showPopup = false; 
	}

	private onAddBillSuccess() {
		this.newBill = new BillModel();
		this.toggleLoadingSpinner(false);
		this.onConfirmPopup = () => this.showPopup = false;
		this.popupConfig = {
			title: 'Sucess',
			message: 'New bill added',
			confirm: 'OK'
		};
		this.showPopup = true;
	}

	public removeBill(bill: BillModel) {
		this.onConfirmPopup = () => this.onRemoveBillConfirm(bill);
		this.onCancelPopup = () => this.showPopup = false;
		this.popupConfig = {
			title: 'Confirm',
			message: 'Are you sure you would like to remove this bill?',
			confirm: 'OK',
			cancel: 'Cancel'
		};
		this.showPopup = true; 
	}

	public onRemoveBillConfirm(bill: BillModel) {
		this.toggleLoadingSpinner(true, 'Removing bill...');
		this.store.dispatch(new BillActions.RemoveBillRequest(bill));
	}

	private toggleLoadingSpinner(show: boolean, text?: string) {
		if (text)
			this.spinnerText = text;
		this.showSpinner = show;
	}

	private onRemoveBillSuccess() {
		this.toggleLoadingSpinner(false);
		this.onConfirmPopup = () => this.showPopup = false;
		this.popupConfig = {
			title: 'Sucess',
			message: 'Bill removed',
			confirm: 'OK'
		};
		this.showPopup = true;
	}

	private onBillActionFailure(err: HttpErrorResponse) {
		this.toggleLoadingSpinner(false);
		this.onConfirmPopup = () => this.showPopup = false;
		this.popupConfig = {
			title: 'Oops, something went wrong',
			message: err.error,
			confirm: 'OK'
		};
		this.showPopup = true;
	}

	public logout(bill: BillModel) {
		this.onConfirmPopup = this.onLogoutConfirm;
		this.onCancelPopup = () => this.showPopup = false;
		this.popupConfig = {
			title: 'Confirm',
			message: 'Are you sure you would like logout?',
			confirm: 'OK',
			cancel: 'Cancel'
		};
		this.showPopup = true; 
	}

	public onLogoutConfirm() {
		this.toggleLoadingSpinner(true, 'Logging out...')
		this.store.dispatch(new UserActions.LogoutRequest());    
	}

	private onLogoutSuccess() {
		this.toggleLoadingSpinner(false);
		this.router.navigate(['login'])
	}

	public ngOnDestroy() {
		this.unsubscribe.next();
    	this.unsubscribe.complete();
	}

}
