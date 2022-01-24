import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SignIn() {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack w="400px" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button colorScheme="primary">Sign in</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
