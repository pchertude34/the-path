import React from 'react';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../components/AdminLayout';
import AdminProviderTab from '../../components/AdminProviderTab';
import AdminServiceTab from '../../components/AdminServiceTab';
function AdminHome() {
  return (
    <Box mt={4}>
      {/* We set ID here because chakra will produce some weird id mismatch error otherwise: https://github.com/chakra-ui/chakra-ui/issues/4328 */}
      <Tabs id="service-provider-tabs" variant="solid-rounded" colorScheme="primary" align="center">
        <TabList>
          <Tab id="providers-tab">Providers</Tab>
          <Tab id="services-tab">Service Types</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={{ base: 0, md: 4 }}>
            <AdminProviderTab />
          </TabPanel>
          <TabPanel p={{ base: 0, md: 4 }}>
            <AdminServiceTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  // Redirect non admin users back to the home page since they don't belong here.
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

AdminHome.layout = AdminLayout;
export default AdminHome;
