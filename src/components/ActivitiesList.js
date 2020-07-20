import React from 'react';
import { View } from 'react-native';
import { Card, Title, List, Button } from 'react-native-paper';
import ActivitiesListItem from './ActivitiesListItem';

const ActivitiesList = ({ items, onPressAdd, onPressDetails }) => {
  return (
    <View>
      <Title>Activities</Title>
      <List.Section>
        <List.Accordion title="Activities">
          {
            items.map(activity => <ActivitiesListItem key={activity['_id']} details={activity} onPressDetails={onPressDetails} />)
          }
        </List.Accordion>
      </List.Section>
      <Button onPress={onPressAdd}>Add a new entry</Button>
    </View>
  );
};
export default ActivitiesList;
