import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, SlideFade, Text, VStack } from '@chakra-ui/react';

function PathFormItem(props) {
  const { defaultAnimationIn = false, title, description, children, ...rest } = props;
  const [animationIn, setAnimationIn] = useState(defaultAnimationIn);

  return (
    <SlideFade offsetY="20px" in={animationIn}>
      <VStack w="full" bg="gray.50" borderRadius="md" p={{ base: 4, md: 8 }} {...rest}>
        <Box w="full" mb={4}>
          <Heading as="h2" size="lg">
            {title}
          </Heading>
          <Text fontSize="md" textColor="gray.600">
            {description}
          </Text>
        </Box>
        {/* Allow the child to trigger the animation and mount itself when it's ready 
        by passing the setAnimationIn function to it */}
        <Box w="full">{children && React.cloneElement(children, { setAnimationIn })}</Box>
      </VStack>
    </SlideFade>
  );
}

PathFormItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  defaultAnimationIn: PropTypes.bool,
};

export default PathFormItem;
