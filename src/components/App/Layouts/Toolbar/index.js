import React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import firebaseconfig from '../../database'

import firebase from 'firebase'
import SuccesHandler from '../../Shared/SuccesHelper'

import NavbarMobileToggleButton from '../../Shared/NavbarMobileToggleButton';

const useStyles = makeStyles(theme => ({
	separator: {
		width: 1,
		height: 64,
		backgroundColor: theme.palette.divider
	}
}));

function ToolbarLayout(props) {
	const classes = useStyles(props);
	const config = useSelector(({ AppReducers }) => AppReducers.settings.current.layout.config);
	const toolbarTheme = useSelector(({ AppReducers }) => AppReducers.settings.toolbarTheme);

	const handleLogout = () => {
		// this.props.history.push('/login')
		firebase.auth().signOut().then(function () {
			// Sign-out successful.
			window.location = '/'
			localStorage.clear()

		}).catch(function (error) {
			// An error happened.
		});
	}

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="app-toolbar"
				className="flex relative z-10"
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.default }}
			>
				<div style={{ height: 50 }}>
					<Toolbar className="p-0">
						{config.navbar.display && config.navbar.position === 'left' && (
							<Hidden lgUp>
								<NavbarMobileToggleButton className="w-64 h-0 p-10" />
								<div className={classes.separator} />
							</Hidden>
						)}

						{/* <div className="flex flex-1">
							<Hidden mdDown>
								<FuseShortcuts className="px-16" />
							</Hidden>
						</div> */}

						<div className="flex">
							<div style={{ marginTop: '2.3%' }}>
								{/* <FormControlLabel
									// style={{ color: '#252525' }}
									control={
										<Switch
											checked={online}
											// onChange={(e)=>{
											// setOnline(true)
											// 	// console.log(e.target,'e.target.value')

											// }}
											onChange={setAgentOnline}
											name="online"
											color="primary"
										/>
									}
									label={online ? 'Go Offline' : 'Go Online'}
								/> */}
							</div>
							{/* <UserMenu /> */}
							<Button
								variant="contained"
								color="primary"
								// className={classes.submit}
								size="small"
								style={{ height: 'fit-content', marginLeft: '1050px', marginTop: '-11px' }}
								onClick={handleLogout}

							>
								LogOut
                       </Button>

							{/* <div className={classes.separator} /> */}

							{/* <FuseSearch /> */}

							{/* <div className={classes.separator} /> */}

							{/* <LanguageSwitcher /> */}

							{/* <div className={classes.separator} /> */}

							{/* <QuickPanelToggleButton /> */}

						</div>

						{config.navbar.display && config.navbar.position === 'right' && (
							<Hidden lgUp>
								<NavbarMobileToggleButton />

							</Hidden>
						)}
					</Toolbar>
				</div>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout);
