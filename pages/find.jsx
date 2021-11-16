import React from 'react';
import { PathFormProvider } from '../state';
import AddressForm from '../components/AddressForm';

function Find() {
  return (
    <PathFormProvider>
      <AddressForm />
    </PathFormProvider>
  );
}

export default Find;
