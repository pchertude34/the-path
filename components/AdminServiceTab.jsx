import React from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import usePagination from '../hooks/usePagination';
import Pagination from './Pagination';
import AdminServiceTable from './AdminServiceTable';

import { getAdminServiceTypeList } from '../utils/api';

import { query } from '../utils/constants';

function AdminServiceTab() {
  const { currentPage, updatePage, totalItems, setTotalItems, from } = usePagination({
    size: query.DEFAULT_SIZE,
  });

  const { isLoading, isError, isFetching, data, error } = useQuery(
    ['admin-services', from],
    async () => {
      const data = await getAdminServiceTypeList({ from, size: query.DEFAULT_SIZE });
      setTotalItems(data.total);
      return data;
    }
  );

  return (
    <Box mt={4} bg="gray.50" borderRadius="md" p={{ base: 4, md: 8 }}>
      <Flex wrap="wrap">
        <Heading as="h1" mb={4} align="left">
          Service Types
        </Heading>
        <Button variant="outline" colorScheme="primary" bg="white" leftIcon={<AddIcon />} ml="auto">
          Add Service Type
        </Button>
      </Flex>
      <Box overflow="scroll">
        <AdminServiceTable
          items={data?.items}
          isLoading={isLoading}
          pageSize={query.DEFAULT_SIZE}
          mb={4}
        />
      </Box>
      <Pagination
        currentPage={currentPage}
        pageSize={query.DEFAULT_SIZE}
        totalItems={totalItems}
        updateCurrentPage={updatePage}
      />
    </Box>
  );
}

export default AdminServiceTab;
