import { useState, useEffect } from 'react';
import { DEFAULT_PAGINATION_SIZE } from '../utils/constants';

/**
 * Hook for helping with pagination. This is nice to use with our pagination component.
 * @param {number} param0.size The number of items to load per page
 * @param {number} param0.startingFrom The item number in the api to start from. The page will contain items "startFrom" to "startFrom + size"
 * @param {function} param0.onPageChange Function to run when the page changes. This can be whatever the consumer of the hook wants to do when the page changes.
 */
function usePagination({ size = DEFAULT_PAGINATION_SIZE, startingFrom, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [from, setFrom] = useState(startingFrom || 0);

  /**
   * Reset the page size to 0 any time the item count changes.
   * When the item count changes, that means the user probably updated their search,
   * so we want to start from the begining of the list.
   */
  useEffect(() => {
    setFrom(0);
    setCurrentPage(1);
  }, [totalItems]);

  /**
   * Update the "currentPage" and "from" state values.
   * @param {number} newPageNumber The number of the new page to navigate to.
   */
  function updatePage(newPageNumber) {
    const updatedFrom = (newPageNumber - 1) * size;

    setFrom(updatedFrom);
    setCurrentPage(newPageNumber);
    onPageChange && typeof onPageChange === 'function' && onPageChange();
  }

  return {
    currentPage,
    updatePage,
    totalItems,
    setTotalItems,
    from,
    setFrom,
  };
}

export default usePagination;
