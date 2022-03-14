import React from 'react';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { Box, Container, Heading } from '@chakra-ui/react';

import AdminBackButton from '~/components/AdminBackButton';
import AdminLayout from '~/components/AdminLayout';
import AdminProviderForm from '~/components/AdminProviderForm';

function ProviderPage(props) {
  const { provider } = props;

  const initialValues = {
    placeId: provider.placeId,
    name: provider.name,
    address: provider.address,
    serviceTypes: provider.serviceTypes,
    description: provider.description,
  };

  return (
    <Box mt={4}>
      <AdminBackButton label="Back to Provider List" href="/admin" />
      <Container maxW="2xl" p={0} mt={8}>
        <Heading as="h1" mb={4}>
          {provider.name}
        </Heading>
        <AdminProviderForm
          showPlaceSearch={false}
          initialValues={initialValues}
          onSubmit={() => {}}
        />
      </Container>
    </Box>
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

  return { props: { provider: JSON.parse(JSON.stringify(provider)) } };
}

ProviderPage.layout = AdminLayout;
export default ProviderPage;
