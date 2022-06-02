import React from 'react';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

function AdminLayout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <title>The Path</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminNavbar />
      <Container maxW="7xl">{children}</Container>
      <Footer mt={4} />
    </React.Fragment>
  );
}

export default AdminLayout;
