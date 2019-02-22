export interface BillObject {
	id: string;
	title: string;
	description: string;
	amount: number;
	due_date: number;  // for now assume monthly and this is the date of the month
}

export interface BillQuery {
	count: number;
	results: BillObject[];
	next: boolean;
	previous: boolean;
}