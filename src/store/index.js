import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';

const middlewares = applyMiddleware(thunk);
const mainReducer = combineReducers(reducers);
export const store = createStore(mainReducer, {}, middlewares);
