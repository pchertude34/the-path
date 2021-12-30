export const types = {
  ADD_SERVICE: 'ADD_SERVICE',
  SET_SERVICE_ERROR: 'SET_SERVICE_ERROR',
  CLEAR_SERVICES: 'CLEAR_SERVICES',
};

export const initialState = {
  serviceMap: {},
};

export function serviceDetailReducer(state, action) {
  console.log(`state`, state);
  switch (action.type) {
    case types.ADD_SERVICE:
      const updatedServiceMap = { ...state.serviceMap };
      updatedServiceMap[action.payload.placeId] = action.payload;

      return {
        ...state,
        serviceMap: updatedServiceMap,
      };
    case types.SET_SERVICE_ERROR: {
      const { placeId, error } = action.payload;
      const updatedServiceMap = { ...state.serviceMap };
      updatedServiceMap[placeId]
        ? (updatedServiceMap[placeId] = { error })
        : (updatedServiceMap[placeId].error = error);

      return {
        ...state,
        serviceMap: updatedServiceMap,
      };
    }

    case types.CLEAR_SERVICES:
      return {
        ...state,
        serviceMap: {},
      };
    default:
      return state;
  }
}
