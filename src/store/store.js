import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import { reducers } from '../redux';

const composeEnhancers = compose;

const store = createStore(reducers, composeWithDevTools(
    composeEnhancers(applyMiddleware(promiseMiddleware))
  ));

export default store;
