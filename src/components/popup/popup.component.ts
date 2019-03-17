import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit {

	@Input() title: string;
	@Input() message: string;
	@Input() confirm: string;
	@Input() cancel: string;

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
