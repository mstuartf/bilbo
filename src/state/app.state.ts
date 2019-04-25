import { BillQuery } from '../modules/internal/providers/bill/bill.interface';
import { UserObject } from '../modules/shared/providers/user/user.interface';
import { PotsQuery } from '../modules/internal/providers/pots/pots.interface';

export interface AppState {
	readonly bills: BillQuery;
	readonly user: UserObject;
	readonly pots: PotsQuery;
}
