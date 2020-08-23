import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import  reducers  from '../redux/reducers';
import thunk from 'redux-thunk'
const composeEnhancers = compose;

const middleware = [
  promiseMiddleware,
  thunk
];

const store = createStore(reducers, composeWithDevTools(
    composeEnhancers(applyMiddleware(...middleware))
  ));

export default store;
