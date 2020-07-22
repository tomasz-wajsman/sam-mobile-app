import React from 'react';
import { Text, View } from 'react-native';
import { HelperText, TextInput as PaperTextInput } from 'react-native-paper';

import PropTypes from 'prop-types';

import styles from '../../styles';
import util from '../../util';

const DateTextInput = ({ defaultValue, placeholder, onChangeText, helperVisible, helperType, helperText, additionalHelperText }) => {
  return (
    <View style={styles.layout.spacing}>
      <PaperTextInput
        style={{ padding: 5, height: 24 }}
        defaultValue={defaultValue || util.date.unixToDate(Date.now())}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      {
        additionalHelperText
          ? <HelperText visible={true}>
            {additionalHelperText}
          </HelperText>
          : <View />
      }
      <HelperText
        type={helperType}
        visible={helperText !== ''}
      >
        {helperText}
      </HelperText>
    </View>
  );
};

DateTextInput.propTypes = {
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  additionalHelperText: PropTypes.string
};
DateTextInput.defaultProps = {
  defaultValue: util.date.unixToDate(0),
  placeholder: '',
  additionalHelperText: 'Date time format: YYYY-MM-DD HH:mm'
};

export default DateTextInput;
