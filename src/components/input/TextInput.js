import React from 'react';
import { Text } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const TextInputWithHelper = ({ value, placeholder, onChangeText, helperVisible, helperType, helperText }) => {
  return (
    <>
      <TextInput 
        value={value || ''}
        placeholder={placeholder || ''}
        onChangeText={onChangeText}
      />
      <HelperText
        type={helperType}
        visible={helperVisible}
      >
        {helperText}
      </HelperText>
    </>
  );
};
export default TextInputWithHelper;
