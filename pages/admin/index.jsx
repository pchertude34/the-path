import React from 'react';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../components/AdminLayout';
import AdminProviderTab from '../../components/AdminProviderTab';

function AdminHome() {
  return (
    <Box mt={4}>
      <Tabs variant="solid-rounded" colorScheme="primary" align="center">
        <TabList>
          <Tab>Providers</Tab>
          <Tab>Service Types</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminProviderTab />
          </TabPanel>
          <TabPanel>Service Types</TabPanel>
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
