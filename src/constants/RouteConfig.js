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
		path: '/audio',
		exact: true,
		component: React.lazy(() => import('../components/About'))
	},
	{
		path: '/video',
		exact: true,
		component: React.lazy(() => import('../components/Services'))
	},
];

export default routes;