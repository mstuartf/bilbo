import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StoreAction } from '../../helpers/store-action.interface';
import { ActionsSubject } from '@ngrx/store';
import { AppState } from '../../app/app.state';

import { UserModel } from '../../providers/user/user.model';
import { UserService } from '../../providers/user/user.service';
import * as UserActions from '../../providers/user/user.actions';
import { UserObject } from '../../providers/user/user.interface';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

	private unsubscribe = new Subject();

	public user: UserModel = new UserModel();

	public showSpinner: boolean;
	public spinnerText: string;

	private actionsSub: Subscription;

	public showErrorPopup: boolean;
	public errorPopupTitle: string;
	public errorPopupMessage: string;
	public errorPopupConfirm: string;

	constructor(public store: Store<AppState>, public userService: UserService, private actionsSubject: ActionsSubject, private router: Router) {

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

	public ngOnInit() {
	}

	public login() {
		this.toggleLoadingSpinner(true, 'Logging in...');
		this.store.dispatch(new UserActions.LoginRequest(this.user))
	}

	private onLoginSuccess() {
		this.toggleLoadingSpinner(false);
		this.router.navigate([''])
	}

	private onLoginFailure(err: HttpErrorResponse) {
		this.toggleLoadingSpinner(false);
		this.errorPopupTitle = 'Oops, something went wrong';
		this.errorPopupMessage = err.error;
		this.errorPopupConfirm = 'OK';
		this.showErrorPopup = true;
	}

	public onConfirmPopup() {
		this.showErrorPopup = false;
	}

	private toggleLoadingSpinner(show: boolean, text?: string) {
		if (text)
			this.spinnerText = text;
		this.showSpinner = show;
	}

	public ngOnDestroy() {
		this.unsubscribe.next();
    	this.unsubscribe.complete();
	}

}
