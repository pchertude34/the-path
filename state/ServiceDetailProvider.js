import React, { useContext, createContext, useReducer } from 'react';
import { initialState, serviceDetailReducer } from './serviceDetailReducer';

const ServiceDetailContext = createContext();

export function ServiceDetailProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(serviceDetailReducer, initialState);

  return (
    <ServiceDetailContext.Provider value={{ state, dispatch }}>
      {children}
    </ServiceDetailContext.Provider>
  );
}

export function useServiceDetailContext() {
  return useContext(ServiceDetailContext);
}
