import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import FormTextInput from './FormTextInput';

import PropTypes from 'prop-types';
import util from '../../util';
import DateTextInput from './DateTextInput';

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
  }
};

const ActivityEditorForm = ({ details, editMode, onConfirm, onHide }) => {
  // state
  const [input, setInput] = useState(defaults.input);
  const [messages, setMessages] = useState(defaults.messages);

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
    setMessages(msg);
  };

  const submitForm = () => {
    if (editMode) {
      // edit an existing activity
      onConfirm(details['_id'], input);
    } else {
      // add a new activity
      onConfirm(input);
      setInput(defaults.input);
    }
  };

  const hideForm = () => {
    // clean input and messages
    setInput(defaults.input);
    setMessages(defaults.messages);
    onHide();
  };

  return (
    <View>
      <FormTextInput
        defaultValue={details.name}
        placeholder="Activity name"
        onChangeText={text => handleInput('name', text)}
        helperVisible={messages.name !== ''}
        helperType={'error'}
        helperText={messages.name}
      />
      <FormTextInput
        defaultValue={details.category}
        placeholder="Category name"
        onChangeText={text => handleInput('category', text)}
        helperVisible={messages.category !== ''}
        helperType={'error'}
        helperText={messages.category}
      />
      <DateTextInput
        defaultValue={util.date.unixToDate(details.startDate)}
        placeholder="Start date"
        onChangeText={text => handleInput('startDate', text)}
        helperVisible={messages.startDate !== ''}
        helperType={'error'}
        helperText={messages.startDate}
      />
      <DateTextInput
        defaultValue={util.date.unixToDate(details.endDate)}
        placeholder="End date"
        onChangeText={text => handleInput('endDate', text)}
        helperVisible={messages.endDate !== ''}
        helperType={'error'}
        helperText={messages.endDate}
      />
      <FormTextInput
        defaultValue={details.distance}
        placeholder="Distance"
        onChangeText={text => handleInput('distance', text)}
        helperVisible={messages.distance !== ''}
        helperType={'error'}
        helperText={messages.distance}
      />
      {
        editMode
          ? <Button onPress={() => submitForm()}>SAVE</Button>
          : <Button onPress={() => submitForm()}>ADD</Button>
      }
      <Button onPress={hideForm}>HIDE</Button>
    </View>
  );
};

ActivityEditorForm.propTypes = {
  details: PropTypes.object 
};
ActivityEditorForm.defaultProps = {
  details: {}
};

export default ActivityEditorForm;
