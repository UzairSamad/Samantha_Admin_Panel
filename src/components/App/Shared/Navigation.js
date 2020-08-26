import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

import AppNavigation from '../AppNavigation';


function Navigation(props) {
	const navigation = useSelector(({ AppReducers }) => AppReducers.navigation);

	return (
		<AppNavigation
			className={clsx('navigation', props.className)}
			navigation={navigation}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
