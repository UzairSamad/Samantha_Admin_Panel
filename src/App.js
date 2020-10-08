import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';

import MomentUtils from '@date-io/moment';

import routes from './constants/RouteConfig';
import store from './store/store';

import AppTheme from './components/App/AppTheme';

import AppLayout from './components/App/Layout';
import AppContext from './AppContext';

const history = createBrowserHistory();

const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend(), rtl()],
    insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();

const App = () => {
    return (
        <AppContext.Provider value={{
            routes
        }}>
            <StylesProvider jss={jss} generateClassName={generateClassName}>
                <Provider store={store}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                   
                            <Router history={history}>
                                <AppTheme>
                                    <AppLayout />
                                </AppTheme>
                            </Router>
         
                    </MuiPickersUtilsProvider>
                </Provider>
            </StylesProvider>
        </AppContext.Provider>
    );
};

export default App;
