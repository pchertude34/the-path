import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormControl, Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import PlaceSearch from './PlaceSearch';

function LocationInput(props) {
  const { label, placeholder, onLocationChange } = props;
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isInvalid, setIsInvalid] = useState();
  const [isCalculatingLocation, setIsCalculatingLocation] = useState(false);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      onLocationChange({ latitude, longitude });
      setIsInvalid(!Boolean(latitude) && !Boolean(longitude));
    }
  }, [latitude, longitude, onLocationChange]);

  function handlePlaceChange(place) {
    setLatitude(place.geometry?.location.lat() || null);
    setLongitude(place.geometry?.location.lng() || null);
  }

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
      <PlaceSearch
        mb={4}
        label={label}
        placeholder={placeholder}
        isInvalid={isInvalid}
        isDisabled={isCalculatingLocation}
        onPlaceChange={handlePlaceChange}
      />

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
