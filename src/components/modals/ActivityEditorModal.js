import React, { useState } from 'react';
import { Modal, Card, Button, Paragraph, Portal, TextInput, HelperText } from 'react-native-paper';

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

  const [messages, setMessages] = useState(
    {
      name: '',
      category: '',
      startDate: '',
      endDate: '',
      distance: ''
    }
  );
  const [inputCorrect, setInputCorrect] = useState(
    {
      name: false,
      category: false,
      startDate: true,
      endDate: true,
      distance: true
    }  
  );

  const handleInput = (field, value) => {
    const temp = { ...input };
    if (temp.hasOwnProperty(field)) {
      temp[field] = value;
      // validate the value
      validateInput(field, value);
      setInput(temp);
    }
  };

  const validateInput = (field, value) => {
    const ic = {...inputCorrect};
    const msg = {...messages};
    switch (field) {
      case 'name':
        if (value === '') {
          msg.name = 'Empty name';
          ic.name = false;
        } else {
          msg.name = '';
          ic.name = true;
        }
        // name
        break;
      case 'category':
        // category
        if (value === '') {
          msg.category = 'Empty category';
          ic.category = false;
        } else {
          msg.category = '';
          ic.category = true;
        }
        break;
      case 'distance':
        // distance
        if (value !== '') {
          const distanceNum = Number.parseInt(value);
          if (Number.isNaN(distanceNum)) {
            msg.distance = 'Incorrect distance format';
            ic.distance = false;
          } else if (distanceNum <= 0) {
            msg.distance = 'Negative or zeroth distance';
            ic.distance = false;
          } else {
            msg.distance = '';
            ic.distance = true;
          }
        }
        break;
    }
    setInputCorrect(ic);
    setMessages(msg);
  };

  const checkForm = () => {
    let correct = true;
    for (const [k, v] of Object.entries(inputCorrect)) {
      if (!v) {
        console.log(k)
        correct = false;
        break;
      }
    }
    return correct;
  };

  if (visible) {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss}>
          <Card>
            <Card.Title title={editing ? "Editing an activity" : "Adding an activity"} />
            <Card.Content>
              <TextInput
                placeholder="Activity name"
                value={input.name}
                onChangeText={text => handleInput('name', text)}
              />
              <HelperText type="error" visible={messages.name !== ''}>
                {messages.name}
              </HelperText>
              <TextInput
                placeholder="Category"
                value={input.category}
                onChangeText={text => handleInput('category', text)}
              />
              <HelperText type="error" visible={messages.category !== ''}>
                {messages.category}
              </HelperText>
              <TextInput
                placeholder="Start date"
                value={input.startDate}
                onChangeText={text => handleInput('startDate', text)}
              />
              <TextInput
                placeholder="End date"
                value={input.endDate}
                onChangeText={text => handleInput('endDate', text)}
              />
              <TextInput
                placeholder="Distance (optional)"
                value={input.distance}
                onChangeText={text => handleInput('distance', text)}
                keyboardType="numeric"
              />
              <HelperText type="error" visible={messages.distance !== ''}>
                {messages.distance}
              </HelperText>
            </Card.Content>
            {
              editing
                ? <Button onPress={() => checkForm()
                  ? onConfirm(details['_id'], input)
                  : util.alert.showAlert('Error', 'Some of the inputs values are missing or incorrect. Check them and try again.')
                }>SAVE</Button>
                : <Button onPress={() => checkForm()
                  ? onConfirm(input)
                  : util.alert.showAlert('Error', 'Some of the input values are missing or incorrect. Check them and try again.')
                }>ADD</Button>
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
