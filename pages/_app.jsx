import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SiteLayout from '../components/SiteLayout';
import theme from '../chakra.theme';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <CSSReset config={config} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default MyApp;
