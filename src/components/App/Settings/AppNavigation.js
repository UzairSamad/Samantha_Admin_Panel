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
				id: 'about',
				title: 'About',
				translate: 'About',
				type: 'item',
				icon: 'dashboard',
				url: '/about',
			},
			{
				id: 'services',
				title: 'Services',
				translate: 'Services',
				type: 'item',
				icon: 'dashboard',
				url: '/services',
			},
			{
				id: 'portfolio',
				title: 'Portfolio',
				translate: 'Portfolio',
				type: 'item',
				icon: 'dashboard',
				url: '/portfolio',
			},
			{
				id: 'courses',
				title: 'Courses',
				translate: 'Courses',
				type: 'item',
				icon: 'dashboard',
				url: '/courses',
			},
			{
				id: 'contact Us',
				title: 'Contact US',
				translate: 'Contact US',
				type: 'item',
				icon: 'dashboard',
				url: '/contact',
			},
		]
	},
];

export default navigationConfig;
