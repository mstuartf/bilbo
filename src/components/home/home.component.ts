import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../app/app.state';
import { BillService } from '../../providers/bill/bill.service';
import { BillFeed, BillModel } from '../../providers/bill/bill.model';
import { BillQuery } from '../../providers/bill/bill.interface';
import * as BillActions from '../../providers/bill/bill.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  billFeed: BillFeed;
  newBill: BillModel = new BillModel();
  actionsSub: Subscription

  constructor(public billService: BillService, private store: Store<AppState>, private actionsSubject: ActionsSubject) {

    this.store.dispatch(new BillActions.GetBillsRequest())

    this.actionsSub = actionsSubject.subscribe(action => { 
       if (action.type === BillActions.ADD_BILL_SUCCESS)
          this.onAddBillSuccess();
    });

  }

  ngOnInit() {
    this.store.select('bills').subscribe((bills: BillQuery) => {
      this.billFeed = new BillFeed(bills);
    })
  }

  addBill() {
    this.store.dispatch(new BillActions.AddBillRequest(this.newBill));    
  }

  onAddBillSuccess() {
    this.newBill = new BillModel();
  }

  removeBill(bill: BillModel) {
    this.store.dispatch(new BillActions.RemoveBillRequest(bill))
  }

  ngOnDestroy() {
    this.actionsSub.unsubscribe();
  }

}
