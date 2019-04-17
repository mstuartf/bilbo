export type ValidBillPeriod = 'day' | 'week' | 'month' | 'year';

export interface BillObject {
	id: number;
	user_id: number;  // todo: delete this when backend plugged in
	name: string;
	amount: number;
	periodType: ValidBillPeriod;
	periodFrequency: number;
	startDate: number;
}

export interface BillQuery {
	count: number;
	results: BillObject[];
	next: boolean;
	previous: boolean;
}

export namespace BillPayloads {

	export interface Create {
		user_id: number;  // todo: delete this when backend plugged in
		name: string;
		amount: number;
		periodType: ValidBillPeriod;
		periodFrequency: number;
		startDate: number;
	}

}