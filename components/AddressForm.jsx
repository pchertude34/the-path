import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { usePathFormState, pathFormTypes as types } from '../state';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { MdLocationOn } from 'react-icons/md';
import FormCard from './FormCard';

/**
 * This is a component that is to be used on the "find" page and requires
 * consumption of the pathFormContext.
 */
function AddressForm(props) {
  const { onComplete } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    state: { streetAddress1, city, state, zip, lat, lng },
    dispatch,
  } = usePathFormState();

  const addressInputRef = useRef();
  const toast = useToast();

  useEffect(() => {
    // Initialize the google places autocomplete on the address input.
    const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: ['us'] },
      fields: ['address_components', 'geometry', 'name'],
      type: ['address'],
    });

    // Setup a listener on the address input to query for places whenever the user
    // changes the text.
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      fillInAddress(place);
    });

    /**
     * Gather the address information when a user selects a place.
     * @param {GooglePlace} place The place queried from the places api
     */
    function fillInAddress(place) {
      let address1 = '';
      let postcode = '';

      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case 'street_number':
            address1 = `${component.long_name} ${address1}`;
            break;
          case 'route':
            address1 += component.short_name;
            break;
          case 'postal_code':
            postcode = `${component.long_name}${postcode}`;
            break;
          case 'postal_code_suffix':
            postcode = `${postcode}-${component.long_name}`;
            break;
          case 'locality':
            dispatch({ type: types.UPDATE_CITY, payload: component.long_name });
            break;
          case 'administrative_area_level_1':
            dispatch({ type: types.UPDATE_STATE, payload: component.short_name });
            break;
        }
      }

      dispatch({ type: types.UPDATE_STREET_ADDRESS_1, payload: address1 });
      dispatch({ type: types.UPDATE_ZIP, payload: postcode });
      // store the lattitude and longitude coordinates to use for mapping later.
      dispatch({ type: types.UPDATE_LNG, payload: place.geometry.location.lng() });
      dispatch({ type: types.UPDATE_LAT, payload: place.geometry.location.lat() });
    }
  }, [dispatch]);

  /**
   * Use native browser functionality to calculate the user's current coordinates.
   * This will require the user to enable location services.
   */
  function calculateLocation() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { latitude, longitude },
      } = position;

      dispatch({ type: types.UPDATE_LNG, payload: longitude });
      dispatch({ type: types.UPDATE_LAT, payload: latitude });
      setIsLoading(false);
    });
  }

  /**
   * Validate the form and calculate the coordinates of the user's entered address if we
   * haven't calculated them via the places api or the browser's native location features.
   */
  async function handleSubmitForm() {
    setError(null);

    if (!lat && !lng) {
      setIsLoading(true);
      const address = `${streetAddress1}, ${city} ${state}, ${zip}`;
      const geocoder = new google.maps.Geocoder({
        componentRestrictions: { country: ['us'] },
      });

      const { results } = await geocoder.geocode({ address });
      // results[0] gives us the most relevant existing address, which is the only one we care about.
      // We need to make sure that it is a street address, otherwise it might be some junk like an
      // entire city or state which is no help for calculating distance to places.
      if (results[0]?.types?.includes('street_address')) {
        const {
          geometry: { location },
        } = results[0];
        dispatch({ type: types.UPDATE_LAT, payload: location.lat() });
        dispatch({ type: types.UPDATE_LNG, payload: location.lng() });
      } else {
        toast({
          title: 'Cannot find address!',
          description: 'Please double check the address you entered.',
          status: 'error',
          isClosable: true,
        });
      }
    }
    onComplete();

    setIsLoading(false);
  }

  /**
   * Helper function to remove the saved coordinates if there are any.
   * This will happen if a user updates any of the form fields.
   * We need to do this incase we picked coordinates from a google places entry
   * and the user changes some of the input fields
   */
  function removeCoords() {
    dispatch({ type: types.UPDATE_LAT, payload: undefined });
    dispatch({ type: types.UPDATE_LNG, payload: undefined });
  }

  return (
    <FormCard>
      <VStack w="full" h="full" p={10} spacing={{ base: 4, md: 10 }} alignItems="center">
        <Box w="full" h="full">
          <Heading as="h1" size="xl" textAlign="center">
            Welcome to The Path!
          </Heading>
          <Text fontSize="lg" textAlign="center">
            First things first, where are you located?
          </Text>
        </Box>
        <Divider />
        <Container>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Street Address</FormLabel>
                <Input
                  ref={addressInputRef}
                  placeholder="123 S Main St"
                  value={streetAddress1}
                  onChange={(e) => {
                    // Remove the coords first here to avoid issues with google places calculating the coords later
                    removeCoords();
                    dispatch({ type: types.UPDATE_STREET_ADDRESS_1, payload: e.target.value });
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  placeholder="Portland"
                  value={city}
                  onChange={(e) => {
                    dispatch({ type: types.UPDATE_CITY, payload: e.target.value });
                    removeCoords();
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Input
                  placeholder="Oregon"
                  value={state}
                  onChange={(e) => {
                    dispatch({ type: types.UPDATE_STATE, payload: e.target.value });
                    removeCoords();
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Zip</FormLabel>
                <Input
                  placeholder="12345"
                  value={zip}
                  onChange={(e) => {
                    dispatch({ type: types.UPDATE_ZIP, payload: e.target.value });
                    removeCoords();
                  }}
                />
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </Container>
        <Text>Or</Text>
        <Button
          leftIcon={<MdLocationOn />}
          colorScheme="secondary"
          px={8}
          onClick={calculateLocation}
        >
          Use my current location
        </Button>
        <Flex w={'100%'}>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="primary"
            ml="auto"
            onClick={handleSubmitForm}
          >
            Next
          </Button>
        </Flex>
      </VStack>
    </FormCard>
  );
}

export default AddressForm;
