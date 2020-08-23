import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Orders from './components/Orders';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Orders} />
                    {/* <Route path="/:id">
            <Route exact path="/:id" component={MainComponent} />
            <Route exact path="/:id/to" component={ToComponent} />
            <Route exact path="/:id/from" component={FromComponent} />
            <Route exact path="/:id/to/edit" component={EditComponent} />
          </Route> */}
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
