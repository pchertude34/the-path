import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import { getServiceList } from '../utils/api';
import { ServiceDetailProvider } from '../state/ServiceDetailProvider';
import ServiceListItem from './ServiceListItem';

// limit for the amount of service place details we load per page
const SERVICE_PAGE_SIZE = 5;

function ServiceList(props) {
  const { distance, latitude, longitude, serviceType, setAnimationIn } = props;
  const [map, setMap] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [servicePageData, setServicePageData] = useState([]);
  const [selectedService, setSelectedService] = useState();
  const mapRef = useRef();

  const { isIdle, isLoading, isError, isSuccess, isFetching, data, error, refetch } = useQuery(
    ['service-list', serviceType],
    () => getServiceList({ distance, latitude, longitude, serviceType }),
    { enabled: false }
  );

  const lastPage = Math.ceil((data?.length || 1) / SERVICE_PAGE_SIZE);

  // Initialize the google map. Change it when the user location changes so we can recenter it.
  useEffect(() => {
    if (mapRef.current) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          mapTypeControl: false,
          zoom: 10,
        })
      );
    }
  }, [mapRef, latitude, longitude]);

  useEffect(() => {
    let currentLocationMarker;

    if (map && latitude && longitude) {
      currentLocationMarker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        icon: '/my_location.svg',
      });
      currentLocationMarker.setMap(map);
    }

    return () => {
      if (currentLocationMarker) {
        currentLocationMarker.setMap(null);
      }
    };
  }, [map, latitude, longitude]);
  // fetch the service list data any time the location, or selected service type changes.
  useEffect(() => {
    if (distance && latitude && longitude && serviceType) {
      refetch();
      setCurrentPage(1);
    }
  }, [distance, latitude, longitude, serviceType, refetch]);

  // Animate the card into view.
  useEffect(() => {
    if (data) setAnimationIn(true);
  }, [data, setAnimationIn]);

  useEffect(() => {
    if (data) {
      const currentPageData = data.slice(
        (currentPage - 1) * SERVICE_PAGE_SIZE,
        currentPage * SERVICE_PAGE_SIZE
      );

      setServicePageData(currentPageData);
    }
  }, [currentPage, data]);

  return (
    <Flex w="full" h="full" spacing={10}>
      <VStack>
        <ServiceDetailProvider>
          <Box w="400px" mr={4} maxH={500} overflow="auto">
            {servicePageData &&
              servicePageData.map((service) => (
                <ServiceListItem
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  active={service.id === selectedService}
                  map={map}
                  {...service}
                />
              ))}
          </Box>
        </ServiceDetailProvider>

        <HStack spacing={12}>
          <IconButton
            aria-label="page-back"
            icon={<ArrowBackIcon />}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          <Text>
            {currentPage} of {lastPage}
          </Text>
          <IconButton
            aria-label="page-forward"
            icon={<ArrowForwardIcon />}
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </HStack>
      </VStack>
      <Box w="full">
        {/* <MapWrapper latitude={latitude} longitude={longitude} /> */}
        <div ref={mapRef} style={{ height: '500px' }}></div>
      </Box>
    </Flex>
  );
}

ServiceList.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  serviceType: PropTypes.string,
};

export default ServiceList;
