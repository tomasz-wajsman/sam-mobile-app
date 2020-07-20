import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';
import ActivitiesList from '../components/ActivitiesList';

const ActivityScreen = () => {
  return (
    <View style={styles.layout.container}>
      <ActivitiesList />
    </View>
  )
};
export default ActivityScreen;
