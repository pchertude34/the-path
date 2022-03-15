import React from 'react';
import PropTypes from 'prop-types';
import { Tr, Td, Skeleton } from '@chakra-ui/react';

function LoadingRows(props) {
  const { tableId, rowCount = 25, colCount } = props;

  return (
    <React.Fragment>
      {[...Array(rowCount).keys()].map((rowIndex) => (
        <Tr key={`${tableId}-row-${rowIndex}`} py={2}>
          {[...Array(colCount).keys()].map((colIndex) => (
            <Td key={`${tableId}-row-${rowIndex}-col-${colIndex}`}>
              <Skeleton height="20px" />
            </Td>
          ))}
        </Tr>
      ))}
    </React.Fragment>
  );
}

LoadingRows.propTypes = {
  tableId: PropTypes.string.isRequired,
  rowCount: PropTypes.number,
  colCount: PropTypes.number.isRequired,
};

export default LoadingRows;
