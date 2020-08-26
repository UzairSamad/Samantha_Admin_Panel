const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'Navigation',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				translate: 'Dashboard',
				type: 'item',
				icon: 'dashboard',
				url: '/dashboard',
			},
			{
				id: 'orders',
				title: 'orders',
				translate: 'orders',
				type: 'item',
				icon: 'dashboard',
				url: '/orders',
			},
		]
	},
];

export default navigationConfig;
