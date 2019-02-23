import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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

  constructor(public billService: BillService, private store: Store<AppState>) {
    this.store.dispatch(new BillActions.GetBillsRequest())
  }

  ngOnInit() {
    this.store.select('bills').subscribe((bills: BillQuery) => {
      this.billFeed = new BillFeed(bills);
    })
  }

  addBill() {
    this.billService.add(this.newBill).subscribe((bills) => {
       this.billFeed = new BillFeed(bills);
       this.newBill = new BillModel();
    })
  }

}
