import React, { useState, useEffect } from 'react';
import { Alert, SimpleGrid, Select } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getServiceTypes } from '../utils/api';

import ServiceTypeCard from './ServiceTypeCard';
import MessageBox from './MessageBox';

const DISTANCE_OPTIONS = [
  { label: '5 miles', value: 5000 },
  { label: '10 miles', value: 10000 },
  { label: '20 miles', value: 20000 },
];

function ServiceTypeContainer(props) {
  // setAnimationIn prop comes from the parent PathFormItem component
  const { latitude, longitude, onServiceTypeSelected, setAnimationIn } = props;
  const [distance, setDistance] = useState(10000);
  const [selectedServiceType, setSelectedServiceType] = useState();

  // We need to delay the initial query until we have latitude, longitude, and distance
  // Otherwise we will get bad results.
  const { isIdle, isLoading, isError, isFetching, data, error, refetch } = useQuery(
    ['service-types', distance],
    () => getServiceTypes({ distance, latitude, longitude }),
    { enabled: false }
  );

  // Query the service types when we have all of the pieces, or when any of them change.
  useEffect(() => {
    if (distance && latitude && longitude) {
      refetch();
    }
  }, [distance, latitude, longitude, refetch]);

  // Animate the component in when once the data loads
  useEffect(() => {
    if (data) setAnimationIn(true);
  }, [data, setAnimationIn]);

  // Pass the selected service type to the parent whenever it changes.
  useEffect(() => {
    onServiceTypeSelected && onServiceTypeSelected(selectedServiceType);
  }, [selectedServiceType, onServiceTypeSelected]);

  return (
    <div>
      <Select
        value={distance}
        bg="white"
        w={120}
        onChange={(e) => setDistance(e.target.value)}
        mb={4}
      >
        {DISTANCE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {data && data.length > 0 && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} maxH={400} overflow="auto" py={4}>
          {data.map((serviceType) => (
            <ServiceTypeCard
              key={serviceType.id}
              title={serviceType.description}
              isSelected={selectedServiceType === serviceType.id}
              onClick={() => setSelectedServiceType(serviceType.id)}
            />
          ))}
        </SimpleGrid>
      )}

      {data && data.length === 0 && (
        <MessageBox message="We couldn't find any services near you within the selected distance." />
      )}

      {isLoading && <MessageBox isLoading />}

      {isError && (
        <Alert status="error">
          We encountered an error while searching for services. Please try again later.
        </Alert>
      )}
    </div>
  );
}

export default ServiceTypeContainer;
