import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

function AdminServiceTable(props) {
  const { providerList, ...rest } = props;

  return (
    <Table {...rest}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Street Address</Th>
          <Th>State</Th>
          <Th>Zipcode</Th>
        </Tr>
      </Thead>
      <Tbody>{providerList}</Tbody>
    </Table>
  );
}

export default AdminServiceTable;
