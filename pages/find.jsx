import React, { useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { PathFormProvider } from '../state';
import PathFormItem from '../components/PathFormItem';
import LocationInput from '../components/LocationInput';

function Find() {
  return (
    <PathFormProvider>
      <Container maxW="container.lg" mt={8}>
        <PathFormItem
          title="Where are you located?"
          description="Enter the address of you, or a person you are trying to help. Or use your current location."
        >
          <LocationInput
            label="Street Address"
            placeholder="1234 S Main St, Portland OR"
            onLocationChange={() => {}}
          />
        </PathFormItem>

        {/* <PathFormItem>

        </PathFormItem> */}
      </Container>
    </PathFormProvider>
  );
}

export default Find;
