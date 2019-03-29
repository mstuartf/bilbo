import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [BrowserAnimationsModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatProgressSpinnerModule],
  exports: [BrowserAnimationsModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatProgressSpinnerModule],
})
export class MatModule { }
