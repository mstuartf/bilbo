import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ActionsSubject } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppState } from '../../../../state/app.state';
import { StoreAction } from '../../../../state/store-action.interface';

import { BillService } from '../../providers/bill/bill.service';
import { BillFeed, BillModel } from '../../providers/bill/bill.model';
import { BillData } from '../../providers/bill/bill.interface';
import * as BillActions from '../../providers/bill/bill.actions';

import { UserModel } from '../../../shared/providers/user/user.model';
import { UserObject } from '../../../shared/providers/user/user.interface';

import { BillCalculationService } from '../../providers/bill/bill-calc.service';

import { PopupConfig } from '../../../shared/components/popup/popup-config.interface';
import { PopupComponent } from '../../../shared/components/popup/popup.component';

import { NewBillPopupComponent } from '../new-bill-popup/new-bill-popup.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { BillSummaryComponent, BillSummary } from '../bill-summary/bill-summary.component';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import * as moment from 'moment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	private unsubscribe = new Subject();

	public billFeed: BillFeed;
	private actionsSub: Subscription

	private user: UserModel;

	public lastSalaryDate: moment.Moment;
	public nextSalaryDate: moment.Moment;
	public periodSum: number;
	public periodCount: number;

	public showNewSpinner: boolean;

	public popupConfig: PopupConfig;
	public onConfirmPopup: Function;
	public onCancelPopup: Function;

	public dateFilter: Date;

	public columnsToDisplay: string[] = ['title', 'periodFrequency', 'period', 'firstPaymentDate', 'amount', 'remove'];

	// need to create a MatTableDataSource and set its sort property for the table data to be sortable
	public dataSource: MatTableDataSource<BillModel>;
    @ViewChild(MatSort) sort: MatSort;

	constructor(
		public billService: BillService,
		public billCalcService: BillCalculationService,
		private store: Store<AppState>, 
		private actionsSubject: ActionsSubject, 
		private router: Router,
		public dialog: MatDialog,
		private route: ActivatedRoute
		) {

		this.store.dispatch(new BillActions.GetBillsRequest())

		this.actionsSub = actionsSubject.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => { 

			switch (action.type) {

				case BillActions.ADD_BILL_SUCCESS:
					this.onAddBillSuccess();
					this.billFeed.updateTotal();
					break;

				case BillActions.REMOVE_BILL_SUCCESS:
					this.onRemoveBillSuccess();
					this.billFeed.updateTotal();
					break;

				case BillActions.ADD_BILL_FAILURE:
					this.onBillActionFailure(action.payload);
					break;

				case BillActions.REMOVE_BILL_FAILURE:
					this.onBillActionFailure(action.payload);
					break;

				default:
					break;

			}

		});

	}

	public ngOnInit() {

		this.loadUrlFilterDate();

		this.store.select('bills').subscribe((billData: BillData) => {
			if (billData) {
				this.billFeed = new BillFeed(billData.query);
				this.buildTableDataSource();
				this.updateSummaryRow();
				this.updateLocalFilterDate(billData.dateFilter)
			}
		})

		this.store.select('user').subscribe((userData: UserObject) => {
			if (userData) {
				this.user = new UserModel(userData);
				this.updateSummaryRow();
			}
		})

	}

	private updateSummaryRow() {

		if (!(this.user && this.billFeed)) {
			return;
		}

		if (!this.dateFilter) {
			this.billCalcService.updateSummary(this.billFeed, this.user.potDepositDay);
			this.lastSalaryDate = this.billCalcService.lastSalaryDate;
			this.nextSalaryDate = this.billCalcService.nextSalaryDate;
			this.periodCount = this.billCalcService.periodCount;
			this.periodSum = this.billCalcService.periodSum;
		}

		else {
			this.billFeed.updateTotal()
			this.periodSum = this.billFeed.monthlyTotal;
		}

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
		this.showNewSpinner = true;
		this.store.dispatch(new BillActions.AddBillRequest(newBill));
	}

	private onAddBillSuccess() {
		this.showNewSpinner = false;
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
		this.showNewSpinner = true;
		this.store.dispatch(new BillActions.RemoveBillRequest(bill));
	}

	private onRemoveBillSuccess() {
		this.showNewSpinner = false;
		const popupConfig = {
			title: 'Success',
			message: 'Bill removed',
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	private onBillActionFailure(err: HttpErrorResponse) {
		this.showNewSpinner = false;
		const popupConfig = {
			title: 'Oops, something went wrong',
			message: `${err.status}: ${err.statusText}`,
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	private loadUrlFilterDate() {
		const urlFilterDate = this.route.snapshot.queryParamMap.get('date');
		if (urlFilterDate) {
			this.store.dispatch(new BillActions.SetDateFilter(urlFilterDate));
		}
	}

	public selectFilterDate() {
		const dialogRef = this.dialog.open(DateFilterComponent, {
	      width: '400px',
	      data: {
	      	dateFilter: this.dateFilter
	      }
	    });

	    dialogRef.afterClosed().subscribe((dateFilter: Date) => {
	      if (dateFilter) {
	      	this.store.dispatch(new BillActions.SetDateFilter(moment(dateFilter).format('YYYY-MM-DD')));
	      }
	      else {
	      	this.removeFilterDate();
	      }
	    });
	}

	public removeFilterDate() {
		this.store.dispatch(new BillActions.RemoveDateFilter());
	}

	public updateLocalFilterDate(dateFilterString: string) {
		const dateFilter = dateFilterString? new Date(dateFilterString) : null;
		this.dateFilter = dateFilter;
		this.billFeed.filterByDate(dateFilter);
		this.buildTableDataSource();
		this.updateSummaryRow();
		this.router.navigate(['/internal/home'], {queryParams: {date: dateFilterString}});
	}

	public showInfo(): void {
		const summary: BillSummary = {
			billCount: this.billFeed.list.length,
			periodCount: this.periodCount,
			lastSalaryDate: this.lastSalaryDate,
			nextSalaryDate: this.nextSalaryDate
		}
	    this.dialog.open(BillSummaryComponent, { width: '400px', data: summary });
	  }

	public ngOnDestroy() {
		this.unsubscribe.next();
    	this.unsubscribe.complete();
	}

}
