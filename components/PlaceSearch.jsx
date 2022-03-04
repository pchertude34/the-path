import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

function PlaceSearch(props) {
  const { onPlaceChange, isDisabled, isInvalid, placeholder, label } = props;
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
      onPlaceChange && onPlaceChange(place);
    });
  }, [onPlaceChange]);

  return (
    <FormControl mb={4}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        ref={addressInputRef}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        placeholder={placeholder}
        bg="white"
      />
      {isInvalid && (
        <Text fontSize="sm" textColor="red" ml={2}>
          Address could not be found.
        </Text>
      )}
    </FormControl>
  );
}

PlaceSearch.propTypes = {
  onPlaceChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export default PlaceSearch;
