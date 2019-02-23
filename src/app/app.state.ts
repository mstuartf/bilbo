import { BillQuery } from '../providers/bill/bill.interface';

export interface AppState {
	readonly bills: BillQuery
}
