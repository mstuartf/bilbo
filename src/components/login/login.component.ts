import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';
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
export class LoginComponent implements OnInit {

	user: UserModel = new UserModel();

	showSpinner: boolean;
	spinnerText: string;

	actionsSub: Subscription;

	showErrorPopup: boolean;
	errorPopupTitle: string;
	errorPopupMessage: string;
	errorPopupConfirm: string;

	constructor(public store: Store<AppState>, public userService: UserService, private actionsSubject: ActionsSubject, private router: Router) {

		this.actionsSub = this.actionsSubject.subscribe((action: StoreAction) => {
			if (action.type === UserActions.LOGIN_SUCCESS)
				this.onLoginSuccess();
			if (action.type === UserActions.LOGIN_FAILURE)
				this.onLoginFailure(action.payload);
		})

	}

	ngOnInit() {
	}

	login() {
		this.toggleLoadingSpinner(true, 'Logging in...');
		this.store.dispatch(new UserActions.LoginRequest(this.user))
	}

	onLoginSuccess() {
		this.toggleLoadingSpinner(false);
		this.router.navigate([''])
	}

	onLoginFailure(err: HttpErrorResponse) {
		this.toggleLoadingSpinner(false);
		this.errorPopupTitle = 'Oops, something went wrong';
		this.errorPopupMessage = err.error;
		this.errorPopupConfirm = 'OK';
		this.showErrorPopup = true;
	}

	onConfirmPopup() {
		this.showErrorPopup = false;
	}

	toggleLoadingSpinner(show: boolean, text?: string) {
		if (text)
			this.spinnerText = text;
		this.showSpinner = show;
	}

	ngOnDestroy() {
		this.actionsSub.unsubscribe();
	}

}
