import React, { useState } from 'react';
import Script from 'next/script';
import { Container } from '@chakra-ui/react';
import PathFormItem from '../components/PathFormItem';
import LocationInput from '../components/LocationInput';
import ServiceTypeContainer from '../components/ServiceTypeContainer';
import ServiceList from '../components/ServiceList';

function Find() {
  const [userLatitude, setUserLatitude] = useState();
  const [userLongitude, setUserLongitude] = useState();
  const [distance, setDistance] = useState();
  const [selectedServiceType, setSelectedServiceType] = useState();

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
    <Container maxW="container.lg" mt={8} p={0} minH="100vh">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      ></Script>
      <PathFormItem
        defaultAnimationIn={true}
        title="Where are you located?"
        description="Enter the address of you, or a person you are trying to help. Or you can use your current location."
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
        <ServiceTypeContainer
          latitude={userLatitude}
          longitude={userLongitude}
          onDistanceChange={setDistance}
          onServiceTypeSelected={(serviceId) => setSelectedServiceType(serviceId)}
        />
      </PathFormItem>

      <PathFormItem
        title="Select a service to locate"
        description="Select one of the services we know about to get directions or learn more about it."
      >
        <ServiceList
          latitude={userLatitude}
          longitude={userLongitude}
          distance={distance}
          serviceType={selectedServiceType}
        />
      </PathFormItem>
    </Container>
  );
}

export default Find;
