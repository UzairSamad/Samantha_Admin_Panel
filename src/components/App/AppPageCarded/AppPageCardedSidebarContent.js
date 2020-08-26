import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';

import AppScrollBars from '../AppScrollBars';

function AppPageCardedSidebarContent(props) {
	const mainThemeDark = useSelector(({ AppReducers }) => AppReducers.settings.mainThemeDark);

	const { classes } = props;

	return (
		<>
			{props.header && (
				<ThemeProvider theme={mainThemeDark}>
					<div className={clsx(classes.sidebarHeader, props.variant)}>{props.header}</div>
				</ThemeProvider>
			)}

			{props.content && (
				<AppScrollBars className={classes.sidebarContent} enable={props.innerScroll}>
					{props.content}
				</AppScrollBars>
			)}
		</>
	);
}

export default AppPageCardedSidebarContent;
