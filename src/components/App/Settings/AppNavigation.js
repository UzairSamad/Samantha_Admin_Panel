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
				title: 'Home',
				translate: 'Home',
				type: 'item',
				icon: 'dashboard',
				url: '/dashboard',
			},
			{
				id: 'orders',
				title: 'About',
				translate: 'About',
				type: 'item',
				icon: 'dashboard',
				url: '/orders',
			},
		]
	},
];

export default navigationConfig;
