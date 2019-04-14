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
			title: 'Bill 1',
			description: 'NetFlix due on the 8th',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-02-10',
			amount: 9.99
		},
		{
			id: '2',
			user_id: '1',
			title: 'Bill 2',
			description: 'Spotify',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-12',
			amount: 9.99
		},
		{
			id: '3',
			user_id: '1',
			title: 'Bill 3',
			description: 'Council Tax',
			period: 'week',
			period_frequency: 2,
			first_payment_date: '2019-01-15',
			amount: 93
		},
		{
			id: '4',
			user_id: '2',
			title: 'Rent',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-08',
			amount: 725
		},
		{
			id: '5',
			user_id: '2',
			title: 'Council Tax',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-01',
			amount: 57.79
		},
		{
			id: '6',
			user_id: '2',
			title: 'Bulb',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-12',
			amount: 16.50
		},
		{
			id: '7',
			user_id: '2',
			title: 'Netflix',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-15',
			amount: 9.99
		},
		{
			id: '8',
			user_id: '2',
			title: 'Spotify',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-13',
			amount: 9.99
		},
		{
			id: '9',
			user_id: '2',
			title: 'Laptop',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-10',
			amount: 135
		},
		{
			id: '10',
			user_id: '2',
			title: 'The Times',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-04',
			amount: 2.17
		},
		{
			id: '11',
			user_id: '2',
			title: 'Phone Bill',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-01',
			amount: 16
		},
		{
			id: '12',
			user_id: '2',
			title: 'Christian Aid',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-08',
			amount: 5
		},
		{
			id: '13',
			user_id: '2',
			title: 'Unicef',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-08',
			amount: 5
		},
		{
			id: '14',
			user_id: '2',
			title: 'Credit Card',
			description: '',
			period: 'month',
			period_frequency: 1,
			first_payment_date: '2019-03-15',
			amount: 100
		},
		{
			id: '15',
			user_id: '2',
			title: 'Gleam',
			description: '',
			period: 'week',
			period_frequency: 2,
			first_payment_date: '2019-03-28',
			amount: 12
		}
    ]
}
