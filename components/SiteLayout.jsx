import React from 'react';
import Navbar from './Navbar';

function SiteLayout({ children }) {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
}

export default SiteLayout;
