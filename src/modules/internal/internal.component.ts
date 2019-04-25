import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';

import { ActionsSubject } from '@ngrx/store';

import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoreAction } from '../../state/store-action.interface';

import { UserModel } from '../shared/providers/user/user.model';
import * as UserActions from '../shared/providers/user/user.actions';
import { UserObject } from '../shared/providers/user/user.interface';

import * as AuthActions from './providers/auth/auth.actions';
import { AuthLinkResponse } from './providers/auth/auth.interface';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.less']
})
export class InternalComponent implements OnInit {

	private unsubscribe = new Subject();

	public showAuthSpinner: boolean;

	private actionsSub: Subscription

	public user: UserModel;

  constructor(
		private store: Store<AppState>, 
		private actionsSubject: ActionsSubject, 
		) {

  		this.store.dispatch(new UserActions.GetRequest())

		this.actionsSub = actionsSubject.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => { 

			switch (action.type) {

				case AuthActions.GET_AUTH_LINK_SUCCESS:
					this.onGetAuthLinkSuccess(action.payload);
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
			}
		})
  	
  }

  	public authorise() {
		this.showAuthSpinner = true;
		this.store.dispatch(new AuthActions.GetAuthLinkRequest());
	}

	public onGetAuthLinkSuccess(authLink: AuthLinkResponse) {
		this.showAuthSpinner = false;
		window.open(authLink.url, '_blank');
	}

	public getMoreInfo() {
		window.open('https://docs.monzo.com/#authentication', '_blank');
	}

}
