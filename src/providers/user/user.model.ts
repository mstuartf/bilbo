import { UserObject } from './user.interface';

export class UserModel {

	id: string;
	emailAddress: string;
	password: string;

	constructor(data?: UserObject) {
		if (data) {
			this.id = data.id;
			this.emailAddress = data.email_address;
			this.password = data.password;
		}
	}

	getData() {
		return {
			id: null,
			email_address: this.emailAddress,
			password: this.password
		}
	}

}
