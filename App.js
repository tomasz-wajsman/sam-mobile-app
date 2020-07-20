import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import ActivityScreen from './src/screens/ActivityScreen';

export default function App() {
  return (
    <View>
      <ActivityScreen />
    </View>
  );
}
