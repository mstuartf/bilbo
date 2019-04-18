import { BillQuery } from '../providers/bill/bill.interface';
import { UserObject } from '../providers/user/user.interface';
import { AccountsQuery } from '../providers/accounts/accounts.interface';

export interface AppState {
	readonly bills: BillQuery;
	readonly user: UserObject;
	readonly accounts: AccountsQuery;
}
