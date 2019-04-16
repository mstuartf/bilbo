import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BillModel } from '../../providers/bill/bill.model';

@Component({
  selector: 'app-new-bill-popup',
  templateUrl: './new-bill-popup.component.html',
  styleUrls: ['./new-bill-popup.component.less']
})
export class NewBillPopupComponent {

	// define form and getters so template can access controls
	public newBillForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		firstPaymentDate: new FormControl(new Date, [Validators.required]),
		period: new FormControl('', [Validators.required]),
		periodFrequency: new FormControl('', [Validators.required]),
		amount: new FormControl('', [Validators.required])
	})

	get title () {
		return this.newBillForm.get('title');
	}

	get firstPaymentDate () {
		return this.newBillForm.get('firstPaymentDate');
	}

	get period () {
		return this.newBillForm.get('period');
	}

	get periodFrequency () {
		return this.newBillForm.get('periodFrequency');
	}

	get amount () {
		return this.newBillForm.get('amount');
	}

   constructor(public dialogRef: MatDialogRef<NewBillPopupComponent>) {}

    onConfirm(): void {
    	const newBill = new BillModel();
    	newBill.title = this.title.value;
    	newBill.period = this.period.value;
    	newBill.periodFrequency = this.periodFrequency.value;
    	newBill.firstPaymentDate = this.firstPaymentDate.value;
    	newBill.amount = this.amount.value;
      	this.dialogRef.close(newBill);
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }

}
