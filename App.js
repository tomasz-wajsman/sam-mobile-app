
import React from 'react';
import { View, StatusBar } from 'react-native';
import ActivityScreen from './src/screens/ActivityScreen';

import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import store from './src/store';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <StatusBar barStyle="dark-content" backgroundColor={'#ff9900'} />
        <ActivityScreen />
      </PaperProvider>
    </ReduxProvider>
  );
}
