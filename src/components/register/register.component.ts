import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';
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

	user: UserModel = new UserModel();

	showSpinner: boolean;
	spinnerText: string;

	actionsSub: Subscription;

	constructor(public store: Store<AppState>, public userService: UserService, private actionsSubject: ActionsSubject, private router: Router) {

		this.actionsSub = this.actionsSubject.subscribe((action: StoreAction) => {
			if (action.type === UserActions.REGISTER_SUCCESS)
				this.onRegisterSuccess();
			if (action.type === UserActions.REGISTER_FAILURE)
				this.onRegisterFailure(action.payload);
		})

	}

	ngOnInit() {
	}

	register() {
		this.toggleLoadingSpinner(true, 'Creating your account...');
		this.store.dispatch(new UserActions.RegisterRequest(this.user))
	}

	onRegisterSuccess() {
		this.toggleLoadingSpinner(false);
		this.router.navigate([''])
	}

	onRegisterFailure(err: HttpErrorResponse) {
		this.toggleLoadingSpinner(false);
		console.log(err);
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
