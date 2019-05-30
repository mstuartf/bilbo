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

import { MonzoAuthComponent } from './components/monzo-auth/monzo-auth.component';


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
	public authLink: string;

  constructor(
  		private router: Router,
  		public dialog: MatDialog,
		private store: Store<AppState>, 
		private actionsSubject: ActionsSubject, 
		) {

  		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val: NavigationEnd) => {
	        this.activeUrl = val.urlAfterRedirects;
	    });

  		this.store.dispatch(new UserActions.GetRequest())

	}

  ngOnInit() {

  	this.store.select('user').subscribe((user: UserObject) => {
			if (user) {

				this.user = new UserModel(user);

				if (this.user.whitelisted && !this.user.monzoToken) {
					this.store.dispatch(new AuthActions.GetAuthLinkRequest());
				}

			}
		})

  	this.store.select('auth').subscribe((authLink: AuthLinkResponse) => {
			if (authLink) {
				this.authLink = authLink.url;
			}
		})
  	
  }


  public authorisePopup() {
  	const dialogRef = this.dialog.open(MonzoAuthComponent, {
	      width: '250px',
	      data: this.authLink
	    });
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
