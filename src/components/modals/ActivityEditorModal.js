import React, { useState } from 'react';
import { Modal, Card, Button, Paragraph, Portal, TextInput, HelperText } from 'react-native-paper';

import util from '../../util';
import TextInputWithHelper from '../input/TextInput';

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
    const dtRegex = new RegExp(/^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/);
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
      case 'startDate':
        // start date
        if (value === '') {
          msg.startDate = 'Start date is empty';
          ic.startDate = false;
        } else if (!dtRegex.test(value)) {
          msg.startDate = 'Start date is incorrect';
          ic.startDate = false;
        } else {
          msg.startDate = '';
          ic.startDate = true;
        }
        break;
      case 'endDate':
        // category
        if (value === '') {
          msg.endDate = 'End date is empty';
          ic.endDate = false;
        } else if (!dtRegex.test(value)) {
          msg.endDate = 'End date is incorrect';
          ic.endDate = false;
        } else {
          msg.endDate = '';
          ic.endDate = true;
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
              <TextInputWithHelper
                value={input.name}
                placeholder="Activity name"
                onChangeText={text => handleInput('name', text)}
                helperVisible={!inputCorrect.name}
                helperType={'error'}
                helperText={messages.name}
              />
              <TextInputWithHelper
                value={input.category}
                placeholder="Category name"
                onChangeText={text => handleInput('category', text)}
                helperVisible={!inputCorrect.category}
                helperType={'error'}
                helperText={messages.category}
              />
              <TextInputWithHelper
                value={input.startDate}
                placeholder="Start date"
                onChangeText={text => handleInput('startDate', text)}
                helperVisible={!inputCorrect.startDate}
                helperType={'error'}
                helperText={messages.startDate}
              />
              <TextInputWithHelper
                value={input.endDate}
                placeholder="End date"
                onChangeText={text => handleInput('endDate', text)}
                helperVisible={!inputCorrect.endDate}
                helperType={'error'}
                helperText={messages.endDate}
              />
              <TextInputWithHelper
                value={input.distance}
                placeholder="Distance"
                onChangeText={text => handleInput('distance', text)}
                helperVisible={!inputCorrect.distance}
                helperType={'error'}
                helperText={messages.distance}
              />
            {
              editing
                ? <Button onPress={() => submitForm()}>SAVE</Button>
                : <Button onPress={() => submitForm()}>ADD</Button>
            }
            <Button onPress={onDismiss}>HIDE</Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    );
  }
  return <></>;
};
export default ActivityEditorModal;
