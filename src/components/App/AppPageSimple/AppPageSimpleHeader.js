import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

function AppPageSimpleHeader(props) {
	const mainThemeDark = useSelector(({ AppReducers }) => AppReducers.settings.mainThemeDark);

	return (
		<div className={props.classes.header}>
			{props.header && <ThemeProvider theme={mainThemeDark}>{props.header}</ThemeProvider>}
		</div>
	);
}

export default AppPageSimpleHeader;
