import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { BillModel } from '../../providers/bill/bill.model';

@Component({
  selector: 'app-new-bill-popup',
  templateUrl: './new-bill-popup.component.html',
  styleUrls: ['./new-bill-popup.component.less']
})
export class NewBillPopupComponent {

	public newBill: BillModel = new BillModel();

   constructor(public dialogRef: MatDialogRef<NewBillPopupComponent>) {}

    onConfirm(): void {
      this.dialogRef.close(this.newBill);
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }

}
