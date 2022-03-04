import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider as SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import SiteLayout from '../components/SiteLayout';
import theme from '../chakra.theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
        <SessionProvider session={session}>
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
          ></Script>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default MyApp;
