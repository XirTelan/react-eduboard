import { Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';

import { GroupDTO, StudentCreationDTO } from '../../data/types';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { urlGroups } from '../../endpoints';
import { displayErrorToast } from '../../utils/swalToast';
import useAxios from '../../hooks/useAxios';
import * as Yup from 'yup';

export default function StudentForm(props: studentFormProps) {
  const [groups, setGroups] = useState<GroupDTO[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const axiosPrivate = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`${urlGroups}/getindexlist`);
        setGroups(response.data);
      } catch (error) {
        displayErrorToast(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(val, actions) => {
        val.groupId = selectedId;
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
                {formikProps.errors.firstName && formikProps.touched.firstName && (
                  <span className="text-danger">{formikProps.errors.firstName}</span>
                )}

                <TextField
                  {...formikProps.getFieldProps('secondName')}
                  error={!!formikProps.errors.secondName}
                  margin="normal"
                  fullWidth
                  label="Фамилия"
                />
                {formikProps.errors.secondName && formikProps.touched.firstName && (
                  <span className="text-danger">{formikProps.errors.secondName}</span>
                )}

                <TextField
                  {...formikProps.getFieldProps('middleName')}
                  margin="normal"
                  fullWidth
                  label="Отчество"
                />
                <Autocomplete
                  {...formikProps.getFieldProps('groupId')}
                  options={groups}
                  onBlur={formikProps.handleBlur}
                  isOptionEqualToValue={(elem, val) => elem.id == val.id}
                  getOptionLabel={(elem) => elem.name}
                  onChange={(e, value) => value && setSelectedId(value.id)}
                  renderInput={(params) => (
                    <TextField {...params} error={!!formikProps.errors.groupId} label="Группа" />
                  )}
                />
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
  model: StudentCreationDTO;
  onSubmit(values: StudentCreationDTO, actions: FormikHelpers<StudentCreationDTO>): void;
}
