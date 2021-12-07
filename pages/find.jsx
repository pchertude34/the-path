import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Container } from '@chakra-ui/react';
import { PathFormProvider } from '../state';
import PathFormItem from '../components/PathFormItem';
import LocationInput from '../components/LocationInput';
import ServiceTypeContainer from '../components/ServiceTypeContainer';

function Find() {
  const [userLatitude, setUserLatitude] = useState();
  const [userLongitude, setUserLongitude] = useState();

  console.log(`userLatitude`, userLatitude);
  console.log(`userLongitude`, userLongitude);

  /**
   * Handler for dealing with user location updates from the Location Input component
   * Set the local latitude and longitude state to the lat + lng selected in the component.
   * @param {number} latitude the user's selected latitude
   * @param {number} longitude ther user's selected longitude
   */
  function handleLocationChange({ latitude, longitude }) {
    setUserLatitude(latitude);
    setUserLongitude(longitude);
  }

  return (
    <PathFormProvider>
      <Container maxW="container.lg" mt={8}>
        <PathFormItem
          title="Where are you located?"
          description="Enter the address of you, or a person you are trying to help. Or use your current location."
          mb={12}
        >
          <LocationInput
            label="Street Address"
            placeholder="1234 S Main St, Portland OR"
            onLocationChange={handleLocationChange}
          />
        </PathFormItem>

        <PathFormItem
          title="What sort of service are you looking for?"
          description="Select a type of the nearby services that you need to access"
          mb={12}
        >
          <ServiceTypeContainer latitude={userLatitude} longitude={userLongitude} />
        </PathFormItem>
      </Container>
    </PathFormProvider>
  );
}

export default Find;
