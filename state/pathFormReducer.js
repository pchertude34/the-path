export const types = {
  UPDATE_STREET_ADDRESS_1: 'UPDATE_STREET_ADDRESS_1',
  UPDATE_CITY: 'UPDATE_CITY',
  UPDATE_STATE: 'UPDATE_STATE',
  UPDATE_ZIP: 'UPDATE_ZIP',
  UPDATE_LAT: 'UPDATE_LAT',
  UPDATE_LNG: 'UDPATE_LNG',
};

export const initialState = {
  streetAddress1: '',
  city: '',
  state: '',
  zip: '',
  lat: undefined,
  lng: undefined,
};

export function pathFormReducer(state, action) {
  console.log(`state`, state);
  switch (action.type) {
    case types.UPDATE_STREET_ADDRESS_1:
      return {
        ...state,
        streetAddress1: action.payload,
      };
    case types.UPDATE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case types.UPDATE_STATE:
      return {
        ...state,
        state: action.payload,
      };
    case types.UPDATE_ZIP:
      return {
        ...state,
        zip: action.payload,
      };
    case types.UPDATE_LAT:
      return {
        ...state,
        lat: action.payload,
      };
    case types.UPDATE_LNG:
      return {
        ...state,
        lng: action.payload,
      };
    default:
      return state;
  }
}
