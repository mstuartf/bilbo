import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { RegisterComponent } from '../components/register/register.component';

import { BillService } from '../providers/bill/bill.service';
import { billReducer } from '../providers/bill/bill.reducer';
import { BillEffects } from '../providers/bill/bill.effects';

import { UserService } from '../providers/user/user.service';
import { userReducer } from '../providers/user/user.reducer';
import { UserEffects } from '../providers/user/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SpinnerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ bills: billReducer, user: userReducer }),
    EffectsModule.forRoot([BillEffects, UserEffects]),
  ],
  providers: [BillService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
