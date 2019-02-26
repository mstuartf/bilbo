import { BillQuery } from '../providers/bill/bill.interface';
import { UserObject } from '../providers/user/user.interface';

export interface AppState {
	readonly bills: BillQuery;
	readonly user: UserObject;
}
