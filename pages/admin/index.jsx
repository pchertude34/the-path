import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Box, Heading } from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/react';
import usePagination from '../../hooks/usePagination';
import AdminProviderTable from '../../components/AdminProviderTable';
import AdminLayout from '../../components/AdminLayout';
import Pagination from '../../components/Pagination';
import { getAdminProviderList } from '../../utils/api';
import { query } from '../../utils/constants';

function AdminHome() {
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
    <Box mt={8} borderColor="gray.300" borderRadius="md" p={8} bg="gray.50">
      <Heading as="h1">Providers</Heading>
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

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  // Redirect non admin users back to the home page since they don't belong here.
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        statusCode: 302,
      },
    };
  }

  return { props: {} };
}

AdminHome.layout = AdminLayout;
export default AdminHome;
