import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, SkeletonText, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import CardButton from './CardButton';
import BusinessStatusLabel from './BusinessStatusLabel';
import { serviceDetailTypes, useServiceDetailContext } from '../state';

function ServiceListItem(props) {
  const { name, place_id, active, city, street, map, onClick } = props;
  const { state, dispatch } = useServiceDetailContext();

  const currentPlace = state.serviceMap[place_id];

  // Load the place id from google places if we haven't already loaded it
  useEffect(() => {
    if (place_id && map && !currentPlace) {
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
        if (status === 'OK') {
          const { address_components } = place;
          const address = `${address_components[0].short_name} ${address_components[1].short_name}, ${address_components[3].short_name} ${address_components[5].short_name}`;

          dispatch({
            type: serviceDetailTypes.ADD_SERVICE,
            payload: { ...place, placeId: place_id, address },
          });
        } else {
          // set error for the place in state
        }
      });
    }
  }, [place_id, map, dispatch, currentPlace]);

  // create a marker on the map for the place.
  useEffect(() => {
    let marker;

    if (currentPlace && map) {
      marker = new google.maps.Marker({
        position: currentPlace.geometry.location,
        title: currentPlace.name,
      });
      marker.setMap(map);
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [currentPlace, map]);

  if (currentPlace && !currentPlace.error) {
    return (
      <CardButton onClick={onClick} w="full" p={4} active={active}>
        <Flex textAlign="left" direction="column" align="start">
          <Text fontSize="md" fontWeight="bold">
            {currentPlace.name}
          </Text>
          <Text fontSize="sm">{currentPlace.address}</Text>
          <BusinessStatusLabel isOpen={currentPlace.opening_hours?.isOpen()} mt={2} />
        </Flex>
      </CardButton>
    );
  } else if (currentPlace && currentPlace.error) {
  } else if (!currentPlace) {
    return (
      <CardButton w="full" p={4}>
        <SkeletonText noOfLines={3} spacing={4} />
      </CardButton>
    );
  }
}

export default ServiceListItem;
