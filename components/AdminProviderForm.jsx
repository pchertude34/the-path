import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Textarea,
  Select,
  Flex,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { buildPlaceAddress, generateGoogleLink } from '../utils/utils';
import { getAdminAllServiceTypes } from '../utils/api';

import PlaceSearch from './PlaceSearch';

const INITIAL_VALUES = {
  placeId: '',
  address: '',
  name: '',
  description: '',
  serviceTypes: [''],
};
const VALIDATION_SCHEMA = Yup.object().shape({
  placeId: Yup.string().required(
    'Place ID is required! Search for a place to populate the Place ID.'
  ),
  address: Yup.string().required(
    'Address is required! Search for a place to populate the address.'
  ),
  name: Yup.string().required(
    'Please enter a name for your place, or use the default name Google provides when searching for a place.'
  ),
});

function AdminProviderForm(props) {
  const {
    initialValues = INITIAL_VALUES,
    onSubmit,
    showPlaceSearch = true,
    submitButtonText = 'Add Provider',
  } = props;
  const [currentPlace, setCurrentPlace] = useState();

  const {
    isLoading,
    isError,
    isFetching,
    data: serviceTypes,
    error,
  } = useQuery(['admin-all-services'], getAdminAllServiceTypes);

  /**
   * Handler for submitting the form.
   * @param {object} values The form values submitted. See INITIAL_VALUES for the schema.
   */
  async function handleSubmit(values) {
    let providerData = { ...values };

    // Add the lat and lng if current place exists which happens only on create.
    // When we are updating the provider, we won't have access to the place object since we don't need it.
    // The only thing we care about for updates are the values in the editable form fields.
    if (currentPlace) {
      providerData = {
        ...providerData,
        latitude: currentPlace.geometry.location.lat(),
        longitude: currentPlace.geometry.location.lng(),
      };
    }
    // Errors for this function should be handled in the parent component.
    // It makes it easier to customize error responses.
    await onSubmit(providerData);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={VALIDATION_SCHEMA}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Stack spacing={4}>
            <Stack p={4} borderRadius="md" bg="gray.100">
              <Box>
                {showPlaceSearch && (
                  <PlaceSearch
                    label="Search for a Place"
                    helpText="Use this field to search google places to find providers. We use google places to populate most of the information for The Path users including the address and name. Please verify that the entered place is indeed the provider you are trying to add."
                    placeholder="Search for a place by Address or Name"
                    onPlaceChange={(place) => {
                      setFieldValue('placeId', place.place_id);
                      setFieldValue('address', buildPlaceAddress(place));
                      setFieldValue('name', place.name);
                      setCurrentPlace(place);
                    }}
                    placeTypes={['establishment']}
                  />
                )}
              </Box>
              <Field name="placeId">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.placeId} isRequired>
                    <FormLabel htmlFor="placeId">Place ID</FormLabel>
                    <Input
                      {...field}
                      id="placeId"
                      placeholder="Google's given Place ID"
                      disabled
                      bg="white"
                    />
                    <FormErrorMessage>{form.errors.placeId}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="address">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.address} isRequired>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input
                      {...field}
                      id="address"
                      placeholder="The address of the provider found by google"
                      disabled
                      bg="white"
                    />
                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="name">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name} isRequired>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="The name of the provider found by google"
                      disabled
                      bg="white"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                as="a"
                colorScheme="blue"
                variant="link"
                href={generateGoogleLink(values.placeId, values.name)}
                target="_blank"
                rel="noreferrer noopener"
                isDisabled={!values.placeId}
                p={4}
                rightIcon={<ExternalLinkIcon />}
              >
                View on Google
              </Button>
            </Stack>

            <FieldArray name="serviceTypes">
              {({ remove, push }) => (
                <FormControl>
                  <FormLabel htmlFor="serviceTypes">Service Types</FormLabel>
                  <Stack spacing={2}>
                    {values.serviceTypes?.map((serviceType, index) => (
                      <Flex key={`${serviceType}-${index}`} alignItems="center">
                        <Field name={`serviceTypes.${index}`}>
                          {({ field }) => (
                            <Select
                              {...field}
                              id={`serviceTypes.${index}`}
                              placeholder="Select a service type"
                              bg="white"
                            >
                              {serviceTypes?.map((serviceType) => (
                                <option
                                  key={`service-type-${serviceType.id}`}
                                  value={serviceType.id}
                                >
                                  {serviceType.description}
                                </option>
                              ))}
                            </Select>
                          )}
                        </Field>
                        <Button
                          variant="ghost"
                          size="md"
                          ml={2}
                          colorScheme="red"
                          p={1}
                          // Remove the service type at the current index
                          onClick={() => remove(index)}
                        >
                          <CloseIcon />
                        </Button>
                      </Flex>
                    ))}

                    <Button
                      variant="outline"
                      colorScheme="blue"
                      leftIcon={<AddIcon />}
                      // Add a new empty service type to the service array
                      onClick={() => push('')}
                    >
                      Add Service Type
                    </Button>
                  </Stack>
                </FormControl>
              )}
            </FieldArray>

            <Field name="description">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} placeholder="Enter a brief description for this provider." />
                </FormControl>
              )}
            </Field>
            <Button type="submit" colorScheme="primary">
              {submitButtonText}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

AdminProviderForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    serviceType: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  showPlaceSearch: PropTypes.bool,
  submitButtonText: PropTypes.string,
};

export default AdminProviderForm;
