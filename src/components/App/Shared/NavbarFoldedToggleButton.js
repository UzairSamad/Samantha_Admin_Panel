import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import AppActions from '../Redux/Actions';

function NavbarFoldedToggleButton(props) {
	const dispatch = useDispatch();
	const settings = useSelector(({ AppReducers }) => AppReducers.settings.current);

	return (
		<IconButton
			className={props.className}
			onClick={() => {
				dispatch(
					AppActions.settings.setDefaultSettings(
						_.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
					)
				);
			}}
			color="inherit"
		>
			{props.children}
		</IconButton>
	);
}

NavbarFoldedToggleButton.defaultProps = {
	children: <Icon>menu</Icon>
};

export default NavbarFoldedToggleButton;
