import { useState, useEffect, useRef } from 'react';

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeout = useRef();

  useEffect(() => {
    // Clear the timeout if one exists. This resets the debounce.
    if (timeout.current) clearTimeout(timeout.current);

    // Set the debounce timer. Once it expires, the value will change.
    timeout.current = setTimeout(() => {
      setDebouncedValue(value);
    }, [delay]);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
