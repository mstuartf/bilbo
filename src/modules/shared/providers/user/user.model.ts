import { UserObject, UserPayloads } from './user.interface';

export class UserModel {

	id: number;
	emailAddress: string;
	password: string;
	monzoToken: string;
	monzoRefreshToken: string;
	mainAccountId: string;
	bilboPotId: string;
	potDepositDay: number;

	constructor(data?: UserObject) {
		if (data) {
			this.id = data.id;
			this.emailAddress = data.email;
			this.password = data.password;
			this.monzoToken = data.monzoToken;
			this.monzoRefreshToken = data.monzoRefreshToken;
			this.mainAccountId = data.mainAccountId;
			this.bilboPotId = data.bilboPotId;
			this.potDepositDay = data.potDepositDay;
		}
	}

	public get create(): UserPayloads.Create {
		return {
	    	email: this.emailAddress,
		    password: this.password,
		    monzoToken: null,
		    monzoRefreshToken: null,
			mainAccountId: null,
		    bilboPotId: null,
		    potDepositDay: this.potDepositDay
		}
	}

	public get update(): UserPayloads.Update {
		return {
			id: this.id,
	    	email: this.emailAddress,
		    password: this.password,
		    monzoToken: this.monzoToken,
		    monzoRefreshToken: this.monzoRefreshToken,
			mainAccountId: this.mainAccountId,
		    bilboPotId: this.bilboPotId,
		    potDepositDay: this.potDepositDay
		}
	}

	public get login(): UserPayloads.Login {
		return {
	    	email: this.emailAddress,
		    password: this.password
		}
	}

}
