import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
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

  console.log(`google.maps`, google.maps);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset config={config} />
      <Layout>
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Component {...pageProps} />
        </Wrapper>
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
