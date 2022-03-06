import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';
import { buildPlaceAddress } from '../../../utils/utils';

import AdminBackButton from '../../../components/AdminBackButton';
import LocationInput from '../../../components/PlaceSearch';
import AdminProviderForm from '../../../components/AdminProviderForm';

function CreateProviderPage() {
  const [map, setMap] = useState();
  const [place, setPlace] = useState();
  const [placeId, setPlaceId] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeAddress, setPlaceAddress] = useState('');

  const mapRef = useRef();

  // useEffect(() => {
  //   if (mapRef.current) {
  //     setMap(
  //       new window.google.maps.Map(mapRef.current, {
  //         center: { lat: 0, lng: 0 },
  //         zoom: 8,
  //       })
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   let marker;

  //   if (map && place) {
  //     marker = new google.maps.Marker({
  //       position: place.geometry.location,
  //       title: place.name,
  //     });
  //     map.setCenter(place.geometry.location);
  //     marker.setMap(map);
  //   }

  //   return () => {
  //     if (marker) marker.setMap(null);
  //   };
  // }, [place, map]);

  function handlePlaceChange(place) {
    setPlace(place);
    setPlaceId(place.place_id);
    setPlaceName(place.name);
    setPlaceAddress(buildPlaceAddress(place));
  }

  return (
    <Box mt={8}>
      <AdminBackButton label="Back to Provider List" />
      <Container maxW="2xl" mt={8}>
        <AdminProviderForm onSubmit={() => {}} />
        {/* <Stack spacing={8}>
          <Heading as="h1">Add a Provider</Heading>
          <Box p={4} borderRadius="md" bg="gray.100">
            <Stack spacing={4}>
              <Box>
                <LocationInput
                  label="Search for a Place"
                  placeholder="Search for a place by Address or Name"
                  onPlaceChange={handlePlaceChange}
                  placeTypes={['establishment']}
                />
                <Text fontSize="xs" p={2}>
                  Use this field to search google places to find providers. We use google places to
                  populate most of the information for The Path users including the address and
                  name. Please verify that the entered place is indeed the provider you are trying
                  to add.
                </Text>
              </Box>
              <FormControl>
                <FormLabel>Place ID</FormLabel>
                <Input placeholder="Google's given Place ID" value={placeId} disabled bg="white" />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input value={placeAddress} disabled bg="white" />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={placeName}
                  bg="white"
                  onChange={(e) => setPlaceName(e.target.value)}
                />
              </FormControl>
              <Button
                as="a"
                colorScheme="blue"
                href={generateGoogleLink()}
                target="_blank"
                rel="noreferrer noopener"
              >
                View on Google
              </Button>
            </Stack>
          </Box>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Enter a brief description for this provider." />
          </FormControl>

          <FormControl>
            <FormLabel>Map</FormLabel>
            <Box ref={mapRef} style={{ height: '500px' }} borderRadius="md" overflow="hidden" />
          </FormControl>
        </Stack> */}
      </Container>
    </Box>
  );
}

export default CreateProviderPage;
