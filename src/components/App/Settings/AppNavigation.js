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
			{
				id: 'orders',
				title: 'Portfolio',
				translate: 'Portfolio',
				type: 'item',
				icon: 'dashboard',
				url: '/orders',
			},
			{
				id: 'orders',
				title: 'Contact US',
				translate: 'Contact US',
				type: 'item',
				icon: 'dashboard',
				url: '/orders',
			},
		]
	},
];

export default navigationConfig;
