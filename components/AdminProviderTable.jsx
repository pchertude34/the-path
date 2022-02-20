import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

function AdminProviderTable(props) {
  const { items, isLoading, ...rest } = props;

  return (
    <Table {...rest}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Street Address</Th>
          <Th>State</Th>
          <Th isNumeric>Zipcode</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items?.map((provider) => (
          <AdminProviderTableItem key={provider.id} {...provider} />
        ))}
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
