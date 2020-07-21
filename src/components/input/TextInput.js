import React from 'react';
import { Text, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import styles from '../../styles';

const TextInputWithHelper = ({ value, placeholder, onChangeText, helperVisible, helperType, helperText, additionalHelperText }) => {
  return (
    <View style={styles.layout.spacing}>
      <TextInput
        value={value || ''}
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
        visible={helperVisible}
      >
        {helperText}
      </HelperText>
    </View>
  );
};
export default TextInputWithHelper;
