import { BillQuery } from '../sections/internal/providers/bill/bill.interface';
import { UserObject } from '../sections/shared/providers/user/user.interface';
import { PotsQuery } from '../sections/internal/providers/pots/pots.interface';

export interface AppState {
	readonly bills: BillQuery;
	readonly user: UserObject;
	readonly pots: PotsQuery;
}
