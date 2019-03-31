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
		description: new FormControl('', []),
		dueDate: new FormControl('', [Validators.required]),
		amount: new FormControl('', [Validators.required])
	})

	get title () {
		return this.newBillForm.get('title');
	}

	get description () {
		return this.newBillForm.get('description');
	}

	get dueDate () {
		return this.newBillForm.get('dueDate');
	}

	get amount () {
		return this.newBillForm.get('amount');
	}

   constructor(public dialogRef: MatDialogRef<NewBillPopupComponent>) {}

    onConfirm(): void {
    	const newBill = new BillModel();
    	newBill.title = this.title.value;
    	newBill.description = this.description.value;
    	newBill.dueDate = this.dueDate.value;
    	newBill.amount = this.amount.value;
      	this.dialogRef.close(newBill);
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }

}
