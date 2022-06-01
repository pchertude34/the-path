import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import useDebounce from '../hooks/useDebounce';

function AdminSearchBar(props) {
  const { onChange } = props;
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    onChange(debouncedSearchValue);
  }, [debouncedSearchValue, onChange]);

  return (
    <InputGroup size="md" maxW="400px">
      <Input
        placeholder="Search by name or address"
        bg="white"
        pr="4.5rem"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <InputRightElement w="2rem" pr={1}>
        <IconButton
          variant="ghost"
          h="1.75rem"
          size="sm"
          icon={<SmallCloseIcon />}
          onClick={() => setSearchValue('')}
        />
      </InputRightElement>
    </InputGroup>
  );
}

AdminSearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default AdminSearchBar;
