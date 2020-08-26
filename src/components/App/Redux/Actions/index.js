import BusinessActions from '../../../../redux/actions';
import * as navbar from './navbar.actions';
import * as settings from './settings.actions';
import * as navigation from './navigation.actions';

const AppActions = {
    BusinessActions,
    navbar,
    settings,
    navigation,
}

export default AppActions;