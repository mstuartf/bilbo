import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [BrowserAnimationsModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatProgressSpinnerModule, MatDialogModule],
  exports: [BrowserAnimationsModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatProgressSpinnerModule, MatDialogModule],
})
export class MatModule { }
