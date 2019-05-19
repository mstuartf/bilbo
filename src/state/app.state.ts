import { BillData } from '../sections/internal/providers/bill/bill.interface';
import { UserObject } from '../sections/shared/providers/user/user.interface';
import { PotsQuery } from '../sections/internal/providers/pots/pots.interface';

export interface AppState {
	readonly bills: BillData;
	readonly user: UserObject;
	readonly pots: PotsQuery;
}
