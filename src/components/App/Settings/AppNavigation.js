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
				id: 'video',
				title: 'Video',
				translate: 'Video',
				type: 'item',
				icon: 'dashboard',
				url: '/video',
			},
			{
				id: 'audio',
				title: 'Audio',
				translate: 'Audio',
				type: 'item',
				icon: 'dashboard',
				url: '/audio',
			},
			{
				id: 'package',
				title: 'Pacakages',
				translate: 'Packages',
				type: 'item',
				icon: 'dashboard',
				url: '/packages',
			},
		]
	},
];

export default navigationConfig;
