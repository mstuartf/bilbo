import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActionsSubject } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { StoreAction } from '../../helpers/store-action.interface';

import { UserModel } from '../../providers/user/user.model';
import { UserService } from '../../providers/user/user.service';
import * as UserActions from '../../providers/user/user.actions';
import { UserObject } from '../../providers/user/user.interface';

import { PopupConfig } from '../popup/popup-config.interface';
import { PopupComponent } from '../popup/popup.component';

import { FormGroup, FormControl, Validators } from '@angular/forms';

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

	public register() {
		const popupConfig = {
			title: 'Confirm',
			message: 'Are you sure you would like to register?',
			confirm: 'OK',
			cancel: 'Cancel'
		};
		this.showPopup(popupConfig, () => this.onRegisterConfirm());
	}

	public onRegisterConfirm() {
		const user = new UserModel();
		user.emailAddress = this.emailAddress.value;
		user.password = this.password.value;
		this.showSpinner = true;
		this.store.dispatch(new UserActions.RegisterRequest(user))
	}

	private onRegisterSuccess() {
		this.showSpinner = false;
		this.router.navigate([''])
	}

	private onRegisterFailure(err: HttpErrorResponse) {
		this.showSpinner = false;
		const popupConfig = {
			title: 'Oops, something went wrong',
			message: err.error,
			confirm: 'OK'
		};
		this.showPopup(popupConfig);
	}

	public ngOnDestroy() {
		this.unsubscribe.next();
    	this.unsubscribe.complete();
	}

}
