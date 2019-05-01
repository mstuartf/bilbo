import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActionsSubject } from '@ngrx/store';

import { AppState } from '../../../../state/app.state';
import { StoreAction } from '../../../../state/store-action.interface';

import { UserModel } from '../../../shared/providers/user/user.model';
import { UserService } from '../../../shared/providers/user/user.service';
import * as UserActions from '../../../shared/providers/user/user.actions';
import { UserObject } from '../../../shared/providers/user/user.interface';

import { PopupConfig } from '../../../shared/components/popup/popup-config.interface';
import { PopupComponent } from '../../../shared/components/popup/popup.component';

import { PotDepositDayPopupComponent } from '../pot-deposit-day-popup/pot-deposit-day-popup.component';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { MatDialog } from '@angular/material';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

	private unsubscribe = new Subject();

	public showSpinner: boolean;
	public spinnerText: string;

	private actionsSub: Subscription;

	public popupConfig: PopupConfig;
	public onConfirmPopup: Function;
	public onCancelPopup: Function;

	// define form and getters so template can access controls
	public registerForm = new FormGroup({
		emailAddress: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required])
	})

	@ViewChild(FormGroupDirective) formElement;  // need to access the form element to reset it after submit

	get emailAddress () {
		return this.registerForm.get('emailAddress');
	}

	get password () {
		return this.registerForm.get('password');
	}

	constructor(
		public store: Store<AppState>, 
		public userService: UserService, 
		private actionsSubject: ActionsSubject, 
		private router: Router,
		public dialog: MatDialog
		) {

		this.actionsSub = this.actionsSubject.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => {
			
			switch (action.type) {

				case UserActions.REGISTER_SUCCESS:
					this.onRegisterSuccess();
					break;

				case UserActions.REGISTER_FAILURE:
					this.onRegisterFailure(action.payload);
					break;

				default:
					break;

			}

		})

	}

	public ngOnInit() {
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

	public register(): void {
	    const dialogRef = this.dialog.open(PotDepositDayPopupComponent, {
	      width: '400px'
	    });

	    dialogRef.afterClosed().subscribe((potDepositDay: number) => {
	      this.onRegisterConfirm(potDepositDay);
	    });
	  }

	public onRegisterConfirm(potDepositDay: number) {
		const user = new UserModel();
		user.emailAddress = this.emailAddress.value;
		user.password = this.password.value;
		user.potDepositDay = potDepositDay;
		this.showSpinner = true;
		this.disableInputs(true);
		this.store.dispatch(new UserActions.RegisterRequest(user))
	}

	private onRegisterSuccess() {
		this.showSpinner = false;
		this.disableInputs(false);
		this.formElement.resetForm();
		const popupConfig = {
			title: 'Verify email',
			message: 'Your account has been created. You just need to click on the verification link in the email we\'ve sent you before logging in.',
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	private onRegisterFailure(err: HttpErrorResponse) {
		this.showSpinner = false;
		this.disableInputs(false);
		const popupConfig = {
			title: 'Oops, something went wrong',
			message: `${err.status}: ${err.statusText}`,
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	private disableInputs(disable: boolean) {
		if (disable) {
			this.emailAddress.disable();
			this.password.disable();
		}
		else {
			this.emailAddress.enable();
			this.password.enable();
		}
	}

	public ngOnDestroy() {
		this.unsubscribe.next();
    	this.unsubscribe.complete();
	}

}
