import React from 'react';
import PropTypes from 'prop-types';
import { Box, Spinner, Text } from '@chakra-ui/react';

function MessageBox(props) {
  const { isLoading = false, message, ...rest } = props;

  return (
    <Box bgColor="white" w="100%" py={8} textAlign="center" {...rest}>
      {isLoading && <Spinner size="xl" color="primary.500" />}
      {message && <Text size="md">{message}</Text>}
    </Box>
  );
}

export default MessageBox;
