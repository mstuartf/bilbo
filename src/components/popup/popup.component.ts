import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { PopupConfig } from './popup-config.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent {

   constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public config: PopupConfig) {}

    onConfirm(): void {
      this.dialogRef.close(true);
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }

}
