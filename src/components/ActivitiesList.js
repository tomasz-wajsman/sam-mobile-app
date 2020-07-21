import React from 'react';
import { View } from 'react-native';
import { Card, Title, List, Button } from 'react-native-paper';
import ActivitiesListItem from './ActivitiesListItem';

const ActivitiesList = ({ items, onPressAdd, onPressDetails, onDeleteActivity }) => {
  return (
    <View>
      <Title>Activities</Title>
      {
        items.map(activity => 
        <ActivitiesListItem
          key={activity['_id']}
          details={activity}
          onPressDetails={onPressDetails}
          onDeleteActivity={onDeleteActivity}
        />)
      }
      <Button onPress={onPressAdd}>Add a new entry</Button>
    </View>
  );
};
export default ActivitiesList;
