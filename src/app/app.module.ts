import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ExternalModule } from '../modules/external/external.module';
import { InternalModule } from '../modules/internal/internal.module';

import { PopupComponent } from '../components/popup/popup.component';
import { NewBillPopupComponent } from '../components/new-bill-popup/new-bill-popup.component';
import { PotDepositDayPopupComponent } from '../components/pot-deposit-day-popup/pot-deposit-day-popup.component';

import { BillService } from '../providers/bill/bill.service';
import { billReducer } from '../providers/bill/bill.reducer';
import { BillEffects } from '../providers/bill/bill.effects';

import { UserService } from '../providers/user/user.service';
import { userReducer } from '../providers/user/user.reducer';
import { UserEffects } from '../providers/user/user.effects';

import { AuthService } from '../providers/auth/auth.service';
import { authReducer } from '../providers/auth/auth.reducer';
import { AuthEffects } from '../providers/auth/auth.effects';

import { AccountsService } from '../providers/accounts/accounts.service';
import { accountsReducer } from '../providers/accounts/accounts.reducer';
import { AccountsEffects } from '../providers/accounts/accounts.effects';

import { metaReducer } from '../helpers/meta.reducer';

import { FakeBackendProvider } from '../helpers/fake-backend/backend.interceptor';
import { TokenProvider } from '../helpers/auth.interceptor';
import { UrlProvider } from '../helpers/url.interceptor';

import { MatModule } from '../helpers/mat.module';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    NewBillPopupComponent,
    PotDepositDayPopupComponent
  ],
  // For any component loaded into a dialog, you must include your component class in the list of entryComponents 
  // in your NgModule definition so that the Angular compiler knows to create the ComponentFactory for it.
  entryComponents: [
    PopupComponent,
    NewBillPopupComponent,
    PotDepositDayPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ExternalModule,
    InternalModule,
    AppRoutingModule,
    StoreModule.forRoot({ bills: billReducer, user: userReducer, auth: authReducer, accounts: accountsReducer }, { metaReducers: [metaReducer] }),
    EffectsModule.forRoot([BillEffects, UserEffects, AuthEffects, AccountsEffects]),
    HttpClientModule,
    MatModule
  ],
  providers: [BillService, UserService, UrlProvider, TokenProvider, FakeBackendProvider, AuthService, AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
