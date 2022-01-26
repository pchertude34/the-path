import React from 'react';
import { getSession, signIn } from 'next-auth/react';
import { Box, Button, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react';

export default function SignIn() {
  return (
    <Flex minH={'80vh'} align={'center'} justify={'center'}>
      <Stack
        w="400px"
        spacing={8}
        mx={'auto'}
        maxW={'lg'}
        py={{ base: 2, md: 12 }}
        px={{ base: 2, md: 6 }}
      >
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4} align={'center'}>
            <Heading fontSize={'2xl'}>Admin sign in</Heading>
            <Button
              w="full"
              colorScheme="primary"
              onClick={() => signIn('auth0', { callbackUrl: '/admin' })}
            >
              Sign in with Auth0
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  // Redirect the user to the main admin page if they are already signed in as an admin.
  if (session) {
    return {
      redirect: {
        destination: '/admin',
        statusCode: 302,
      },
    };
  }

  return { props: {} };
}
