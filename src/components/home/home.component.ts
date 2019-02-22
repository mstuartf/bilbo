import { Component, OnInit } from '@angular/core';

import { BillService } from '../../providers/bill/bill.service';
import { BillFeed, BillModel } from '../../providers/bill/bill.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  billFeed: BillFeed;
  newBill: BillModel = new BillModel();

  constructor(public billService: BillService) { }

  ngOnInit() {
    this.fetchBills();
  }

  fetchBills() {
  	this.billService.query().subscribe((bills) => {
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
