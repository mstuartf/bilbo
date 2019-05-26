import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

export interface BillSummary {
	billCount: number;
	periodCount: number;
	lastSalaryDate: moment.Moment;
	nextSalaryDate: moment.Moment;
}

@Component({
  selector: 'app-bill-summary',
  templateUrl: './bill-summary.component.html',
  styleUrls: ['./bill-summary.component.less']
})
export class BillSummaryComponent {

  constructor(
    public dialogRef: MatDialogRef<BillSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public config: BillSummary) {}

    close(): void {
      this.dialogRef.close(true);
    }

}
