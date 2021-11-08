import React from 'react';
import { Box, Center, Heading, Text, Stack } from '@chakra-ui/react';

function FormCard(props) {
  const { children } = props;
  return (
    <Center py={12}>
      <Box
        role="group"
        bg={'white'}
        p={{ base: 0, md: 6 }}
        w="full"
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        {children}
      </Box>
    </Center>
  );
}

export default FormCard;
