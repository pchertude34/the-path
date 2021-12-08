import React from 'react';
import PropTypes from 'prop-types';
import { Box, VStack, Text } from '@chakra-ui/react';

function ServiceTypeCard(props) {
  const { title, icon, onClick, isSelected = false, ...rest } = props;

  return (
    <Box
      as="button"
      onClick={() => onClick && onClick()}
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.200"
      boxShadow={isSelected ? 'none' : 'lg'}
      alignContent="center"
      bgColor={isSelected ? 'primary.400' : 'white'}
      w="full"
      h="full"
      p={6}
      _hover={
        !isSelected
          ? {
              bgColor: 'primary.300',
              boxShadow: 'none',
              transform: 'translateY(4px)',
              transition: 'all .2s',
            }
          : {}
      }
      {...rest}
    >
      <VStack>
        <Text size="md" fontWeight="bold">
          {title}
        </Text>
      </VStack>
    </Box>
  );
}

ServiceTypeCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default ServiceTypeCard;
