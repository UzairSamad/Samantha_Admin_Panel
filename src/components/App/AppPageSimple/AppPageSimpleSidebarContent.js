import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';

import AppScrollBars from '../AppScrollBars';

function AppPageSimpleSidebarContent(props) {
	const mainThemeDark = useSelector(({ AppReducers }) => AppReducers.settings.mainThemeDark);

	const { classes } = props;

	return (
		<AppScrollBars enable={props.innerScroll}>
			{props.header && (
				<ThemeProvider theme={mainThemeDark}>
					<div
						className={clsx(
							classes.sidebarHeader,
							props.variant,
							props.sidebarInner && classes.sidebarHeaderInnerSidebar
						)}
					>
						{props.header}
					</div>
				</ThemeProvider>
			)}

			{props.content && <div className={classes.sidebarContent}>{props.content}</div>}
		</AppScrollBars>
	);
}

export default AppPageSimpleSidebarContent;
