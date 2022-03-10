import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Box } from '@chakra-ui/react';
import { getAdminProviderById } from '../../../utils/api';
import AdminBackButton from '../../../components/AdminBackButton';

function ProviderPage(props) {
  const router = useRouter();
  const { id } = router.query;

  console.log('id', id);

  const { isLoading, isError, isFetching, data, error } = useQuery(['admin-providers', id], () =>
    getAdminProviderById(id)
  );

  console.log('data', data);

  return (
    <Box mt={4}>
      <AdminBackButton label="Back to Provider List" href="/admin" />
      <Box mt={4} borderRadius="md" p={{ base: 4, md: 8 }} bg="gray.50">
        {data?.name}
      </Box>
    </Box>
  );
}

export default ProviderPage;
