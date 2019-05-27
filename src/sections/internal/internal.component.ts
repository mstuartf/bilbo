import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';

import { ActionsSubject } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { StoreAction } from '../../state/store-action.interface';

import { UserModel } from '../shared/providers/user/user.model';
import * as UserActions from '../shared/providers/user/user.actions';
import { UserObject } from '../shared/providers/user/user.interface';

import * as AuthActions from './providers/auth/auth.actions';
import { AuthLinkResponse } from './providers/auth/auth.interface';

import { MatDialog } from '@angular/material';

import { PopupConfig } from '../shared/components/popup/popup-config.interface';
import { PopupComponent } from '../shared/components/popup/popup.component';


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
	public activeUrl: string;

  constructor(
  		private router: Router,
  		public dialog: MatDialog,
		private store: Store<AppState>, 
		private actionsSubject: ActionsSubject, 
		) {

  		router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val: NavigationEnd) => {
	        this.activeUrl = val.url;
	    });

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


  public authorisePopup() {
  	const popupConfig = {
		title: 'Action needed',
		message: 'Bilbo needs you to link your Monzo account!',
		cancel: 'Cancel',
		confirm: 'OK'
	};
	this.showPopup(popupConfig, () => this.authorise());
  }

  public whitelistInfo() {
  	const popupConfig = {
		title: 'Info',
		message: 'Bilbo is currently white-listing your account before linking to Monzo!',
		confirm: 'OK'
	};
	this.showPopup(popupConfig);
  }

  public settingsAction() {
  	const popupConfig = {
		title: 'Action needed',
		message: 'Bilbo needs you to select your Main Account and Pot in Settings!',
		confirm: 'OK'
	};
	this.showPopup(popupConfig);
  }

  	public authorise() {
		this.showAuthSpinner = true;
		this.store.dispatch(new AuthActions.GetAuthLinkRequest());
	}

	public onGetAuthLinkSuccess(authLink: AuthLinkResponse) {
		this.showAuthSpinner = false;
		window.open(authLink.url, '_blank');
	}

	public checkUserAction() {
		if (!this.user.whitelisted) {
			this.whitelistInfo();
		} 
		else if (!this.user.monzoToken) {
			this.authorisePopup();
		}
		else if (!this.user.bilboPotId || !this.user.mainAccountId) {
			this.settingsAction();
		}
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

}
