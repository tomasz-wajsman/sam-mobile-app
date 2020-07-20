
import React from 'react';
import { View, StatusBar } from 'react-native';
import ActivityScreen from './src/screens/ActivityScreen';
import { Provider } from 'react-native-paper';

export default function App() {
  return (
    <Provider>
      <StatusBar barStyle="dark-content" backgroundColor={'#ff9900'} />
      <ActivityScreen />
    </Provider>
  );
}
