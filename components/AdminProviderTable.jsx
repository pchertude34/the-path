import React from 'react';
import PropTypes from 'prop-types';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

function AdminProviderTable(props) {
  const { items, ...rest } = props;

  return (
    <Table variant={'striped'} overflow="auto" {...rest}>
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
  const { name, street, state, zip } = props;

  return (
    <Tr>
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
