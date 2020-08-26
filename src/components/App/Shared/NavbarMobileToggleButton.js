import React from 'react';
import { useDispatch } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import AppActions from '../Redux/Actions';

function NavbarMobileToggleButton(props) {
	const dispatch = useDispatch();

	return (
		<IconButton
			style={{marginTop:'-10px'}}
			onClick={ev => dispatch(AppActions.navbar.navbarToggleMobile())}
			color="inherit"
			disableRipple
		>
			{props.children}
		</IconButton>
	);
}

NavbarMobileToggleButton.defaultProps = {
	children: <Icon>menu</Icon>
};

export default NavbarMobileToggleButton;
