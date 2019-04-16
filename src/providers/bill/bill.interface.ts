export type ValidBillPeriod = 'day' | 'week' | 'month' | 'year';

export interface BillObject {
	id: number;
	user_id: number;
	title: string;
	amount: number;
	period: ValidBillPeriod;
	period_frequency: number;
	first_payment_date: string;
}

export interface BillQuery {
	count: number;
	results: BillObject[];
	next: boolean;
	previous: boolean;
}
