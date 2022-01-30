import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useSession } from 'next-auth/react';
import usePagination from '../hooks/usePagination';
import AdminProviderTable from './AdminProviderTable';
import Pagination from './Pagination';
import { getAdminProviderList } from '../utils/api';
import { query } from '../utils/constants';

function AdminProviderTab() {
  const { data: session, status } = useSession();
  const { currentPage, updatePage, totalItems, setTotalItems, from } = usePagination({
    size: query.DEFAULT_SIZE,
  });

  const { isLoading, isError, isFetching, data, error } = useQuery(
    ['admin-providers', from],
    async () => {
      const data = await getAdminProviderList({ from, size: query.DEFAULT_SIZE });
      setTotalItems(data.total);
      return data;
    }
  );

  return (
    <Box mt={4} borderColor="gray.300" borderRadius="md" p={8} bg="gray.50">
      <Flex>
        <Heading as="h1" mb={4} align="left">
          Providers
        </Heading>
        <Button variant="outline" colorScheme="primary" bg="white" leftIcon={<AddIcon />} ml="auto">
          Add New Provider
        </Button>
      </Flex>
      <Flex mb={4}>
        <Input placeholder="Search by name or address" maxW="400px" bg="white" />
      </Flex>
      <AdminProviderTable
        items={data?.items}
        isLoading={isLoading}
        pageSize={query.DEFAULT_SIZE}
        mb={4}
      />
      <Pagination
        currentPage={currentPage}
        pageSize={query.DEFAULT_SIZE}
        totalItems={totalItems}
        updateCurrentPage={updatePage}
      />
    </Box>
  );
}

export default AdminProviderTab;
