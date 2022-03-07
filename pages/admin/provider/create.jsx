import React, { useState, useEffect, useRef } from 'react';
import { prisma, PrismaClient } from '@prisma/client';
import { Box, Container } from '@chakra-ui/react';

import AdminBackButton from '../../../components/AdminBackButton';
import AdminProviderForm from '../../../components/AdminProviderForm';
import { getSession } from 'next-auth/react';

function CreateProviderPage(props) {
  const { serviceTypes } = props;

  return (
    <Box mt={8}>
      <AdminBackButton label="Back to Provider List" />
      <Container maxW="2xl" p={0} mt={8}>
        <AdminProviderForm serviceTypes={serviceTypes} onSubmit={() => {}} />
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

  const prisma = new PrismaClient();
  let serviceTypes = await prisma.service.findMany();

  return { props: { serviceTypes } };
}

export default CreateProviderPage;
