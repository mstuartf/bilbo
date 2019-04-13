import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { PopupComponent } from '../components/popup/popup.component';
import { NewBillPopupComponent } from '../components/new-bill-popup/new-bill-popup.component';
import { RegisterComponent } from '../components/register/register.component';

import { BillService } from '../providers/bill/bill.service';
import { billReducer } from '../providers/bill/bill.reducer';
import { BillEffects } from '../providers/bill/bill.effects';

import { UserService } from '../providers/user/user.service';
import { userReducer } from '../providers/user/user.reducer';
import { UserEffects } from '../providers/user/user.effects';

import { AuthService } from '../providers/auth/auth.service';
import { authReducer } from '../providers/auth/auth.reducer';
import { AuthEffects } from '../providers/auth/auth.effects';

import { metaReducer } from '../helpers/meta.reducer';

import { FakeBackendProvider } from '../helpers/fake-backend/backend.interceptor';
import { TokenProvider } from '../helpers/auth.interceptor';

import { MatModule } from '../helpers/mat.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PopupComponent,
    NewBillPopupComponent
  ],
  // For any component loaded into a dialog, you must include your component class in the list of entryComponents 
  // in your NgModule definition so that the Angular compiler knows to create the ComponentFactory for it.
  entryComponents: [
    PopupComponent,
    NewBillPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ bills: billReducer, user: userReducer, auth: authReducer }, { metaReducers: [metaReducer] }),
    EffectsModule.forRoot([BillEffects, UserEffects, AuthEffects]),
    HttpClientModule,
    MatModule
  ],
  providers: [BillService, UserService, TokenProvider, FakeBackendProvider, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
