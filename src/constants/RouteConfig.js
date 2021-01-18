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
		component: React.lazy(() => import('../components/Audio'))
	},
	{
		path: '/video',
		exact: true,
		component: React.lazy(() => import('../components/Video'))
	},
	{
		path: '/packages',
		exact: true,
		component: React.lazy(() => import('../components/Packages'))
	},
	{
		path: '/users',
		exact: true,
		component: React.lazy(() => import('../components/Users'))
	},
	{
		path: '/freevies',
		exact: true,
		component: React.lazy(() => import('../components/FreeViees'))
	},
];

export default routes;