import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

/**
 * Component to navigate the user to the previous page.
 */
function AdminBackButton(props) {
  const { label, ...rest } = props;
  const router = useRouter();

  return (
    <Button
      leftIcon={<ArrowBackIcon />}
      variant="link"
      colorScheme="primary"
      onClick={() => router.back()}
      {...rest}
    >
      {label}
    </Button>
  );
}

AdminBackButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default AdminBackButton;
