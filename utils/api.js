import axios from 'axios';

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

export function getAdminProviderList({ from, size }) {
  return axios
    .get('/api/admin/providers', {
      params: { from, size },
    })
    .then((response) => response.data);
}
