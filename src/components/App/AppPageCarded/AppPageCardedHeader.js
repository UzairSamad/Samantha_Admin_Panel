import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';

function AppPageCardedHeader(props) {
	const mainThemeDark = useSelector(({ AppReducers }) => AppReducers.settings.mainThemeDark);

	return (
		<div className={props.classes.header}>
			{props.header && <ThemeProvider theme={mainThemeDark}>{props.header}</ThemeProvider>}
		</div>
	);
}

export default AppPageCardedHeader;
