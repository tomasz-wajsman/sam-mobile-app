import React from 'react';
import { View } from 'react-native';
import { List, Card, Button, IconButton } from 'react-native-paper';

import util from '../util';
import styles from '../styles';

const ActivitiesListItem = ({ details, onPressEdit, onDeleteActivity }) => {
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
          <List.Item title={`Start date: ${util.date.unixToDate(details.start_date)}`} />
          <List.Item title={`End date: ${util.date.unixToDate(details.end_date)}`} />
          {details.distance ? <List.Item title={`Distance: ${details.distance} meters`} /> : <></>}
        </List.Accordion>
        <View style={styles.layout.horizontal}>
          <IconButton icon="pencil" onPress={onPressEdit} />
          <IconButton icon="trash-can-outline" onPress={showDeleteAlert} />
        </View>
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
