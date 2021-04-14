// import {createStore, applyMiddleware, combineReducers} from 'redux';
// import reducers from './reducers/index';
// import thunk from 'redux-thunk';

// const middlewares = applyMiddleware(thunk);
// const mainReducer = combineReducers(reducers);
// export const store = createStore(mainReducer, {}, middlewares);

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-community/async-storage';
// import SyncStorage from 'sync-storage';
// import logger from 'redux-logger';

const middleware = applyMiddleware(thunk);

const persistedConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['authReducer', 'userReducer', 'homeReducer'],
  // blacklist: ['userReducer', 'homeReducer'],
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persister = persistStore(store);

export {store, persister};
