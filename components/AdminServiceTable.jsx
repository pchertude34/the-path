import React from 'react';
import PropTypes from 'prop-types';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { query } from '../utils/constants';
import LoadingRows from './LoadingRows';

function AdminServiceTable(props) {
  const { items, isLoading, ...rest } = props;

  return (
    <Table variant="striped" {...rest}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {isLoading ? (
          // query.DEFAULT_SIZE is the number of rows we load by default
          <LoadingRows tableId="services" colCount={2} rowCount={query.DEFAULT_SIZE} />
        ) : (
          items?.map((service) => <AdminServiceTableItem key={service.id} {...service} />)
        )}
      </Tbody>
    </Table>
  );
}

AdminServiceTable.propTypes = {};

function AdminServiceTableItem(props) {
  const { id, description } = props;

  return (
    <Tr>
      <Td>
        <Text fontWeight="semibold">{id}</Text>
      </Td>
      <Td>
        <Text>{description}</Text>
      </Td>
    </Tr>
  );
}

AdminServiceTable.propTypes = {};

export default AdminServiceTable;
