import { Form, Formik, FormikHelpers } from 'formik';
import React, { useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';

import { groupDTO, studentCreationDTO, studentDTO } from '../../types';
import * as Yup from 'yup';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { urlGroups } from '../../endpoints';

function handleDebounceFn(
  query: string,
  urlFilter: string,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  console.log(query);
  if (query == null || query.trim() === '') return;
  try {
    axios
      .get(`${urlFilter}/filter`, {
        params: { query }
      })
      .then((response) => {
        console.log(response.data);
        setState(response.data);
      });
  } catch (error) {
    console.log(error);
  }
}

export default function StudentForm(props: studentFormProps) {
  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  const [groups, setGroups] = useState<groupDTO[]>([]);
  let filterTimeout: ReturnType<typeof setTimeout>;

  function fetchSearchQuery() {
    axios.get(`${urlGroups}`).then((response) => {
      console.log(response.data);
      console.log(props.model);
      setGroups(response.data);
    });
  }
  function handleSearch(query: string) {
    clearTimeout(filterTimeout);
    if (!query) return [];

    filterTimeout = setTimeout(() => {
      fetchSearchQuery();
    }, 500);
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(val, actions) => {
        console.log(val);
        props.onSubmit(val, actions);
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('This field is required'),
        secondName: Yup.string().required('This field is required')
      })}>
      {(formikProps) => {
        return (
          <>
            <Form onSubmit={formikProps.handleSubmit}>
              <Box className="bg-white px-3 pb-3 mx-2 mb-1 rounded">
                <TextField
                  {...formikProps.getFieldProps('firstName')}
                  margin="normal"
                  error={!!formikProps.errors.firstName}
                  fullWidth
                  label="Имя"
                />
                <TextField
                  {...formikProps.getFieldProps('secondName')}
                  error={!!formikProps.errors.secondName}
                  margin="normal"
                  fullWidth
                  label="Фамилия"
                />
                <TextField
                  {...formikProps.getFieldProps('middleName')}
                  margin="normal"
                  fullWidth
                  label="Отчество"
                />
                <Autocomplete
                  options={groups}
                  onBlur={formikProps.handleBlur}
                  isOptionEqualToValue={(elem, val) => elem.id == val.id}
                  getOptionLabel={(elem) => elem.name}
                  onChange={(e, value) => formikProps.setFieldValue('groupId', value!.id)}
                  onInputChange={(e, value) => handleSearch(value)}
                  renderInput={(params) => (
                    <TextField {...params} error={!!formikProps.errors.groupId} label="Группа" />
                  )}
                />

                {formikProps.errors.firstName && <span>{formikProps.errors.firstName}</span>}
              </Box>

              <Box className="bg-white p-1 mx-2 rounded d-flex justify-content-between">
                <Link className="btn btn-secondary " to="/students">
                  Назад
                </Link>
                <Button
                  variant="contained"
                  color="success"
                  disabled={formikProps.isSubmitting}
                  type="submit">
                  Save
                </Button>
              </Box>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

interface studentFormProps {
  model: studentCreationDTO;
  onSubmit(values: studentCreationDTO, actions: FormikHelpers<studentCreationDTO>): void;
}
