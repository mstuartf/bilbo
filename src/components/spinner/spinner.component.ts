import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent {

	@Input() text: string;

}
