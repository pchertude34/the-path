import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

function PathFormItem(props) {
  const { title, description, children, ...rest } = props;

  return (
    <VStack w="full" bg="gray.50" borderRadius="md" p={8} {...rest}>
      <Box w="full" mb={4}>
        <Heading as="h2" size="lg">
          {title}
        </Heading>
        <Text fontSize="md" textColor="gray.600">
          {description}
        </Text>
      </Box>
      <Box w="full">{children}</Box>
    </VStack>
  );
}

PathFormItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PathFormItem;
