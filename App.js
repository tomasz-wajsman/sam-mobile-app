
import React from 'react';
import { View, StatusBar } from 'react-native';
import ActivityScreen from './src/screens/ActivityScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#ff9900'} />
      <ActivityScreen />
    </>
  );
}
