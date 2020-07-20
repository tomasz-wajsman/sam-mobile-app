import React from 'react';
import { Modal, Card, Button, Paragraph, Portal } from 'react-native-paper';

import util from '../../util';

const ActivityDetailsModal = ({ visible, onEdit, onDismiss, details }) => {
  if (visible) {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss}>
          <Card>
            <Card.Title title={details.name} />
            <Card.Content>
              <Paragraph>{`Category: ${details.category || 'Uncategorized'}`}</Paragraph>
              <Paragraph>{`Start date: ${util.date.formatDateTime(details.startDate)}`}</Paragraph>
              <Paragraph>{`End date: ${util.date.formatDateTime(details.endDate)}`}</Paragraph>
              <Paragraph>{`Distance: ${details.distance ? `${details.distance} m` : 'N/A'}`}</Paragraph>
            </Card.Content>
            <Button onPress={() => onEdit(details['_id'])}>EDIT</Button>
            <Button onPress={onDismiss}>HIDE</Button>
          </Card>
        </Modal>
      </Portal>
    );
  }
  return <></>;
};
export default ActivityDetailsModal;
