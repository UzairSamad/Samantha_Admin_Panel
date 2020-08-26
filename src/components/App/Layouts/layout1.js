import clsx from 'clsx';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { makeStyles } from '@material-ui/core/styles';

// import FuseDialog from '@fuse/core/FuseDialog';
// import FuseMessage from '@fuse/core/FuseMessage';
import AppScrollBars from '../AppScrollBars';
import AppSuspense from '../AppSuspense';

import FooterLayout from './Footer';
import LeftSidePanelLayout from './LeftSidePanelLayout';
import AppNavbarWrapper from '../AppNavBar/wrapper';
import RightSidePanelLayout from './RightSidePanelLayout';
import ToolbarLayout from './Toolbar';

import AppContext from '../../../AppContext';
// import SettingsPanel from 'app/fuse-layouts/shared-components/SettingsPanel';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			boxShadow: theme.shadows[3]
		},
		'&.scroll-body': {
			'& $wrapper': {
				height: 'auto',
				flex: '0 0 auto',
				overflow: 'auto'
			},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'&.scroll-content': {
			'& $wrapper': {},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'& .navigation': {
			'& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	wrapper: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		height: '100%',
		flex: '1 1 auto'
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		zIndex: 3,
		overflow: 'hidden',
		flex: '1 1 auto'
	},
	content: {
		position: 'relative',
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 2
	}
}));

function Layout1(props) {
	const config = useSelector(({ AppReducers }) => AppReducers.settings.current.layout.config);

	const appContext = useContext(AppContext);
	const classes = useStyles(props);
	const { routes } = appContext;

	switch (config.scroll) {
		case 'body': {
			return (
				<div id="app-layout" className={clsx(classes.root, config.mode, `scroll-${config.scroll}`)}>
					{/* {config.leftSidePanel.display && <LeftSidePanelLayout />} */}

					<div className="flex flex-1 flex-col overflow-hidden relative">
						{config.toolbar.display &&
							config.toolbar.style === 'fixed' &&
							config.toolbar.position === 'above' && <ToolbarLayout />}

						<AppScrollBars className="overflow-auto" scrollToTopOnRouteChange>
							{config.toolbar.display &&
								config.toolbar.style !== 'fixed' &&
								config.toolbar.position === 'above' && <ToolbarLayout />}

							<div className={classes.wrapper}>
								{config.navbar.display && config.navbar.position === 'left' && <AppNavbarWrapper />}

								<div className={classes.contentWrapper}>
									{config.toolbar.display && config.toolbar.position === 'below' && (
										<ToolbarLayout />
									)}

									<div className={classes.content}>
										{/* <FuseDialog /> */}

										<AppSuspense>{renderRoutes(routes)}</AppSuspense>

										{props.children}
									</div>

									{config.footer.display && config.footer.position === 'below' && <FooterLayout />}

									{/* <SettingsPanel /> */}
								</div>

								{config.navbar.display && config.navbar.position === 'right' && (
									<AppNavbarWrapper />
								)}
							</div>

							{config.footer.display &&
								config.footer.style !== 'fixed' &&
								config.footer.position === 'above' && <FooterLayout />}
						</AppScrollBars>

						{config.footer.display &&
							config.footer.style === 'fixed' &&
							config.footer.position === 'above' && <FooterLayout />}
					</div>

					{/* {config.rightSidePanel.display && <RightSidePanelLayout />} */}

					{/* <FuseMessage /> */}
				</div>
			);
		}
		case 'content':
		default: {
			return (
				<div id="app-layout" className={clsx(classes.root, config.mode, `scroll-${config.scroll}`)}>
					{config.leftSidePanel.display && <LeftSidePanelLayout />}

					<div className="flex flex-1 flex-col overflow-hidden relative">
						{config.toolbar.display && config.toolbar.position === 'above' && <ToolbarLayout />}

						<div className={classes.wrapper}>
							{config.navbar.display && config.navbar.position === 'left' && <AppNavbarWrapper />}

							<div className={classes.contentWrapper}>
								{config.toolbar.display &&
									config.toolbar.position === 'below' &&
									config.toolbar.style === 'fixed' && <ToolbarLayout />}

								<AppScrollBars className={classes.content} scrollToTopOnRouteChange>
									{config.toolbar.display &&
										config.toolbar.position === 'below' &&
										config.toolbar.style !== 'fixed' && <ToolbarLayout />}

									{/* <FuseDialog /> */}

									<AppSuspense>{renderRoutes(routes)}</AppSuspense>

									{props.children}

									{config.footer.display &&
										config.footer.position === 'below' &&
										config.footer.style !== 'fixed' && <FooterLayout />}
								</AppScrollBars>

								{config.footer.display &&
									config.footer.position === 'below' &&
									config.footer.style === 'fixed' && <FooterLayout />}

								{/* <SettingsPanel /> */}
							</div>

							{config.navbar.display && config.navbar.position === 'right' && <AppNavbarWrapper />}
						</div>

						{config.footer.display && config.footer.position === 'above' && <FooterLayout />}
					</div>

					{config.rightSidePanel.display && <RightSidePanelLayout />}

					{/* <FuseMessage /> */}
				</div>
			);
		}
	}
}

export default React.memo(Layout1);
