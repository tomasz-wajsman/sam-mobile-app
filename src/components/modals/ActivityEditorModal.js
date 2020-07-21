import React, { useState } from 'react';
import { Modal, Card, Button, Paragraph, Portal, TextInput } from 'react-native-paper';

import util from '../../util';

const ActivityEditorModal = ({ visible, editing, details, onConfirm, onDismiss }) => {
  // state
  const [input, setInput] = useState(
    {
      name: details.name || '',
      category: details.category || '',
      startDate: details.startDate || '',
      endDate: details.endDate || '',
      distance: details.distance || ''
    }
  );
  const handleInput = (field, value) => {
    const temp = { ...input };
    console.log(field, value);
    if (temp.hasOwnProperty(field)) {
      temp[field] = value;
      setInput(temp);
    }
  };

  if (visible) {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss}>
          <Card>
            <Card.Title title={editing ? "Editing an activity" : "Adding an activity"} />
            <Card.Content>
              <TextInput placeholder="Activity name" value={input.name} onChangeText={text => handleInput('name', text)} />
              <TextInput placeholder="Category" value={input.category} onChangeText={text => handleInput('category', text)} />
              <TextInput placeholder="Start date" value={input.startDate} onChangeText={text => handleInput('startDate', text)} />
              <TextInput placeholder="End date" value={input.endDate} onChangeText={text => handleInput('endDate', text)} />
              <TextInput placeholder="Distance" value={input.distance} onChangeText={text => handleInput('distance', text)} />
            </Card.Content>
            {
              editing
                ? <Button onPress={() => onConfirm(details['_id'], input)}>SAVE</Button>
                : <Button onPress={() => onConfirm(input)}>ADD</Button>
            }
            <Button onPress={onDismiss}>HIDE</Button>
          </Card>
        </Modal>
      </Portal>
    );
  }
  return <></>;
};
export default ActivityEditorModal;
