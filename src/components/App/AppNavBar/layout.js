import clsx from 'clsx';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';

import AppScrollBars from '../AppScrollBars';

import Logo from '../Shared/Logo';
import NavbarFoldedToggleButton from '../Shared/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from '../Shared/NavbarMobileToggleButton';
import UserNavbarHeader from '../Shared/UserNavbarHeader';
import Navigation from '../Shared/Navigation';

const useStyles = makeStyles({
	content: {
		overflowX: 'hidden',
		overflowY: 'auto',
		'-webkit-overflow-scrolling': 'touch',
		background:
			'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '80% 40px, 80% 10px',
		backgroundAttachment: 'local, scroll'
	}
});

function NavbarLayout(props) {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<div className={clsx('flex flex-col overflow-hidden h-full', props.className)}>
			<AppBar
				color="primary"
				position="static"
				elevation={0}
				className="flex flex-row items-center flex-shrink h-58 min-h-58 px-12"
			>
				<div className="flex flex-1 mx-8">
					<Logo />
				</div>
				<div style={{ marginTop: '1.8px' }}>
					<Hidden mdDown>
						<NavbarFoldedToggleButton className="w-40 h-55 p-50" />
					</Hidden>
				</div>
				<Hidden lgUp>
					<NavbarMobileToggleButton className="w-40 h-40 p-0">
						<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}"</Icon>
					</NavbarMobileToggleButton>
				</Hidden>
			</AppBar>

			<AppScrollBars className={clsx(classes.content)} option={{ suppressScrollX: true }}>
				<UserNavbarHeader />

				<Navigation layout="vertical" />
			</AppScrollBars>
		</div>
	);
}

export default React.memo(NavbarLayout);
