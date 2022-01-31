import React from 'react';
import PropTypes from 'prop-types';
import { Button, HStack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

function Pagination(props) {
  const { currentPage, pageSize, totalItems, updateCurrentPage, ...rest } = props;
  const lastPage = Math.ceil(totalItems / pageSize) || 1;

  function handleNextClicked() {
    if (currentPage * pageSize < totalItems) {
      updateCurrentPage(currentPage + 1);
    }
  }

  function handlePrevClicked() {
    if (currentPage > 1) {
      updateCurrentPage(currentPage - 1);
    }
  }

  function handleFirstClicked() {
    if (currentPage > 1) {
      updateCurrentPage(1);
    }
  }

  function handleLastClicked() {
    if (currentPage < lastPage) {
      updateCurrentPage(lastPage);
    }
  }

  return (
    <HStack spacing={4} justify="center" {...rest}>
      <Button onClick={handleFirstClicked} disabled={currentPage === 1} size="sm">
        First
      </Button>
      <Button
        onClick={handlePrevClicked}
        disabled={currentPage === 1}
        size="sm"
        colorScheme="primary"
      >
        <ArrowBackIcon />
      </Button>
      <span>
        {currentPage} - {lastPage}
      </span>
      <Button
        onClick={handleNextClicked}
        disabled={currentPage >= lastPage}
        size="sm"
        colorScheme="primary"
      >
        <ArrowForwardIcon />
      </Button>
      <Button onClick={handleLastClicked} disabled={currentPage >= lastPage} size="sm">
        Last
      </Button>
    </HStack>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  updateCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
