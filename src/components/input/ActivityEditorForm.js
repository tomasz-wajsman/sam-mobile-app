import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import FormTextInput from './FormTextInput';

import PropTypes from 'prop-types';
import util from '../../util';
import DateTextInput from './DateTextInput';

import { connect } from 'react-redux';
import styles from '../../styles';
import SamClient from '../../clients/sam';

const ActivityEditorForm = ({ selectedActivityIndex, details, editMode, onConfirm, onHide }) => {
  const defaults = {
    input: {
      name: '',
      category: '',
      start_date: util.date.unixToDate(Date.now()),
      end_date: util.date.unixToDate(Date.now()),
      distance: ''
    }, messages: {
      name: '',
      category: '',
      start_date: '',
      end_date: '',
      distance: ''
    }
  };

  useEffect(() => {
    if (selectedActivityIndex >= 0) {
      setInput({
        name: String(details.name),
        category: String(details.category),
        start_date: String(util.date.unixToDate(details.start_date)),
        end_date: String(util.date.unixToDate(details.end_date)),
        distance: String(details.distance || '')
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
      case 'start_date':
        // start date
        if (value === '') {
          msg.start_date = 'Start date is empty';
        } else if (!dtRegex.test(value)) {
          msg.start_date = 'Start date is incorrect';
        } else {
          msg.start_date = '';
        }
        break;
      case 'end_date':
        // category
        if (value === '') {
          msg.end_date = 'End date is empty';
        } else if (!dtRegex.test(value)) {
          msg.end_date = 'End date is incorrect';
        } else {
          msg.end_date = '';
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
    // check if data is correct
    if (!SamClient.checkActivityDetails(input)) {
      util.alert.showAlert(
        'Data validation error',
        'One or more of the mandatory details is missing or incorrect. Please check them.'
      )
    } else if (editMode) {
      // edit an existing activity
      console.log(details);
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
        value={input.start_date}
        defaultValue={util.date.unixToDate(details.start_date)}
        placeholder="Start date"
        onChangeText={text => handleInput('start_date', text)}
        helperVisible={messages.start_date !== ''}
        helperType={'error'}
        helperText={messages.start_date}
      />
      <DateTextInput
        value={input.end_date}
        defaultValue={util.date.unixToDate(details.end_date)}
        placeholder="End date"
        onChangeText={text => handleInput('end_date', text)}
        helperVisible={messages.end_date !== ''}
        helperType={'error'}
        helperText={messages.end_date}
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
      <Button
        mode="contained"
        style={styles.layout.button}
        onPress={() => submitForm()}
      >
        {editMode ? 'SAVE' : 'ADD'}
      </Button>
      <Button
        mode="contained"
        style={styles.layout.button}
        onPress={hideForm}
      >
        CANCEL
      </Button>
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
