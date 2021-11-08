import React from 'react';
import { Container } from '@chakra-ui/react';
import Navbar from './Navbar';

function SiteLayout({ children }) {
  return (
    <React.Fragment>
      <Navbar />
      <Container maxW="7xl">{children}</Container>
    </React.Fragment>
  );
}

export default SiteLayout;
