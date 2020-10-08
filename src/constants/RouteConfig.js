import React from 'react';
import { Redirect } from 'react-router-dom';



const routes = [
	{
		path: '/',
		exact: true,
		component: React.lazy(() => import('../components/Dashboard'))
	},
	{
		path: '/about',
		exact: true,
		component: React.lazy(() => import('../components/About'))
	},
	{
		path: '/services',
		exact: true,
		component: React.lazy(() => import('../components/Services'))
	},
	{
		path: '/portfolio',
		exact: true,
		component: React.lazy(() => import('../components/Portfolio'))
	},
	{
		path: '/courses',
		exact: true,
		component: React.lazy(() => import('../components/Courses'))
	},
	{
		path: '/contact',
		exact: true,
		component: React.lazy(() => import('../components/Contact'))
	}
];

export default routes;