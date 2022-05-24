import React from 'react';
import { Box, Container, Heading, useToast } from '@chakra-ui/react';

import { createAdminService } from '~/utils/api';
import AdminBackButton from '~/components/AdminBackButton';
import AdminServiceForm from '~/components/AdminServiceForm';

function CreateServicePage() {
  const toast = useToast();

  /**
   * Handler for submitting a new service to the api.
   * @param {object} serviceData The data to submit to the api on form submission.
   * @returns a promise that resolves when the api request is complete
   */
  async function handleFormSubmit(serviceData) {
    return createAdminService(serviceData)
      .then(() => {
        toast({
          title: 'Service Added',
          description: `Service ${serviceData.id} successfully added.`,
          status: 'success',
          isClosable: true,
        });
      })
      .catch((error) =>
        toast({
          title: 'Failed to Create Service',
          description:
            error.response?.data ||
            `Failed to create service with id ${serviceData.id}. Please try again later.`,
          status: 'error',
          isClosable: true,
        })
      );
  }
  return (
    <Box mt={8}>
      <AdminBackButton label="Back to ServiceList" href="/admin" />
      <Container maxW="2xl" p={0} mt={8}>
        <Heading as="h1" mb={4}>
          Add Service
        </Heading>
        <AdminServiceForm onSubmit={handleFormSubmit} />
      </Container>
    </Box>
  );
}

export default CreateServicePage;
