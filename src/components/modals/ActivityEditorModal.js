import React, { useState } from 'react';
import { Modal, Card, Button, Paragraph, Portal, TextInput, HelperText } from 'react-native-paper';

import util from '../../util';

const defaults = {
  input: {
    name: '',
    category: '',
    startDate: '',
    endDate: '',
    distance: ''
  }, messages: {
    name: '',
    category: '',
    startDate: '',
    endDate: '',
    distance: ''
  }, inputCorrect: {
    name: false,
    category: false,
    startDate: true,
    endDate: true,
    distance: true
  }
};


const ActivityEditorModal = ({ visible, editing, details, onConfirm, onDismiss }) => {
  // state
  const [input, setInput] = useState(defaults.input);
  const [messages, setMessages] = useState(defaults.messages);
  const [inputCorrect, setInputCorrect] = useState(defaults.inputCorrect);

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
    const ic = { ...inputCorrect };
    const msg = { ...messages };
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

  const submitForm = () => {
    const correct = checkForm();
    if (!correct) {
      // form is incorrect, show an alert
      util.alert.showAlert('Error', 'Some of the inputs values are missing or incorrect. Check them and try again.');
    } else {
      if (editing) {
        // edit an existing activity
        onConfirm(details['_id'], input);
      } else {
        // add a new activity
        onConfirm(input);
        setInput(defaults.input);
      }
      // clean messages and errors
      setMessages(defaults.messages);
      setInputCorrect(defaults.inputCorrect);
    }
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
                ? <Button onPress={() => submitForm()}>SAVE</Button>
                : <Button onPress={() => submitForm()}>ADD</Button>
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
