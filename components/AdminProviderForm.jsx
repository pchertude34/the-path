import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';
import { buildPlaceAddress, generateGoogleLink } from '../utils/utils';

import PlaceSearch from './PlaceSearch';

function AdminProviderForm(props) {
  const { initialValues, onSubmit } = props;
  const [currentPlace, setCurrentPlace] = useState();
  const [warnName, setWarnName] = useState(false);
  const [map, setMap] = useState();

  const mapRef = useRef();

  const formik = useFormik({
    initialValues: {
      placeId: '',
      address: '',
      name: '',
      description: '',
      serviceTypes: [],
    },
    validationSchema: Yup.object().shape({
      placeId: Yup.string().required(
        'Place ID is required! Search for a place to populate the Place ID.'
      ),
      address: Yup.string().required(
        'Address is required! Search for a place to populate the address.'
      ),
      name: Yup.string().required(
        'Please enter a name for your place, or use the default name Google provides when searching for a place.'
      ),
    }),
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  // Initialize the map
  useEffect(() => {
    if (mapRef.current) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 8,
        })
      );
    }
  }, []);

  // Update the maps center and place a point whenever the place changes.
  useEffect(() => {
    let marker;

    if (map && currentPlace) {
      marker = new google.maps.Marker({
        position: currentPlace.geometry.location,
        title: currentPlace.name,
      });
      map.setCenter(currentPlace.geometry.location);
      marker.setMap(map);
    }

    return () => {
      if (marker) marker.setMap(null);
    };
  }, [currentPlace, map]);

  // If there is a place selected, warn the user if they change what is put in the name field.
  // We want to warn the user because it's best to keep google place names, but sometimes
  // the place names can be unnecissarily long.
  useEffect(() => {
    if (currentPlace) setWarnName(currentPlace.name !== formik.values.name);
    else setWarnName(false);
  }, [formik.values.name, currentPlace]);

  // Function to handle updating the place. We need to wrap this in a useCallback because PlaceInput
  // uses this function as a useEffect dependency.
  const handlePlaceChange = useCallback((place) => {
    setCurrentPlace(place);

    formik.setValues(
      { placeId: place.place_id, address: buildPlaceAddress(place), name: place.name },
      true
    );
  }, []);

  function handleSubmit(values) {
    console.log('FORM SUBMITTED');
    console.log('values', values);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        <Heading as="h1">Add a Provider</Heading>

        <Stack p={4} borderRadius="md" bg="gray.100">
          <Box>
            <PlaceSearch
              label="Search for a Place"
              placeholder="Search for a place by Address or Name"
              onPlaceChange={handlePlaceChange}
              placeTypes={['establishment']}
            />
            <Text fontSize="xs" p={2}>
              Use this field to search google places to find providers. We use google places to
              populate most of the information for The Path users including the address and name.
              Please verify that the entered place is indeed the provider you are trying to add.
            </Text>
          </Box>

          <FormControl isInvalid={formik.errors.placeId} isRequired>
            <FormLabel>Place ID</FormLabel>
            <Input
              id="placeId"
              name="placeId"
              placeholder="Google's given Place ID"
              value={formik.values.placeId}
              disabled
              bg="white"
            />
            <FormErrorMessage>{formik.errors.placeId}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.errors.address} isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              id="address"
              name="address"
              placeholder="The address of the provider found by google"
              value={formik.values.address}
              disabled
              bg="white"
            />
            <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
          </FormControl>

          <Button
            as="a"
            colorScheme="blue"
            href={generateGoogleLink(formik.values.placeId, formik.values.name)}
            target="_blank"
            rel="noreferrer noopener"
            isDisabled={!formik.values.placeId}
          >
            View on Google
          </Button>
        </Stack>

        <FormControl isInvalid={formik.errors.name} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            name="name"
            bg="white"
            isRequired
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
            }}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          {warnName && (
            <Alert status="warning" variant="left-accent" borderRadius="md" mt={2}>
              <AlertIcon />
              <AlertDescription fontSize="sm" lineHeight="xs">
                You changed the provider name from what google set! This is okay if you meant to do
                it, just make sure you know what you are doing.{' '}
                <Button
                  size="sm"
                  variant="link"
                  colorScheme="blue"
                  onClick={() =>
                    formik.setValues({ ...formik.values, name: currentPlace.name }, false)
                  }
                >
                  Click here
                </Button>{' '}
                to reset the name.
              </AlertDescription>
            </Alert>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea placeholder="Enter a brief description for this provider." />
        </FormControl>

        <Button type="submit" colorScheme="primary">
          Submit
        </Button>
      </Stack>
    </form>
  );
}

AdminProviderForm.propTypes = {
  initialValues: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
};

export default AdminProviderForm;
