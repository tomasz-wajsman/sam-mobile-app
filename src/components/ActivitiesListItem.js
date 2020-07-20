import React from 'react';
import { List } from 'react-native-paper';

const ActivitiesListItem = ({ details }) => {
  return (
    <>
      <List.Item title={details.name} />
    </>
  )
};
export default ActivitiesListItem;
