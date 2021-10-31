import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import SiteLayout from '../components/SiteLayout';
import theme from '../chakra.theme';

// import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Conditionally render layout based on the component that we are rendering.
  // For more information about this, check out https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const Layout = Component.layout || SiteLayout;

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
