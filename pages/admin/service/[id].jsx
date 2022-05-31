import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { prisma } from '~/utils/database';
import { Box, Button, Container, Divider, Heading, Stack, Text, useToast } from '@chakra-ui/react';

import { updateAdminServiceById, deleteAdminServiceById } from '~/utils/api';

import AdminBackButton from '~/components/AdminBackButton';
import AdminLayout from '~/components/AdminLayout';
import AdminServiceForm from '~/components/AdminServiceForm';
import ConfirmationModal from '~/components/ConfirmationModal';

function ServicePage(props) {
  const { service } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const toast = useToast();

  // The initial values for the service form component
  const initialValues = {
    id: service.id,
    description: service.description,
  };

  function handleUpdateService(serviceData) {
    updateAdminServiceById(serviceData.id, serviceData)
      .then(() =>
        toast({
          title: 'Update Successful',
          description: `${service.id} successfully updated!`,
          status: 'success',
          isClosable: true,
        })
      )
      .catch((error) =>
        toast({
          title: 'Failed to Update Service',
          description:
            error.response?.message || `${service.id} failed to udpate. Please try again later.`,
          status: 'error',
          isClosable: true,
        })
      );
  }

  function handleDeleteService() {
    deleteAdminServiceById(service.id)
      .then(() => {
        toast({
          title: 'Delete Successful',
          description: `${service.id} successfully deleted.`,
          status: 'success',
          isClosable: true,
        });

        // Navigate the user back to the Admin Service List tab
        router.replace({ pathname: '/admin', query: { tab: 'services' } });
      })
      .catch((error) =>
        toast({
          title: 'Failed to Delete Service',
          description:
            error.response?.message ||
            `${service.id} failed to be deleted. Please try again later.`,
          status: 'error',
          isClosable: true,
        })
      );
  }

  return (
    <React.Fragment>
      <Box mt={4}>
        <AdminBackButton label="Back to Service List" href="/admin" />
        <Container maxW="2xl" p={0} mt={8}>
          <Heading as={'h1'} mb={4}>
            {service.id}
          </Heading>
          <AdminServiceForm
            initialValues={initialValues}
            onSubmit={handleUpdateService}
            submitButtonText="Update Service"
          />

          <Stack bg="red.100" borderRadius="md" p={4} mt={16} spacing={4}>
            <Box>
              <Heading as="h2" fontSize="2xl">
                Danger Zone
              </Heading>
              <Text>
                Be careful performing actions here! Things are not undoable and can cause permanent
                damage.
              </Text>
            </Box>
            <Divider borderColor="red.200" />
            <Button
              variant="outline"
              colorScheme="red"
              bg="white"
              onClick={() => setIsModalOpen(true)}
            >
              Delete Service
            </Button>
          </Stack>
        </Container>
      </Box>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteService}
        headerText={`Delete ${service.id}`}
        bodyText="Are you sure you want to delete this service? Deleting this service will remove it from all providers associated with it. This action is not undoable"
        confirmButtonText="delete"
        confirmButtonColorScheme="red"
      />
    </React.Fragment>
  );
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });
  const { id } = params;

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        statusCode: 302,
      },
    };
  }

  const service = await prisma.service.findUnique({
    where: { id },
  });

  return {
    props: {
      service: JSON.parse(JSON.stringify(service)),
    },
  };
}

ServicePage.layout = AdminLayout;
export default ServicePage;
