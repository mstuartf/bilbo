export interface UserObject {
	id: number;
	email: string;
	password: string;
	monzoToken: string;
	monzoRefreshToken: string;
	mainAccountId: string;
	bilboPotId: string;
	potDepositDay: number;
	isActive: boolean;
	whitelisted: boolean;
}

export interface TokenObject {
	token: string;
}

export namespace UserPayloads {

	export interface Create {
	    email: string;
	    password: string;
	    monzoToken: null;
	    monzoRefreshToken: null;
		mainAccountId: null;
	    bilboPotId: null;
	    potDepositDay: number
	}

	export interface Update {
		id: number;
	    email: string;
	    password: string;
	    monzoToken: string;
	    monzoRefreshToken: string;
		mainAccountId: string;
	    bilboPotId: string;
	    potDepositDay: number
	    // isActive: boolean;
	}

	export interface Login {
		email: string;
	    password: string;
	}

}
