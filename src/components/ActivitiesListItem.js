import React from 'react';
import { List, Card, Button, IconButton } from 'react-native-paper';
import util from '../util';

const ActivitiesListItem = ({ details, onDeleteActivity }) => {
  const showDeleteAlert = () => {
    util.alert.showAlert(
      'Delete an activity',
      'Do you wish to delete an activity? It will not be longer available',
      [
        { text: 'No, keep it' },
        { text: 'Yes, delete it', onPress: () => onDeleteActivity(details['_id']) }
      ]
    );
  };
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
        <IconButton icon="trash-can-outline" onPress={showDeleteAlert} />
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
