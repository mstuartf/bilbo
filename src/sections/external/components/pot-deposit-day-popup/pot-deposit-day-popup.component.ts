import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pot-deposit-day-popup',
  templateUrl: './pot-deposit-day-popup.component.html',
  styleUrls: ['./pot-deposit-day-popup.component.less']
})
export class PotDepositDayPopupComponent {

	// define form and getters so template can access controls
	public newBillForm = new FormGroup({
		potDepositDay: new FormControl('', [Validators.required])
	})

	get potDepositDay () {
		return this.newBillForm.get('potDepositDay');
	}

   constructor(public dialogRef: MatDialogRef<PotDepositDayPopupComponent>) {}

    onConfirm(): void {
      	this.dialogRef.close(this.potDepositDay.value);
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }

}
