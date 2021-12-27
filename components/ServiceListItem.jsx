import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import CardButton from './CardButton';
import BusinessStatusLabel from './BusinessStatusLabel';

function ServiceListItem(props) {
  const { name, place_id, active, city, street, map, onClick } = props;
  const [placeDetails, setPlaceDetails] = useState();
  const [placeAddress, setPlaceAddress] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let marker;

    if (place_id && map) {
      setIsLoading(true);
      const request = {
        placeId: place_id,
        fields: [
          'name',
          'rating',
          'formatted_phone_number',
          'address_component',
          'geometry',
          'opening_hours',
          'utc_offset_minutes',
          'business_status',
        ],
      };
      const service = new google.maps.places.PlacesService(map);
      service.getDetails(request, (place, status) => {
        console.log(`status`, status);
        if (status === 'OK') {
          const { address_components } = place;
          const address = `${address_components[0].short_name} ${address_components[1].short_name}, ${address_components[3].short_name} ${address_components[5].short_name}`;
          marker = new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
          });
          marker.setMap(map);
          setPlaceDetails(place);
          setPlaceAddress(address);
        }
        setIsLoading(false);
      });
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [place_id, map]);

  return (
    <CardButton onClick={onClick} w="full" p={4} active={active}>
      {!isLoading && placeDetails && (
        <Flex textAlign="left" direction="column" align="start">
          <Text fontSize="md" fontWeight="bold">
            {placeDetails.name}
          </Text>
          <Text fontSize="sm">{placeAddress}</Text>
          <BusinessStatusLabel isOpen={placeDetails.opening_hours?.isOpen()} mt={2} />
        </Flex>
      )}
    </CardButton>
  );
}

export default ServiceListItem;
