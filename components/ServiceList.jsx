import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getServiceList } from '../utils/api';
import ServiceListItem from './ServiceListItem';
import MapWrapper from './MapWrapper';

function ServiceList(props) {
  const { distance, latitude, longitude, serviceType, setAnimationIn } = props;
  const [selectedService, setSelectedService] = useState();
  const { isIdle, isLoading, isError, isFetching, data, error, refetch } = useQuery(
    ['service-list', serviceType],
    () => getServiceList({ distance, latitude, longitude, serviceType }),
    { enabled: false }
  );

  console.log(`selectedService`, selectedService);
  useEffect(() => {
    if (distance && latitude && longitude && serviceType) {
      refetch();
    }
  }, [distance, latitude, longitude, serviceType, refetch]);

  useEffect(() => {
    if (data) setAnimationIn(true);
  }, [data, setAnimationIn]);

  console.log(`data`, data);

  return (
    <div>
      <Flex w="full" h="full" spacing={10}>
        <Box w="400px" mr={4}>
          {data &&
            data.map((service) => (
              <ServiceListItem
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                active={service.id === selectedService}
                {...service}
              />
            ))}
        </Box>
        <Box w="full">
          <MapWrapper latitude={latitude} longitude={longitude} />
        </Box>
      </Flex>
    </div>
  );
}

ServiceList.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  serviceType: PropTypes.string,
};

export default ServiceList;
