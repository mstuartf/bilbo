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
            salary_date: 3
        },
        {
            id: '2',
            email_address: 'mike@another.com',
            password: 'password!',
            salary_date: null
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
			title: 'Bill 4',
			description: 'Rent',
			period: 'day',
			period_frequency: 30,
			first_payment_date: '2019-03-19',
			amount: 725
		}
    ]
}
