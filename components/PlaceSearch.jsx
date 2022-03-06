import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

function PlaceSearch(props) {
  const {
    onPlaceChange,
    placeTypes = ['address'],
    isDisabled,
    isInvalid,
    placeholder,
    label,
    ...rest
  } = props;
  const addressInputRef = useRef();

  useEffect(() => {
    // Initialize the google places autocomplete on the address input.
    const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: ['us'] },
      fields: ['address_components', 'geometry', 'name', 'place_id'],
      types: placeTypes,
    });

    // Setup a listener on the address input to query for places whenever the user
    // changes the text.
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceChange(place);
    });
  }, [placeTypes, onPlaceChange]);

  return (
    <FormControl {...rest}>
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
  placeTypes: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export default PlaceSearch;
