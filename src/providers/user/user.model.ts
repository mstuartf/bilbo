import { UserObject } from './user.interface';

export class UserModel {

	id: string;
	emailAddress: string;
	password: string;
	salaryDate: number;
	monzoAuth: boolean;

	constructor(data?: UserObject) {
		if (data) {
			this.id = data.id;
			this.emailAddress = data.email_address;
			this.password = data.password;
			this.salaryDate = data.salary_date;
			this.monzoAuth = data.monzo_auth;
		}
	}

	getData() {
		return {
			id: null,
			email_address: this.emailAddress,
			password: this.password,
			salary_date: this.salaryDate
		}
	}

}
