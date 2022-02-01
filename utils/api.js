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

export function getAdminProviderList({ from, size, signal }) {
  return axios
    .get('/api/admin/providers', {
      params: { from, size },
      signal,
    })
    .then((response) => response.data);
}

export function getAdminServiceTypeList({ from, size, signal }) {
  return axios
    .get('/api/admin/services', {
      params: { from, size },
      signal,
    })
    .then((response) => response.data);
}

export function getAdminProviderById(id) {
  return axios.get(`/api/admin/providers/${id}`).then((response) => response.data);
}
