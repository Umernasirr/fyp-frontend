import {AppRegistry} from 'react-native';
import React, {useEffect} from 'react';
import App from './App';
import {name as appName} from './app.json';
import {store, persister} from './src/store';
import {connect, Provider} from 'react-redux';
import syncStorage from 'sync-storage';
import {PersistGate} from 'redux-persist/src/integration/react';

const Root = () => {
  useEffect(() => {
    initializeStorage();
  }, []);
  const initializeStorage = async () => {
    const data = await syncStorage.init();
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
