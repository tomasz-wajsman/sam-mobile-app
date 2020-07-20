import React from 'react';
import { List } from 'react-native-paper';

const ActivitiesListItem = ({ details, onPress }) => {
  return (
    <>
      <List.Item title={details.name} onPress={() => onPress(details['_id'])} />
    </>
  )
};
export default ActivitiesListItem;
