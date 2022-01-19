import React from 'react';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import Navbar from './Navbar';

function SiteLayout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <title>The Path</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container maxW="7xl">{children}</Container>
    </React.Fragment>
  );
}

export default SiteLayout;
