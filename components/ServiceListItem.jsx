import React from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import CardButton from './CardButton';

function ServiceListItem(props) {
  const { name, active, city, street, onClick } = props;

  return (
    <CardButton onClick={onClick} w="full" p={4} active={active}>
      <VStack textAlign="left" spacing={0} align="stretch">
        <Text fontSize="md" fontWeight="bold">
          {name}
        </Text>
        <Text fontSize="sm">
          {street}, {city} OR
        </Text>
      </VStack>
    </CardButton>
  );
}

export default ServiceListItem;
