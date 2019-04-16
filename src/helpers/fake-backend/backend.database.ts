import { BillObject } from '../../providers/bill/bill.interface';
import { UserObject } from '../../providers/user/user.interface';


interface Database {
	users: UserObject[];
	bills: BillObject[];
}


export let database: Database = {
    users: [
    	{
            id: '1',
            email_address: 'mike@user.com',
            password: 'password!',
            salary_date: 3,
            monzo_auth: false
        },
        {
            id: '2',
            email_address: 'mike@another.com',
            password: 'password!',
            salary_date: 28,
            monzo_auth: false
        }
    ],
    bills: [
    	{
			id: '1',
			user_id: '1',
			title: 'Netflix',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-02-10',
			amount: 9.99
		},
		{
			id: '2',
			user_id: '1',
			title: 'Spotify',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-12',
			amount: 9.99
		},
		{
			id: '3',
			user_id: '1',
			title: 'Council Tax',
			period: 'week',
			period_frequency: 2,
			first_payment_date: '2019-01-15',
			amount: 93
		},
		{
			id: '4',
			user_id: '2',
			title: 'Rent',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-08',
			amount: 725
		},
		{
			id: '5',
			user_id: '2',
			title: 'Council Tax',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-01',
			amount: 57.79
		},
		{
			id: '6',
			user_id: '2',
			title: 'Bulb',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-12',
			amount: 16.50
		},
		{
			id: '7',
			user_id: '2',
			title: 'Netflix',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-15',
			amount: 9.99
		},
		{
			id: '8',
			user_id: '2',
			title: 'Spotify',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-13',
			amount: 9.99
		},
		{
			id: '9',
			user_id: '2',
			title: 'Laptop',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-10',
			amount: 135
		},
		{
			id: '10',
			user_id: '2',
			title: 'The Times',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-04',
			amount: 2.17
		},
		{
			id: '11',
			user_id: '2',
			title: 'Phone Bill',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-01',
			amount: 16
		},
		{
			id: '12',
			user_id: '2',
			title: 'Christian Aid',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-08',
			amount: 5
		},
		{
			id: '13',
			user_id: '2',
			title: 'Unicef',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-08',
			amount: 5
		},
		{
			id: '14',
			user_id: '2',
			title: 'Credit Card',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-15',
			amount: 100
		},
		{
			id: '15',
			user_id: '2',
			title: 'Gleam',
			period: 'week',
			period_frequency: 2,
			first_payment_date: '2019-03-28',
			amount: 12
		}
    ]
}
