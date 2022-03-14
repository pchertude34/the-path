import React from 'react';
import { getSession } from 'next-auth/react';
import { Box, Container, Heading, useToast } from '@chakra-ui/react';

import { createAdminProvider } from '~/utils/api';

import AdminBackButton from '~/components/AdminBackButton';
import AdminProviderForm from '~/components/AdminProviderForm';
import AdminLayout from '~/components/AdminLayout';

function CreateProviderPage() {
  const toast = useToast();

  /**
   * Function to create a provider given provider data.
   * @param {object} providerData The data used to create a provider, recieved from the provider form.
   * @returns {Proimse} a promise that resolves when the provider is created.
   */
  async function handleFormSubmit(providerData) {
    return createAdminProvider(providerData)
      .then(() =>
        toast({
          title: 'Provider Added',
          description: `${providerData.name} successfully added as a provider.`,
          status: 'success',
          isClosable: true,
        })
      )
      .catch(() =>
        toast({
          title: 'Failed to Add Provider',
          description: 'Provider failed to create, please fix any errors and try again.',
          status: 'error',
          isClosable: true,
        })
      );
  }

  return (
    <Box mt={8}>
      <AdminBackButton label="Back to Provider List" href="/admin" />
      <Container maxW="2xl" p={0} mt={8}>
        <Heading as="h1" mb={4}>
          Add a Provider
        </Heading>
        <AdminProviderForm onSubmit={handleFormSubmit} />
      </Container>
    </Box>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        statusCode: 302,
      },
    };
  }

  return { props: {} };
}

CreateProviderPage.layout = AdminLayout;
export default CreateProviderPage;
