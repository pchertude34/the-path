import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormLabel, FormControl, FormErrorMessage, Input, Stack } from '@chakra-ui/react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const INITIAL_VALUES = {
  id: '',
  description: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  id: Yup.string()
    .length(3, 'Service ID must be 3 characters')
    .matches(/[A-Z]/, 'Service ID must only contain capital letters')
    .required('Service ID is required!'),
  description: Yup.string().required('Service must have a description.'),
});

function AdminServiceForm(props) {
  const { initialValues = INITIAL_VALUES, onSubmit, submitButtonText = 'Add Service Type' } = props;

  async function handleSubmit(values) {
    await onSubmit(values);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={VALIDATION_SCHEMA}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {() => (
        <Form>
          <Stack spacing={4} p={4}>
            <Field name="id">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.id} isRequired>
                  <FormLabel htmlFor="id">Service ID</FormLabel>
                  <Input {...field} id="id" bg="white" />
                  <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="description">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.address} isRequired>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    {...field}
                    id="description"
                    placeholder="A brief description or long name for the service"
                    bg="white"
                  />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
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

AdminServiceForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
};

export default AdminServiceForm;
