import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, DefaultUrlSerializer, UrlTree } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

	private unsubscribe = new Subject();

	public showSpinner: boolean;
	public spinnerText: string;

	private actionsSub: Subscription;

	public popupConfig: PopupConfig;
	public onConfirmPopup: Function;
	public onCancelPopup: Function;

	// define form and getters so template can access controls
	public loginForm = new FormGroup({
		emailAddress: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required])
	})

	get emailAddress () {
		return this.loginForm.get('emailAddress');
	}

	get password () {
		return this.loginForm.get('password');
	}

	constructor(
		public store: Store<AppState>, 
		public userService: UserService, 
		private actionsSubject: ActionsSubject, 
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog
		) {

		this.actionsSub = this.actionsSubject.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => {

			switch (action.type) {

				case UserActions.LOGIN_SUCCESS:
					this.onLoginSuccess();
					break;

				case UserActions.LOGIN_FAILURE:
					this.onLoginFailure(action.payload);
					break;

				default:
					break;

			}
			
		})

	}

	public ngOnInit() {}

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

	public login() {
		const user = new UserModel();
		user.emailAddress = this.emailAddress.value;
		user.password = this.password.value;
		this.showSpinner = true;
		this.disableInputs(true);
		this.store.dispatch(new UserActions.LoginRequest(user))
	}

	private onLoginSuccess() {
		this.showSpinner = false;
		this.disableInputs(false);
		const redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl');
		if (redirectUrl) {
			this.continueToRedirect(redirectUrl);
		}
		else {
			this.router.navigate(['internal'])
		}
	}

	public continueToRedirect(redirectUrl: string) {
		const urlSerializer = new DefaultUrlSerializer();
		const redirectUrlTree: UrlTree = urlSerializer.parse(redirectUrl);
		const path = redirectUrl.split('?')[0];
		const params = redirectUrlTree.queryParams;
		this.router.navigate([path], {queryParams: params})
	}

	private onLoginFailure(err: HttpErrorResponse) {
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
