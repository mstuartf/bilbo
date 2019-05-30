import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-monzo-auth',
  templateUrl: './monzo-auth.component.html',
  styleUrls: ['./monzo-auth.component.less']
})
export class MonzoAuthComponent {

  constructor(
  	public dialogRef: MatDialogRef<MonzoAuthComponent>, 
  	@Inject(MAT_DIALOG_DATA) public authLink: string
  	) {}

    onCancel(): void {
      this.dialogRef.close();
    }

}
