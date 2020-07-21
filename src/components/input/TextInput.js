import React from 'react';
import { Text, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const TextInputWithHelper = ({ value, placeholder, onChangeText, helperVisible, helperType, helperText, additionalHelperText }) => {
  return (
    <View>
      <TextInput
        value={value || ''}
        placeholder={placeholder || ''}
        onChangeText={onChangeText}
      />
      {
        additionalHelperText
          ? (
            <HelperText
              type={'info'}
              visible={true}
            >
              {additionalHelperText}
            </HelperText>
          )
          : (<></>)
      }
      <HelperText
        type={helperType}
        visible={helperVisible}
      >
        {helperText}
      </HelperText>
    </View>
  );
};
export default TextInputWithHelper;
