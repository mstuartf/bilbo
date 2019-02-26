export let database = {
    users: [
    	{
            id: '1',
            email_address: 'mike@user.com',
            password: 'password!'
        },
        {
            id: '2',
            email_address: 'mike@another.com',
            password: 'password!'
        }
    ],
    bills: [
    	{
			id: '1',
			user_id: '1',
			title: 'Bill 1',
			description: 'NetFlix due on the 8th',
			due_date: 8,
			amount: 9.99
		},
		{
			id: '2',
			user_id: '1',
			title: 'Bill 2',
			description: 'Spotify',
			due_date: 12,
			amount: 9.99
		},
		{
			id: '3',
			user_id: '1',
			title: 'Bill 3',
			description: 'Council Tax',
			due_date: 3,
			amount: 93
		},
		{
			id: '4',
			user_id: '2',
			title: 'Bill 4',
			description: 'Rent',
			due_date: 9,
			amount: 725
		}
    ]
}
