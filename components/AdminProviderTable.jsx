import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { query } from '../utils/constants';
import LoadingRows from './LoadingRows';

function AdminProviderTable(props) {
  const { items, isLoading, ...rest } = props;

  return (
    <Table id="providers" {...rest}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Street Address</Th>
          <Th>State</Th>
          <Th isNumeric>Zipcode</Th>
        </Tr>
      </Thead>
      <Tbody>
        {isLoading ? (
          // I'm just going to hardcode the col count here since it coresponds to the number of Th elements in the table.
          // We don't ever need this to change here unless we update the table headers.
          <LoadingRows tableId="provider" colCount={4} rowCount={query.DEFAULT_SIZE} />
        ) : (
          items?.map((provider) => <AdminProviderTableItem key={provider.id} {...provider} />)
        )}
      </Tbody>
    </Table>
  );
}

AdminProviderTable.propTypes = {};

function AdminProviderTableItem(props) {
  const { id, name, street, state, zip } = props;
  const router = useRouter();

  return (
    <Tr
      _hover={{ bg: 'primary.50' }}
      cursor="pointer"
      onClick={() => router.push(`/admin/provider/${id}`)}
    >
      <Td>
        <Text fontWeight="semibold">{name}</Text>
      </Td>
      <Td>{street}</Td>
      <Td>
        <Text size="xs">Oregon</Text>
      </Td>
      <Td isNumeric>{zip}</Td>
    </Tr>
  );
}

AdminProviderTableItem.propTypes = {};

export default AdminProviderTable;
