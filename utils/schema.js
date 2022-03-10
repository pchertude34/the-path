import * as Yup from 'yup';

export const providerSchema = Yup.object().shape({
  placeId: Yup.string().required('Missing placeId'),
  name: Yup.string().required('Missing name'),
  description: Yup.string(),
  serviceTypes: Yup.array().of(Yup.string()),
  latitude: Yup.number().required('Missing latitude'),
  longitude: Yup.number().required('Missing longitude'),
});
