import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupConfig } from './popup-config.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit {

	@Input() config: PopupConfig;

	@Output() onConfirm = new EventEmitter();
	@Output() onCancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  triggerOnConfirm() {
  	this.onConfirm.emit();
  }

  triggerOnCancel() {
  	this.onCancel.emit();
  }

}
