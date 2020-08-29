import React from 'react';
import { Redirect } from 'react-router-dom';

import { utils } from '../helpers';

const routes = [
	{
		path: '/',
		exact: true,
		component: React.lazy(() => import('../components/Dashboard'))
	},
	{
		path: '/orders',
		exact: true,
		component: React.lazy(() => import('../components/Orders'))
	},
	{
		path: '/clients',
		exact: true,
		component: React.lazy(() => import('../components/Clients'))
	},
	{
		path: '/serviceIndustries',
		exact: true,
		component: React.lazy(() => import('../components/ServiceIndustries'))
	},
	{
		path: '/serviceCategories',
		exact: true,
		component: React.lazy(() => import('../components/ServiceCategories'))
	}
];

export default routes;