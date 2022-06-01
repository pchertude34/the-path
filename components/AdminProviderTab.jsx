import React, { useState, useCallback } from 'react';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import usePagination from '../hooks/usePagination';
import AdminProviderTable from './AdminProviderTable';
import AdminSearchBar from './AdminSearchBar';
import Pagination from './Pagination';

import { getAdminProviderList } from '../utils/api';
import { query } from '../utils/constants';

function AdminProviderTab() {
  const [searchValue, setSearchValue] = useState('');
  const { currentPage, updatePage, totalItems, setTotalItems, from, setFrom } = usePagination({
    size: query.DEFAULT_SIZE,
  });

  const { isLoading, isError, isFetching, data, error } = useQuery(
    ['admin-providers', from, searchValue],
    // Signal is used to cancel requests on page change
    // https://react-query.tanstack.com/guides/query-cancellation#using-axios
    async ({ signal }) => {
      const data = await getAdminProviderList({
        from,
        size: query.DEFAULT_SIZE,
        q: searchValue,
        signal,
      });
      setTotalItems(data.total);
      return data;
    },
    { keepPreviousData: true }
  );

  /**
   * Handler for the search input.
   * @param {string} value the search value
   */
  const handleSearchChange = useCallback(
    (value) => {
      setSearchValue(value);
      // Reset the "from" value for the provider query anytime the search value changes.
      // This will bring the user back to "page 1" with the new search term in effect.
      setFrom(0);
    },
    [setFrom]
  );

  return (
    <Box mt={4} borderColor="gray.300" borderRadius="md" p={{ base: 4, md: 8 }} bg="gray.50">
      <Flex>
        <Heading as="h1" mb={4} align="left">
          Providers
        </Heading>
        <NextLink href="/admin/provider/create" passHref>
          <Button
            as="a"
            variant="outline"
            colorScheme="primary"
            bg="white"
            leftIcon={<AddIcon />}
            ml="auto"
          >
            Add Provider
          </Button>
        </NextLink>
      </Flex>
      <Flex mb={4}>
        <AdminSearchBar onChange={handleSearchChange} />
      </Flex>
      <Box overflow="scroll">
        <AdminProviderTable items={data?.items} isLoading={isLoading} mb={4} />
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

export default AdminProviderTab;
