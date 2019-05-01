import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ActionsSubject } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppState } from '../../../../state/app.state';
import { StoreAction } from '../../../../state/store-action.interface';

import { BillService } from '../../providers/bill/bill.service';
import { BillFeed, BillModel } from '../../providers/bill/bill.model';
import { BillQuery } from '../../providers/bill/bill.interface';
import * as BillActions from '../../providers/bill/bill.actions';

import { UserModel } from '../../../shared/providers/user/user.model';
import * as UserActions from '../../../shared/providers/user/user.actions';
import { UserObject } from '../../../shared/providers/user/user.interface';

import * as AuthActions from '../../providers/auth/auth.actions';
import { AuthLinkResponse } from '../../providers/auth/auth.interface';

import { PopupConfig } from '../../../shared/components/popup/popup-config.interface';
import { PopupComponent } from '../../../shared/components/popup/popup.component';

import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import * as PotsActions from '../../providers/pots/pots.actions';
import { PotObject, PotsQuery } from '../../providers/pots/pots.interface';

import * as AccountsActions from '../../providers/accounts/accounts.actions';
import { AccountObject, AccountsQuery } from '../../providers/accounts/accounts.interface';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

	private unsubscribe = new Subject();

	private actionsSub: Subscription

	public user: UserModel;
	public pots: PotObject[] = [];
	public accounts: AccountObject[] = [];

	public popupConfig: PopupConfig;
	public onConfirmPopup: Function;
	public onCancelPopup: Function;

	public showSpinner: boolean;

	public get allDataLoaded(): boolean {
		if (!this.user) {
			return false;
		}
		if (this.user.monzoToken && (!this.pots.length || !this.accounts.length)) {
			return false;
		}
		return true;
	}

  	constructor(
		private store: Store<AppState>, 
		private actionsSubject: ActionsSubject, 
		private router: Router,
		public dialog: MatDialog
		) {

		this.actionsSub = actionsSubject.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => { 

			switch (action.type) {

				case UserActions.LOGOUT_SUCCESS:
					this.onLogoutSuccess();
					break;

				case UserActions.UPDATE_SUCCESS:
					this.onUpdateUserSuccess();
					break;

				case UserActions.UPDATE_FAILURE:
					this.onActionFailure(action.payload);
					break;

				default:
					break;

			}

		});

	}

	  ngOnInit() {

	  	this.store.select('user').subscribe((user: UserObject) => {
			
			if (user) {

				this.user = new UserModel(user);
				
				if (this.user.monzoToken) {
					this.store.dispatch(new PotsActions.GetPotsRequest());
  					this.store.dispatch(new AccountsActions.GetAccountsRequest());
				}

			}

		})

		this.store.select('pots').subscribe((potsQuery: PotsQuery) => {
			if (potsQuery) {
				this.pots = potsQuery.pots;
			}
		})

		this.store.select('accounts').subscribe((accountsQuery: AccountsQuery) => {
			if (accountsQuery) {
				this.accounts = accountsQuery.accounts;
			}
		})

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

  	private onActionFailure(err: HttpErrorResponse) {
		this.showSpinner = false;
		const popupConfig = {
			title: 'Oops, something went wrong',
			message: `${err.status}: ${err.statusText}`,
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	public logout() {

		const popupConfig = {
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
		this.router.navigate(['external'])
	}

	public updateIsActive() {
		this.showSpinner = true;
		this.user.isActive = !this.user.isActive;
		this.updateUser();
	}

	public updateSalaryDate() {
		this.showSpinner = true;
		this.updateUser();
	}

	public updateBilboPot() {
		this.showSpinner = true;
		this.updateUser();
	}

	public updateMainAccount() {
		this.showSpinner = true;
		this.updateUser();
	}

	private updateUser() {
		this.store.dispatch(new UserActions.UpdateRequest(this.user));
	}

	public onUpdateUserSuccess() {
		this.showSpinner = false;
	}

	public ngOnDestroy() {
		this.unsubscribe.next();
    	this.unsubscribe.complete();
	}
}
