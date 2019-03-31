import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
  	BrowserAnimationsModule, 
  	MatInputModule, 
  	MatButtonModule, 
  	MatCardModule, 
  	MatToolbarModule, 
  	MatProgressSpinnerModule, 
  	MatDialogModule,
  	MatTableModule,
  	MatIconModule,
  	MatSortModule,
    MatSelectModule
  ],
  exports: [
  	BrowserAnimationsModule, 
  	MatInputModule, 
  	MatButtonModule, 
  	MatCardModule, 
  	MatToolbarModule, 
  	MatProgressSpinnerModule, 
  	MatDialogModule,
  	MatTableModule,
  	MatIconModule,
  	MatSortModule,
    MatSelectModule
  ]
})
export class MatModule { }
