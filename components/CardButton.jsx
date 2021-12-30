import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

function CardButton(props) {
  const { onClick, active = false, disabled = false, children, ...rest } = props;
  return (
    <Box
      as="button"
      onClick={() => onClick && onClick()}
      borderWidth="1px"
      borderColor="gray.200"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      bg={active ? 'secondary.500' : 'white'}
      _hover={{ bg: 'secondary.400' }}
      _active={{
        bg: 'secondary.500',
        transform: 'scale(0.98)',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

CardButton.propTypes = {
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CardButton;
