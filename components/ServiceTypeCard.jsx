import React from 'react';
import PropTypes from 'prop-types';
import { Box, VStack, Tag, Text } from '@chakra-ui/react';
import CardButton from './CardButton';

function ServiceTypeCard(props) {
  const { title, icon, count, onClick, isSelected = false, ...rest } = props;

  return (
    <CardButton
      onClick={onClick}
      alignContent="center"
      w="full"
      h="full"
      p={6}
      active={isSelected}
      {...rest}
    >
      <VStack>
        <Text size="md" fontWeight="bold">
          {title}
        </Text>
        <Tag borderRadius="full">{count}</Tag>
      </VStack>
    </CardButton>
  );
}

ServiceTypeCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default ServiceTypeCard;
