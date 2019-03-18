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


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

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

	public register() {
		this.toggleLoadingSpinner(true, 'Creating your account...');
		this.store.dispatch(new UserActions.RegisterRequest(this.user))
	}

	private onRegisterSuccess() {
		this.toggleLoadingSpinner(false);
		this.router.navigate([''])
	}

	private onRegisterFailure(err: HttpErrorResponse) {
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
