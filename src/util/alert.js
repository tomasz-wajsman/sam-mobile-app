const { Alert } = require('react-native');

const showAlert = (title, message, buttons, cancellable) => {
  Alert.alert(
    title || 'Default title',
    message || 'Default content',
    buttons || [{ text: 'OK' }],
    cancellable || false
  );
};
export default {
  showAlert
};
