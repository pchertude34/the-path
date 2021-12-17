import React from 'react';
import { Box } from '@chakra-ui/react';

function CardButton(props) {
  const { onClick, active = false, children, ...rest } = props;
  return (
    <Box
      as="button"
      onClick={onClick}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
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

export default CardButton;
