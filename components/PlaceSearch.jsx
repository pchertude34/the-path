import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Text,
} from '@chakra-ui/react';

function PlaceSearch(props) {
  const {
    onPlaceChange,
    placeTypes = ['address'],
    isDisabled,
    isInvalid,
    placeholder,
    helpText,
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
      console.log('place', place);
      onPlaceChange(place);
    });
  }, []);

  return (
    <FormControl {...rest} isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        ref={addressInputRef}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        placeholder={placeholder}
        // Prevent using the Enter key to select a place from causing default actions
        // such as form submitting from parent components.
        onKeyPress={(e) => {
          e.key === 'Enter' && e.preventDefault();
        }}
        bg="white"
      />
      <FormErrorMessage>Address could not be found.</FormErrorMessage>
      {helpText && (
        <FormHelperText fontSize="xs" p={2}>
          {helpText}
        </FormHelperText>
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
  helpText: PropTypes.string,
  label: PropTypes.string,
};

export default PlaceSearch;
