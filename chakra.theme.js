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
      300: '#F1807E',
      400: '#EF6F6C',
      500: '#ED5C5A',
      600: '#EB4A47',
    },
    secondary: {
      400: '#A1C7E3',
      500: '#90BEDE',
      600: '#81B5D9',
      700: '#81B5D9',
    },
    lightGray: {
      100: '#F0F0F0',
    },
  },
});

export default customTheme;
