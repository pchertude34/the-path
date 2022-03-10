import React from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

/**
 * Component to navigate the user to the previous page.
 */
function AdminBackButton(props) {
  const { label, href, ...rest } = props;
  const router = useRouter();

  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        leftIcon={<ArrowBackIcon />}
        variant="link"
        colorScheme="primary"
        onClick={() => router.back()}
        {...rest}
      >
        {label}
      </Button>
    </NextLink>
  );
}

AdminBackButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default AdminBackButton;
