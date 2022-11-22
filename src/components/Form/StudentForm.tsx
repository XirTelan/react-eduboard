import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { studentCreationDTO, studentDTO } from '../../types';
import * as Yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export default function StudentForm(props: studentFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={(val, actions) => {
        console.log(val);
        props.onSubmit(val, actions);
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('This field is required')
      })}>
      {(formikProps) => {
        return (
          <>
            <Form onSubmit={formikProps.handleSubmit}>
              <Box className="bg-white px-3 pb-3 mx-2 mb-1 rounded">
                <TextField
                  {...formikProps.getFieldProps('firstName')}
                  margin="normal"
                  fullWidth
                  label="Имя"
                />
                <TextField
                  {...formikProps.getFieldProps('secondName')}
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
