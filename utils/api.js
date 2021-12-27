import axios from 'axios';

const { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } = process.env;

export function getServiceTypes({ distance, latitude, longitude }) {
  return axios
    .get('/api/getServiceTypes', {
      params: { distance, lat: latitude, lng: longitude },
    })
    .then((response) => response.data);
}

export function getServiceList({ distance, latitude, longitude, serviceType }) {
  return axios
    .get('/api/getServiceList', {
      params: { distance, lat: latitude, lng: longitude, serviceType },
    })
    .then((response) => response.data);
}

export function getPlaceDetails(placeId) {
  return axios
    .get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        fields: 'opening_hours/open_now,formatted_phone_number,website',
      },
    })
    .then((response) => response.data);
}
