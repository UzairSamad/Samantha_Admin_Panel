import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function AppTheme(props) {
	const mainTheme = useSelector(({ AppReducers }) => AppReducers.settings.mainTheme);
	const direction = useSelector(({ AppReducers }) => AppReducers.settings.defaults.direction);

	useEnhancedEffect(() => {
		document.body.dir = direction;
	}, [direction]);

	return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
}

export default React.memo(AppTheme);
