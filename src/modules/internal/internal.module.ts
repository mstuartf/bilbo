import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { NewBillPopupComponent } from './components/new-bill-popup/new-bill-popup.component';

import { BillModule } from './providers/bill/bill.module';
import { AuthModule } from './providers/auth/auth.module';
import { AccountsModule } from './providers/accounts/accounts.module';

import { SharedModule } from '../shared/shared.module';
import { InternalRoutingModule } from './internal-routing.module';

@NgModule({
  declarations: [
  	HomeComponent,
  	NewBillPopupComponent
  ],
  entryComponents: [
    NewBillPopupComponent  // loaded in a dialog so must be included in entryComponents
  ],
  imports: [
    SharedModule,
    BillModule,
    AuthModule,
    AccountsModule,
    InternalRoutingModule
  ]
})
export class InternalModule { }
