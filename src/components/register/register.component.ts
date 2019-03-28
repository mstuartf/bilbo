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

	public showPopup: boolean;
	public popupConfig: PopupConfig;
	public onConfirmPopup: Function;
	public onCancelPopup: Function;

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
		this.onConfirmPopup = this.onRegisterConfirm;
		this.onCancelPopup = () => this.showPopup = false;
		this.popupConfig = {
			title: 'Confirm',
			message: 'Are you sure you would like to register?',
			confirm: 'OK',
			cancel: 'Cancel'
		};
		this.showPopup = true; 
	}

	public onRegisterConfirm() {
		this.toggleLoadingSpinner(true, 'Creating your account...');
		this.store.dispatch(new UserActions.RegisterRequest(this.user))
	}

	private onRegisterSuccess() {
		this.toggleLoadingSpinner(false);
		this.router.navigate([''])
	}

	private onRegisterFailure(err: HttpErrorResponse) {
		this.toggleLoadingSpinner(false);
		this.onConfirmPopup = () => this.showPopup = false;
		this.popupConfig = {
			title: 'Oops, something went wrong',
			message: err.error,
			confirm: 'OK'
		};
		this.showPopup = true;
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
