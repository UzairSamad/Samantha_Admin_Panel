import React from 'react';
import { Redirect } from 'react-router-dom';



const routes = [
	{
		path: '/',
		exact: true,
		component: React.lazy(() => import('../components/Login/index'))
	},
	{
		path: '/dashboard',
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
	},
	{
		path: '/product',
		exact: true,
		component: React.lazy(() => import('../components/products'))
	},
	{
		path: '/login',
		exact: true,
		component: React.lazy(() => import('../components/Login/index'))
	}
];

export default routes;