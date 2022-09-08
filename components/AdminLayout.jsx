import React from 'react';
import Head from 'next/head';
import { Container, Flex } from '@chakra-ui/react';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

function AdminLayout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <title>The Path</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" minH="100vh">
        <AdminNavbar />
        <Container maxW="7xl" mb={8}>
          {children}
        </Container>
        <Footer mt="auto" />
      </Flex>
    </React.Fragment>
  );
}

export default AdminLayout;
