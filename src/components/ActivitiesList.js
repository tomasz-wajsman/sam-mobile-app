import React from 'react';
import { View } from 'react-native';
import { Card, Title, List, Button } from 'react-native-paper';
import ActivitiesListItem from './ActivitiesListItem';

const ActivitiesList = ({ items, onModify, onDeleteActivity }) => {
  const add = () => {
    onModify('add');
  };
  const modify = activityID => {
    onModify('edit', activityID);
  };
  return (
    <View>
      <Title>Activities</Title>
      {
        items.map(activity => 
        <ActivitiesListItem
          key={activity['_id']}
          details={activity}
          onPressEdit={() => modify(activity['_id'])}
          onDeleteActivity={onDeleteActivity}
        />)
      }
      <Button onPress={() => add()}>Add a new entry</Button>
    </View>
  );
};
export default ActivitiesList;
