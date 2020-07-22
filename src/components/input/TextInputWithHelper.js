import React from 'react';
import { Text, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import styles from '../../styles';

const TextInputWithHelper = ({ defaultValue, placeholder, onChangeText, helperVisible, helperType, helperText, additionalHelperText }) => {
  return (
    <View style={styles.layout.spacing}>
      <TextInput
        style={{ padding: 5, height: 24 }}
        defaultValue={defaultValue || ''}
        placeholder={placeholder || ''}
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
export default TextInputWithHelper;
