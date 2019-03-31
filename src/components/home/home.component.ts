import { Component, OnInit, ViewChild } from '@angular/core';
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
import { PopupComponent } from '../popup/popup.component';

import { NewBillPopupComponent } from '../new-bill-popup/new-bill-popup.component';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	private unsubscribe = new Subject();

	public billFeed: BillFeed;
	private actionsSub: Subscription

	public showSpinner: boolean;
	public spinnerText: string;

	public popupConfig: PopupConfig;
	public onConfirmPopup: Function;
	public onCancelPopup: Function;

	public columnsToDisplay: string[] = ['title', 'description', 'dueDate', 'amount', 'remove'];

	// define form and getters so template can access controls
	public registerForm = new FormGroup({
		emailAddress: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required])
	})

	get emailAddress () {
		return this.registerForm.get('emailAddress');
	}

	get password () {
		return this.registerForm.get('password');
	}

	// need to create a MatTableDataSource and set its sort property for the table data to be sortable
	public dataSource: MatTableDataSource<BillModel>;
    @ViewChild(MatSort) sort: MatSort;

	constructor(
		public billService: BillService, 
		private store: Store<AppState>, 
		private actionsSubject: ActionsSubject, 
		private router: Router,
		public dialog: MatDialog
		) {

		this.showSpinner = true;

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
				this.buildTableDataSource();
				this.showSpinner = false;
			}
		})
	}

	private buildTableDataSource() {
		this.dataSource = new MatTableDataSource(this.billFeed.list);
		this.dataSource.sort = this.sort;
	}

	public showPopup(config: PopupConfig, onConfirm?: Function): void {
	    const dialogRef = this.dialog.open(PopupComponent, {
	      width: '250px',
	      data: config
	    });

	    dialogRef.afterClosed().subscribe(result => {
	      if (result && onConfirm) {
	      	onConfirm();
	      }
	    });
	  }

	public addBill() {
		const dialogRef = this.dialog.open(NewBillPopupComponent, {
	      width: '400px'
	    });

	    dialogRef.afterClosed().subscribe((newBill?: BillModel) => {
	      if (newBill) {
	      	this.onAddBillConfirm(newBill);
	      }
	    });
	}

	public onAddBillConfirm(newBill: BillModel) {
		this.showSpinner = true;
		this.store.dispatch(new BillActions.AddBillRequest(newBill));
	}

	private onAddBillSuccess() {
		this.showSpinner = false;
		const popupConfig = {
			title: 'Success',
			message: 'New bill added',
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	public removeBill(bill: BillModel) {
		const popupConfig = {
			title: 'Confirm',
			message: 'Are you sure you would like to remove this bill?',
			confirm: 'OK',
			cancel: 'Cancel'
		};
		this.showPopup(popupConfig, () => this.onRemoveBillConfirm(bill));
	}

	public onRemoveBillConfirm(bill: BillModel) {
		this.showSpinner = true;
		this.store.dispatch(new BillActions.RemoveBillRequest(bill));
	}

	private onRemoveBillSuccess() {
		this.showSpinner = false;
		const popupConfig = {
			title: 'Success',
			message: 'Bill removed',
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	private onBillActionFailure(err: HttpErrorResponse) {
		this.showSpinner = false;
		const popupConfig = {
			title: 'Oops, something went wrong',
			message: err.error,
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	public logout() {const popupConfig = {
			title: 'Confirm',
			message: 'Are you sure you would like logout?',
			confirm: 'OK',
			cancel: 'Cancel'
		};
		this.showPopup(popupConfig, () => this.onLogoutConfirm()); 
	}

	public onLogoutConfirm() {
		this.showSpinner = true;
		this.store.dispatch(new UserActions.LogoutRequest());    
	}

	private onLogoutSuccess() {
		this.showSpinner = false;
		this.router.navigate(['login'])
	}

	public ngOnDestroy() {
		this.unsubscribe.next();
    	this.unsubscribe.complete();
	}

}
