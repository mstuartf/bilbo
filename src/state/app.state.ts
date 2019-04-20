import { BillQuery } from '../modules/internal/providers/bill/bill.interface';
import { UserObject } from '../modules/shared/providers/user/user.interface';
import { AccountsQuery } from '../modules/internal/providers/accounts/accounts.interface';

export interface AppState {
	readonly bills: BillQuery;
	readonly user: UserObject;
	readonly accounts: AccountsQuery;
}
