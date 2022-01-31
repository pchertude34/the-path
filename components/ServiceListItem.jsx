import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, SkeletonText } from '@chakra-ui/react';
import CardButton from './CardButton';
import BusinessStatusLabel from './BusinessStatusLabel';
import { serviceDetailTypes, useServiceDetailContext } from '../state';
import { convertMetersToMiles } from '../utils/utils';

function ServiceListItem(props) {
  const { place_id, active, distance, map, onClick } = props;
  const { state, dispatch } = useServiceDetailContext();

  const currentPlace = state.serviceMap[place_id];

  // Load the place id from google places if we haven't already loaded it
  useEffect(() => {
    if (place_id && map && !currentPlace) {
      const request = {
        placeId: place_id,
        componentRestrictions: { country: ['us'] },
        fields: [
          'name',
          'formatted_phone_number',
          'address_components',
          'url',
          'geometry',
          'opening_hours',
          'utc_offset_minutes',
          'business_status',
        ],
      };

      const service = new google.maps.places.PlacesService(map);
      service.getDetails(request, (place, status) => {
        if (status === 'OK') {
          let address1 = '';
          let city = '';
          let state = '';
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
                city = component.long_name;
                break;
              case 'administrative_area_level_1':
                state = component.short_name;
            }
          }

          const address = `${address1}, ${city}, ${state} ${postcode}`;

          dispatch({
            type: serviceDetailTypes.ADD_SERVICE,
            payload: { ...place, placeId: place_id, address },
          });
        } else {
          // set error for the place in state
          dispatch({
            type: serviceDetailTypes.SET_SERVICE_ERROR,
            payload: { placeId: place_id, error: true },
          });
        }
      });
    }
  }, [place_id, map, dispatch, currentPlace]);

  // create a marker on the map for the place.
  useEffect(() => {
    let marker;

    if (currentPlace && !currentPlace.error && map) {
      marker = new google.maps.Marker({
        position: currentPlace.geometry.location,
        title: currentPlace.name,
      });
      marker.setMap(map);
      marker.addListener('click', () => onClick(currentPlace));
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [currentPlace, map, onClick]);

  if (currentPlace && !currentPlace.error) {
    return (
      <CardButton onClick={() => onClick(currentPlace)} w="full" p={4} active={active}>
        <Flex textAlign="left" direction="column" align="start">
          <Text fontSize="md" fontWeight="bold">
            {currentPlace.name}
          </Text>
          <Text fontSize="sm">{currentPlace.address}</Text>
          <Flex align="center" mt={2} w="full">
            <BusinessStatusLabel isOpen={currentPlace.opening_hours?.isOpen()} />
            <Text fontSize="xs" fontWeight="bold" ml="auto">
              {convertMetersToMiles(distance)} miles
            </Text>
          </Flex>
        </Flex>
      </CardButton>
    );
  } else if (currentPlace && currentPlace.error) {
    return (
      <CardButton w="full" p={4} borderColor="red">
        <Flex textAlign="left" direction="column" align="start">
          <Text fontSize="md" fontWeight="bold" color="red.600">
            Error Loading Service
          </Text>
          <Text fontSize="sm" w="full">
            Please contact someone if you expect this to be working.
          </Text>
        </Flex>
      </CardButton>
    );
  } else if (!currentPlace) {
    return (
      <CardButton w="full" p={4}>
        <SkeletonText noOfLines={3} spacing={4} />
      </CardButton>
    );
  }
}

ServiceListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ServiceListItem;
