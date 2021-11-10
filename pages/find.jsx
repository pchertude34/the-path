import React, { useState, useRef, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { MdLocationOn } from 'react-icons/md';
import FormCard from '../components/FormCard';

function Find() {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const postcodeInputRef = useRef();

  useEffect(() => {
    const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
      compoenntRestrictions: { country: ['us'] },
      fields: ['address_components', 'geometry', 'name'],
      type: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      fillInAddress(place);
    });
  }, []);

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
          cityInputRef.current.value = component.long_name;
          break;
        case 'administrative_area_level_1':
          stateInputRef.current.value = component.short_name;
          break;
      }
    }

    addressInputRef.current.value = address1;
    postcodeInputRef.current.value = postcode;
  }

  function calculateLocation() {
    navigator.geolocation.getCurrentPosition((position) => {});
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
                <Input ref={addressInputRef} placeholder="123 S Main St" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input ref={cityInputRef} placeholder="Portland" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Input ref={stateInputRef} placeholder="Oregon" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Zip</FormLabel>
                <Input ref={postcodeInputRef} placeholder="12345" />
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
          <Button rightIcon={<ArrowForwardIcon />} colorScheme="primary" ml="auto">
            Next
          </Button>
        </Flex>
      </VStack>
    </FormCard>
  );
}

export default Find;
