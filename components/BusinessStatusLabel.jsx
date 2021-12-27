import React from 'react';
import { Badge } from '@chakra-ui/react';

function BusinessStatusLabel(props) {
  const { isOpen, ...rest } = props;

  if (isOpen === true) {
    return (
      <Badge colorScheme="green" {...rest}>
        Open
      </Badge>
    );
  } else if (isOpen === false) {
    return (
      <Badge colorScheme="red" {...rest}>
        Closed
      </Badge>
    );
  } else {
    return null;
  }
}

export default BusinessStatusLabel;
