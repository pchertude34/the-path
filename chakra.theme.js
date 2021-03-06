import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  styles: {
    // global: (props) => ({
    //   body: {
    //     bg: 'lightGray.100',
    //   },
    // }),
  },
  colors: {
    primary: {
      50: '#F7B7B6',
      100: '#F5A5A3',
      200: '#F39291',
      300: '#F1807E',
      400: '#EF6F6C',
      500: '#ED5C5A',
      600: '#EB4A47',
      700: '#E93835',
      800: '#E72623',
      900: '#DC1C18',
    },
    secondary: {
      400: '#F8E8C9',
      500: '#F5E0B7',
      600: '#F3D9A5',
      700: '#F0D193',
    },
    lightGray: {
      100: '#F0F0F0',
    },
  },
});

export default customTheme;
