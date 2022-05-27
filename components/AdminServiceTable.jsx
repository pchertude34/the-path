import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { query } from '../utils/constants';
import LoadingRows from './LoadingRows';

function AdminServiceTable(props) {
  const { items, isLoading, ...rest } = props;

  return (
    <Table id="services" {...rest}>
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

AdminServiceTable.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  }),
};

function AdminServiceTableItem(props) {
  const { id, description } = props;
  const router = useRouter();

  return (
    <Tr
      _hover={{ bg: 'primary.50' }}
      cursor="pointer"
      onClick={() => router.push(`/admin/service/${id}`)}
    >
      <Td>
        <Text fontWeight="semibold">{id}</Text>
      </Td>
      <Td>
        <Text>{description}</Text>
      </Td>
    </Tr>
  );
}

AdminServiceTable.propTypes = {
  id: PropTypes.string.isRequired,
  decsription: PropTypes.string,
};

export default AdminServiceTable;
