import React, { useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import AdminLayout from '../../components/AdminLayout';

function AdminHome() {
  const { data: session, status } = useSession();
  console.log('status', status);

  useEffect(() => {}, [session]);

  if (session) {
    return <div>Admin Page</div>;
  } else {
    return null;
  }
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
