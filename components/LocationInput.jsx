import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormControl, Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';

function LocationInput(props) {
  const { label, placeholder, onLocationChange } = props;
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isInvalid, setIsInvalid] = useState();
  const [isCalculatingLocation, setIsCalculatingLocation] = useState(false);
  const addressInputRef = useRef();

  useEffect(() => {
    // Initialize the google places autocomplete on the address input.
    const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: ['us'] },
      fields: ['address_components', 'geometry', 'name'],
      types: ['address'],
    });

    // Setup a listener on the address input to query for places whenever the user
    // changes the text.
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const latitude = place.geometry?.location.lat();
      const longitude = place.geometry?.location.lng();

      setLatitude(latitude || null);
      setLongitude(longitude || null);
    });
  }, [onLocationChange]);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      onLocationChange({ latitude, longitude });
      setIsInvalid(!Boolean(latitude) && !Boolean(longitude));
    }
  }, [latitude, longitude, onLocationChange]);

  /**
   * Use native browser functionality to calculate the user's current coordinates.
   * This will require the user to enable location services.
   */
  function calculateLocation() {
    setIsCalculatingLocation(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;

      setLatitude(coords.latitude || null);
      setLongitude(coords.longitude || null);
      setIsCalculatingLocation(false);
    });
  }

  return (
    <React.Fragment>
      <FormControl mb={4}>
        <FormLabel>{label}</FormLabel>
        <Input
          ref={addressInputRef}
          isInvalid={isInvalid}
          disabled={isCalculatingLocation}
          placeholder={placeholder}
          bg="white"
        />
        {isInvalid && (
          <Text fontSize="sm" textColor="red" ml={2}>
            Address could not be found.
          </Text>
        )}
      </FormControl>
      <Flex display={{ base: 'block', md: 'flex' }}>
        <Button
          leftIcon={<MdLocationOn />}
          colorScheme="primary"
          px={8}
          isLoading={isCalculatingLocation}
          loadingText="Calculating Location"
          onClick={calculateLocation}
          w={{ base: 'full', md: 'auto' }}
        >
          Use my current location
        </Button>
        {!!latitude && !!longitude && (
          <Box ml="auto" mt={{ base: 2, md: 0 }}>
            <Text fontSize="xs">
              <b>Lat: </b>
              {latitude}
            </Text>
            <Text fontSize="xs">
              <b>Lng: </b>
              {longitude}
            </Text>
          </Box>
        )}
      </Flex>
    </React.Fragment>
  );
}

LocationInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onLocationChange: PropTypes.func.isRequired,
};

export default LocationInput;
