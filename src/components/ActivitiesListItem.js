import React from 'react';
import { List } from 'react-native-paper';

const ActivitiesListItem = ({ details, onPressDetails }) => {
  return (
    <>
      <List.Item
        title={details.name}
        onPress={() => onPressDetails(details['_id'])}
        right={props => <List.Icon {...props} icon="star-box-outline" />}
      />
    </>
  )
};
export default ActivitiesListItem;
