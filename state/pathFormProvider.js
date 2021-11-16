import React, { useContext, createContext, useReducer } from 'react';
import { initialState, pathFormReducer } from './pathFormReducer';

const PathFormContext = createContext();

export function PathFormProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(pathFormReducer, initialState);

  return (
    <PathFormContext.Provider value={{ state, dispatch }}>{children}</PathFormContext.Provider>
  );
}

export function usePathFormState() {
  return useContext(PathFormContext);
}
