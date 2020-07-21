import React from 'react';
import { List, Card } from 'react-native-paper';
import util from '../util';

const ActivitiesListItem = ({ details, onPressDetails }) => {
  console.log(details)
  return (
    <Card>
      <Card.Title title={details.name || "Default title"} />
      <Card.Content>
        <List.Accordion title={"Details"}>
        <List.Item title={`Category: ${details.category || "uncategorized"}`} />
        <List.Item title={`Start date: ${util.date.formatDateTime(details.startDate)}`} />
        <List.Item title={`End date: ${util.date.formatDateTime(details.endDate)}`} />
        { details.distance ? <List.Item title={`Distance: ${details.distance} meters`} /> : <></>}
        </List.Accordion>
      </Card.Content>
    </Card>
    /*
      <List.Item
        title={details.name}
        onPress={() => onPressDetails(details['_id'])}
        right={props => <List.Icon {...props} icon="pencil" />}
      />
    */
  );
};
export default ActivitiesListItem;
