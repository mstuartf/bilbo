import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormControl, Validators } from '@angular/forms';

interface DialogData {
	dateFilter: Date;
}
@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.less']
})
export class DateFilterComponent {

	// define form and getters so template can access controls
	public filterDateForm = new FormGroup({
		filterDate: new FormControl(this.data.dateFilter, [Validators.required])
	})

	get filterDate () {
		return this.filterDateForm.get('filterDate');
	}

   constructor(public dialogRef: MatDialogRef<DateFilterComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onConfirm(): void {
      	this.dialogRef.close(this.filterDate.value);
    }

    onCancel(): void {
      this.dialogRef.close(null);
    }

}
