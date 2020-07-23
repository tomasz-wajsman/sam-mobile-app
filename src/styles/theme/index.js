import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff9900',
    accent: '#ffff00',
    surface: '#f9f4ec',
    disabled: '#868179',
    placeholder: '#f99806',
    backdrop: '#f3f2f2'
  },
  animation: {
    ...DefaultTheme.animation,
    scale: 1
  }
};

export default theme;
