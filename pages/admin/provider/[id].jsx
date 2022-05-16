import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { Stack, Button, Box, Container, Divider, Heading, Text, useToast } from '@chakra-ui/react';

import { deleteAdminProviderById } from '~/utils/api';

import AdminBackButton from '~/components/AdminBackButton';
import AdminLayout from '~/components/AdminLayout';
import AdminProviderForm from '~/components/AdminProviderForm';
import ConfirmationModal from '~/components/ConfirmationModal';

function ProviderPage(props) {
  const { provider } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const initialValues = {
    placeId: provider.placeId,
    name: provider.name,
    address: provider.address,
    serviceTypes: provider.serviceTypes,
    description: provider.description,
  };

  function handleDeleteProvider() {
    deleteAdminProviderById(provider.id)
      .then(() => {
        toast({
          title: 'Delete Successful',
          description: `${provider.name} successfully deleted`,
          status: 'success',
          isClosable: true,
        });

        // Navigate the user back to the Admin Provider List tab
        router.replace({ pathname: '/admin', query: { tab: 'provier' } });
      })
      .catch(() =>
        toast({
          title: 'Failed to Delete Provider',
          description: `${provider.name} failed to be deleted. Please try again.`,
          status: 'error',
          isClosable: true,
        })
      );
  }

  return (
    <React.Fragment>
      <Box mt={4}>
        <AdminBackButton label="Back to Provider List" href="/admin" />
        <Container maxW="2xl" p={0} mt={8}>
          <Heading as="h1" mb={4}>
            {provider.name}
          </Heading>
          <AdminProviderForm
            showPlaceSearch={false}
            submitButtonText="Update Provider"
            initialValues={initialValues}
            onSubmit={() => {}}
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
              Delete Provider
            </Button>
          </Stack>
        </Container>
      </Box>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteProvider}
        headerText={`Delete ${provider.name}`}
        bodyText="Are you sure you want to delete this provider? This action is not undoable."
        confirmButtonText="Delete"
        confirmButtonColorScheme="red"
      />
    </React.Fragment>
  );
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });
  const prisma = new PrismaClient();
  const { id } = params;

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        statusCode: 302,
      },
    };
  }

  const provider = await prisma.provider.findUnique({
    where: { id: parseInt(id, 10) },
  });

  return { props: { provider: JSON.parse(JSON.stringify({ id, ...provider })) } };
}

ProviderPage.layout = AdminLayout;
export default ProviderPage;
