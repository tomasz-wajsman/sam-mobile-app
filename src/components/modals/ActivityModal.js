import React from 'react';
import { Modal, Card, Button, Paragraph } from 'react-native-paper';

import util from '../../util';

const ActivityModal = ({ visible, onDismiss, details }) => {
  if (visible) {
    return (
      <Modal visible={visible} onDismiss={onDismiss}>
        <Card>
          <Card.Title title={details.name} />
          <Card.Content>
          <Paragraph>{`Category: ${details.category || 'Uncategorized'}`}</Paragraph>
          <Paragraph>{`Start date: ${util.date.formatDateTime(details.startDate)}`}</Paragraph>
          <Paragraph>{`End date: ${util.date.formatDateTime(details.endDate)}`}</Paragraph>
          <Paragraph>{`Distance: ${details.distance ? `${details.distance} m` : 'N/A'}`}</Paragraph>
          </Card.Content>
          <Button onPress={onDismiss}>HIDE</Button>
        </Card>
      </Modal>
    );
  }
  return <></>;
};
export default ActivityModal;
