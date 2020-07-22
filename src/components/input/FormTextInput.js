import React from 'react';
import { Text, View } from 'react-native';
import { HelperText, TextInput as PaperTextInput } from 'react-native-paper';

import PropTypes from 'prop-types';
import styles from '../../styles';

const FormTextInput = ({ defaultValue, placeholder, onChangeText, helperVisible, helperType, helperText, additionalHelperText }) => {
  return (
    <View style={styles.layout.spacing}>
      <PaperTextInput
        style={{ padding: 5, height: 24 }}
        defaultValue={defaultValue}
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

FormTextInput.propTypes = {
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  additionalHelperText: PropTypes.string
};
FormTextInput.defaultProps = {
  defaultValue: '',
  placeholder: '',
  additionalHelperText: ''
};

export default FormTextInput;
