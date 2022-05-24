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

// ADMIN SERVICE FUNCTIONS
export function getAdminAllServiceTypes() {
  return axios.get('/api/admin/services/all').then((response) => response.data);
}

export function getAdminServiceById(id) {
  return axios.get(`/api/admin/services/${id}`).then((response) => response.data);
}

export function createAdminService(body) {
  return axios.post('/api/admin/services', body).then((response) => response.data);
}

// ADMIN PROVIDER FUNCTIONS
export function createAdminProvider(body) {
  return axios.post('/api/admin/providers', body).then((response) => response.data);
}

export function getAdminProviderById(id) {
  return axios.get(`/api/admin/providers/${id}`).then((response) => response.data);
}

export function updateAdminProviderById(id, body) {
  return axios.put(`/api/admin/providers/${id}`, body).then((response) => response.body);
}

export function deleteAdminProviderById(id) {
  return axios.delete(`/api/admin/providers/${id}`).then((respones) => respones.data);
}
