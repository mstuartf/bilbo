import { BillObject } from '../../providers/bill/bill.interface';
import { UserObject } from '../../providers/user/user.interface';


interface Database {
	users: UserObject[];
	bills: BillObject[];
}


export let database: Database = {
    users: [
    	{
            id: 1,
            email: 'mike@user.com',
            password: 'password!',
            potDepositDay: 3,
            monzoToken: null,
		    monzoRefreshToken: null,
			mainAccountId: null,
		    bilboPotId: null,
        },
        {
            id: 2,
            email: 'mike@another.com',
            password: 'password!',
            potDepositDay: 28,
            monzoToken: null,
		    monzoRefreshToken: null,
			mainAccountId: null,
		    bilboPotId: null,
        }
    ],
    bills: [
    	{
			id: 1,
			user_id: 1,
			name: 'Netflix',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 9.99
		},
		{
			id: 2,
			user_id: 1,
			name: 'Spotify',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 9.99
		},
		{
			id: 3,
			user_id: 1,
			name: 'Council Tax',
			periodType: 'week',
			periodFrequency: 2,
			startDate: 1555542000,
			amount: 93
		},
		{
			id: 4,
			user_id: 2,
			name: 'Rent',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 725
		},
		{
			id: 5,
			user_id: 2,
			name: 'Council Tax',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 57.79
		},
		{
			id: 6,
			user_id: 2,
			name: 'Bulb',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 16.50
		},
		{
			id: 7,
			user_id: 2,
			name: 'Netflix',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 9.99
		},
		{
			id: 8,
			user_id: 2,
			name: 'Spotify',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 9.99
		},
		{
			id: 9,
			user_id: 2,
			name: 'Laptop',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 135
		},
		{
			id: 10,
			user_id: 2,
			name: 'The Times',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 2.17
		},
		{
			id: 11,
			user_id: 2,
			name: 'Phone Bill',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 16
		},
		{
			id: 12,
			user_id: 2,
			name: 'Christian Aid',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 5
		},
		{
			id: 13,
			user_id: 2,
			name: 'Unicef',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 5
		},
		{
			id: 14,
			user_id: 2,
			name: 'Credit Card',
			periodType: 'month',
			periodFrequency: 1,
			startDate: 1555542000,
			amount: 100
		},
		{
			id: 15,
			user_id: 2,
			name: 'Gleam',
			periodType: 'week',
			periodFrequency: 2,
			startDate: 1555542000,
			amount: 12
		}
    ]
}
