import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import FormTextInput from './FormTextInput';

import PropTypes from 'prop-types';
import util from '../../util';
import DateTextInput from './DateTextInput';
import { connect } from 'react-redux';

const defaults = {
  input: {
    name: '',
    category: '',
    startDate: util.date.unixToDate(Date.now()),
    endDate: util.date.unixToDate(Date.now()),
    distance: ''
  }, messages: {
    name: '',
    category: '',
    startDate: '',
    endDate: '',
    distance: ''
  }
};

const ActivityEditorForm = ({ selectedActivityIndex, details, editMode, onConfirm, onHide }) => {
  useEffect(() => {
    if (selectedActivityIndex >= 0) {
      console.log(details.startDate, details.endDate);
      setInput({
        name: details.name,
        category: details.category,
        startDate: util.date.unixToDate(details.startDate),
        endDate: util.date.unixToDate(details.endDate),
        distance: details.distance
      });
    }
  }, [selectedActivityIndex]);
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
    const dtRegex = new RegExp(/^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (0[0-92|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/);
    const msg = { ...messages };
    switch (field) {
      case 'name':
        if (value === '') {
          msg.name = 'Empty name';
        } else {
          msg.name = '';
        }
        // name
        break;
      case 'category':
        // category
        if (value === '') {
          msg.category = 'Empty category';
        } else {
          msg.category = '';
        }
        break;
      case 'startDate':
        // start date
        if (value === '') {
          msg.startDate = 'Start date is empty';
        } else if (!dtRegex.test(value)) {
          msg.startDate = 'Start date is incorrect';
        } else {
          msg.startDate = '';
        }
        break;
      case 'endDate':
        // category
        if (value === '') {
          msg.endDate = 'End date is empty';
        } else if (!dtRegex.test(value)) {
          msg.endDate = 'End date is incorrect';
        } else {
          msg.endDate = '';
        }
        break;
      case 'distance':
        // distance
        if (value !== '') {
          const distanceNum = Number.parseInt(value);
          if (Number.isNaN(distanceNum)) {
            msg.distance = 'Incorrect distance format';
          } else if (distanceNum <= 0) {
            msg.distance = 'Negative or zeroth distance';
          } else {
            msg.distance = '';
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
        value={input.name}
        defaultValue={details.name}
        placeholder="Activity name"
        onChangeText={text => handleInput('name', text)}
        helperVisible={messages.name !== ''}
        helperType={'error'}
        helperText={messages.name}
      />
      <FormTextInput
        value={input.category}
        defaultValue={details.category}
        placeholder="Category name"
        onChangeText={text => handleInput('category', text)}
        helperVisible={messages.category !== ''}
        helperType={'error'}
        helperText={messages.category}
      />
      <DateTextInput
        value={input.startDate}
        defaultValue={util.date.unixToDate(details.startDate)}
        placeholder="Start date"
        onChangeText={text => handleInput('startDate', text)}
        helperVisible={messages.startDate !== ''}
        helperType={'error'}
        helperText={messages.startDate}
      />
      <DateTextInput
        value={input.endDate}
        defaultValue={util.date.unixToDate(details.endDate)}
        placeholder="End date"
        onChangeText={text => handleInput('endDate', text)}
        helperVisible={messages.endDate !== ''}
        helperType={'error'}
        helperText={messages.endDate}
      />
      <FormTextInput
        value={input.distance}
        defaultValue={details.distance}
        placeholder="Distance"
        onChangeText={text => handleInput('distance', text)}
        helperVisible={messages.distance !== ''}
        helperType={'error'}
        helperText={messages.distance}
      />
      <Button onPress={() => submitForm()}>{editMode ? 'SAVE' : 'ADD'}</Button>
      <Button onPress={hideForm}>CANCEL</Button>
    </View>
  );
};

ActivityEditorForm.propTypes = {
  details: PropTypes.object
};
ActivityEditorForm.defaultProps = {
  details: {}
};

const mapStateToProps = state => {
  return {
    selectedActivityIndex: state.activities.selectedActivityIndex,
    details: state.activities.items[state.activities.selectedActivityIndex]
  }
};

export default connect(mapStateToProps)(ActivityEditorForm);
