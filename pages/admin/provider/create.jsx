import React from 'react';
import { Box, Container, Input, Stack } from '@chakra-ui/react';
import AdminBackButton from '../../../components/AdminBackButton';
import LocationInput from '../../../components/PlaceSearch';

function CreateProviderPage() {
  return (
    <Box mt={8}>
      <AdminBackButton label="Back to Provider List" />
      <Container maxW="2xl" mt={8}>
        <Stack>
          <LocationInput
            label="Search for a Place"
            placeholder="Search for a place by Address or Name"
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default CreateProviderPage;
