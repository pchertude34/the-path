import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '../chakra.theme';

// import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  function config(theme) {
    return {
      light: {
        bg: theme.colors.red[500],
      },
    };
  }

  return (
    <ChakraProvider theme={theme}>
      <CSSReset config={config} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
