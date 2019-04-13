export type ValidBillPeriod = 'day' | 'week' | 'month';

export interface BillObject {
	id: string;
	user_id: string;
	title: string;
	description: string;
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
