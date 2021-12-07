import React, { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getServiceTypes } from '../utils/api';

import ServiceTypeCard from './ServiceTypeCard';

const DISTANCE_OPTIONS = [
  { label: '5 miles', value: 5000 },
  { label: '10 miles', value: 10000 },
  { label: '20 miles', value: 20000 },
];

function ServiceTypeContainer(props) {
  const { latitude, longitude } = props;
  const [distance, setDistance] = useState(10000);

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

  return (
    <div>
      <Select value={distance} bg="white" w={120} onChange={(e) => setDistance(e.target.value)}>
        {DISTANCE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default ServiceTypeContainer;
