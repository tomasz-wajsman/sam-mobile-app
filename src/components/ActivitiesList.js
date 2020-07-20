import React from 'react';
import { View } from 'react-native';
import { Card, Title, List } from 'react-native-paper';
import ActivitiesListItem from './ActivitiesListItem';

const ActivitiesList = ({ items, onPressItem }) => {
  return (
    <View>
      <Title>Activities</Title>
      <List.Section>
        <List.Accordion title="Activities">
          {
            items.map(activity => <ActivitiesListItem details={activity} onPress={onPressItem} />)
          }
        </List.Accordion>
      </List.Section>
    </View>
  );
};
export default ActivitiesList;
