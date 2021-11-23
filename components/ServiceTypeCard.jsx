import React from 'react';
import PropTypes from 'prop-types';
import { Box, VStack, Heading } from '@chakra-ui/react';

function ServiceTypeCard(props) {
  const { title, icon, onClick, isSelected = false, ...rest } = props;

  return (
    <Box
      as="button"
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.200"
      boxShadow={isSelected ? 'none' : '2xl'}
      alignContent="center"
      bgColor={isSelected ? 'secondary.400' : 'white'}
      w="full"
      h="full"
      p={6}
      _hover={
        !isSelected
          ? {
              bgColor: 'secondary.400',
              boxShadow: 'none',
              transform: 'translateY(4px)',
              transition: 'all .2s',
            }
          : {}
      }
      {...rest}
    >
      <VStack>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Heading as="h3" size="lg">
          {icon}
        </Heading>
      </VStack>
    </Box>
  );
}

ServiceTypeCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default ServiceTypeCard;
