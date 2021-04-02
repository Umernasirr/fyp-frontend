import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/src/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';

// import {store, persister} from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    // <Provider store={store}>
    // <PersistGate persistor={persister}>
    <NavigationContainer>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </NavigationContainer>
    // </PersistGate>
    // </Provider>
  );
}
