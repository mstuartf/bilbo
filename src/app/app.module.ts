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
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { RegisterComponent } from '../components/register/register.component';

import { BillService } from '../providers/bill/bill.service';
import { billReducer } from '../providers/bill/bill.reducer';
import { BillEffects } from '../providers/bill/bill.effects';

import { UserService } from '../providers/user/user.service';
import { userReducer } from '../providers/user/user.reducer';
import { UserEffects } from '../providers/user/user.effects';

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
    SpinnerComponent,
    PopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ bills: billReducer, user: userReducer }, { metaReducers: [metaReducer] }),
    EffectsModule.forRoot([BillEffects, UserEffects]),
    HttpClientModule,
    MatModule
  ],
  providers: [BillService, UserService, TokenProvider, FakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
