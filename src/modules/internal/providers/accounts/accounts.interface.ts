export interface AccountObject {
	description: string;
	type: string;
	id: string;
}

export interface AccountsQuery {
	accounts: AccountObject[]
}
