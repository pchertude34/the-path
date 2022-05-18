import * as Yup from 'yup';

export const providerSchema = Yup.object().shape({
  placeId: Yup.string().required('Missing placeId'),
  address: Yup.string().required('Missing address'),
  name: Yup.string().required('Missing name'),
  description: Yup.string(),
  serviceTypes: Yup.array().of(Yup.string()),
  latitude: Yup.number().required('Missing latitude'),
  longitude: Yup.number().required('Missing longitude'),
});

// This schema is used to validate an update to a provider.
// We don't want to allow users to change placeid, address, name, lat, or lng.
export const providerUpdateSchema = Yup.object().shape({
  description: Yup.string(),
  serviceTypes: Yup.array().of(Yup.string()),
});
